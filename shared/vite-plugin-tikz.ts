import { createHash } from 'crypto'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { Plugin } from 'vite'

const CACHE_DIR = '.tikz-cache'
const DEFAULT_SCALE = 1.3

// Path to shared tikz macros — resolved relative to this plugin file.
const __plugin_dir = dirname(fileURLToPath(import.meta.url))
const MACROS_PATH = join(__plugin_dir, 'tikz-macros/common.tex')

// ── SVG post-processing ────────────────────────────────────────────────────

// Extract CSS rules from dvisvgm's <style> block and apply as inline styles,
// then remove the <style> tag so Vue's compiler doesn't complain.
function inlineStylesAndClean(svg: string, scale: number): string {
  const styleMatch = svg.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
  const rules: Record<string, string> = {}
  if (styleMatch) {
    const css = styleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '')
    const ruleRe = /text\.([\w-]+)\s*\{([^}]+)\}/g
    let m: RegExpExecArray | null
    while ((m = ruleRe.exec(css)) !== null) {
      rules[m[1]] = m[2].trim().replace(/"/g, "'")
    }
  }
  let result = svg
    .replace(/<\?xml[^>]*\?>/, '')
    .replace(/<!DOCTYPE[^>]*>/, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(
      /(<svg[^>]*)\s+width='([\d.]+)pt'\s+height='([\d.]+)pt'/,
      (_, attrs, w, h) =>
        `${attrs} width='${(parseFloat(w) * scale).toFixed(2)}pt' height='${(parseFloat(h) * scale).toFixed(2)}pt'`
    )
    .replace(/<svg /, '<svg style="max-width:100%;height:auto" ')
  for (const [cls, styles] of Object.entries(rules)) {
    result = result.replace(
      new RegExp(`<text class='${cls}'`, 'g'),
      `<text style='${styles}' class='${cls}'`
    )
  }
  return result
}

// ── Attribute parsing ──────────────────────────────────────────────────────

function parseAttrs(raw: string | undefined): { id?: string; scale: number } {
  if (!raw) return { scale: DEFAULT_SCALE }
  const id = raw.match(/#([\w-]+)/)?.[1]
  const scaleStr = raw.match(/scale=([\d.]+)/)?.[1]
  return { id, scale: scaleStr ? parseFloat(scaleStr) : DEFAULT_SCALE }
}

function parseScale(raw: string | undefined): number {
  if (!raw) return DEFAULT_SCALE
  const scaleStr = raw.match(/scale=([\d.]+)/)?.[1]
  return scaleStr ? parseFloat(scaleStr) : DEFAULT_SCALE
}

// ── TikZ compilation ───────────────────────────────────────────────────────

// Matches ```tikz or ```tikz{...attrs...}
// Must be tested/used AFTER tikz-steps regex to avoid prefix ambiguity.
const TIKZ_RE = /```tikz(\{([^}]*)\})?\n([\s\S]*?)```/g

function compileTikz(src: string, scale: number): string {
  const cacheKey = createHash('sha256').update(src + `|scale=${scale}`).digest('hex').slice(0, 16)
  const cached = join(CACHE_DIR, `${cacheKey}.svg`)

  if (existsSync(cached)) return readFileSync(cached, 'utf-8')

  mkdirSync(CACHE_DIR, { recursive: true })
  const tmp = join(tmpdir(), `tikz-${cacheKey}`)
  mkdirSync(tmp, { recursive: true })

  // Copy shared macros into the tmp dir so \input{common} works
  const macroInput = existsSync(MACROS_PATH)
    ? `\\input{common}\n`
    : ''
  if (existsSync(MACROS_PATH)) {
    writeFileSync(join(tmp, 'common.tex'), readFileSync(MACROS_PATH, 'utf-8'))
  }

  const tex = `\\documentclass[tikz,border=4pt]{standalone}
\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,positioning,calc,decorations.pathreplacing,shapes}
${macroInput}\\begin{document}
${src.trim()}
\\end{document}`

  writeFileSync(join(tmp, 'fig.tex'), tex)

  try {
    execSync(`tectonic -X compile --outfmt pdf fig.tex`, { cwd: tmp, stdio: 'pipe' })
    execSync(
      `dvisvgm --pdf --font-format=svg --exact --output=${cacheKey}.svg fig.pdf`,
      { cwd: tmp, stdio: 'pipe' }
    )
  } catch (err: any) {
    const msg = (err.stderr?.toString() || err.message || 'unknown error')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<div class="tikz-error"><strong>TikZ compile error:</strong><pre>${msg}</pre></div>`
  }

  const raw = readFileSync(join(tmp, `${cacheKey}.svg`), 'utf-8')
  const svg = inlineStylesAndClean(raw, scale)

  writeFileSync(cached, svg)
  return svg
}

// ── tikz-steps: declarative overlay syntax ────────────────────────────────
//
// Syntax:
//   ```tikz-steps{scale=1.3}
//   \begin{tikzpicture}[...]
//     \node[{{root}}] {Root}   ← {{placeholder}} = style slot
//       child { node[{{L}}] {Left} };
//   \end{tikzpicture}
//   ---0---
//             ← empty = all placeholders resolve to ""
//   ---1---
//   root: pathnode
//   ---2---
//   root: pathnode
//   L: reject
//   ```
//
// Output: <TikzMorph><template #0>SVG</template>...</TikzMorph>
// The slide frontmatter gets `clicks: N` auto-injected if not present.

// Must run BEFORE TIKZ_RE to avoid "tikz" matching as prefix of "tikz-steps"
const TIKZ_STEPS_RE = /```tikz-steps(\{([^}]*)\})?\n([\s\S]*?)```/g

// Minimal YAML parser: "key: value" lines only — no library needed.
// Values can contain anything (e.g. "fill=red!30, draw=orange!80!black").
function parseStepYaml(yaml: string): Record<string, string> {
  const result: Record<string, string> = {}
  if (!yaml.trim()) return result
  const lineRe = /^([\w-]+)\s*:\s*(.*)$/gm
  let m: RegExpExecArray | null
  while ((m = lineRe.exec(yaml)) !== null) {
    result[m[1].trim()] = m[2].trim()
  }
  return result
}

// Replace {{key}} with the override value, or "" if not present.
// node[{{root}}] with no override → node[] → valid TikZ.
function substituteTemplate(template: string, overrides: Record<string, string>): string {
  return template.replace(/\{\{([\w-]+)\}\}/g, (_, key) => overrides[key] ?? '')
}

function compileTikzSteps(raw: string, attrsRaw: string | undefined): string {
  const scale = parseScale(attrsRaw)

  // Find all ---N--- section dividers (must be on their own line, digits only)
  const sectionRe = /^---(\d+)---[ \t]*$/gm
  const dividers: { index: number; stepNum: number; length: number }[] = []
  let m: RegExpExecArray | null
  while ((m = sectionRe.exec(raw)) !== null) {
    dividers.push({ index: m.index, stepNum: parseInt(m[1], 10), length: m[0].length })
  }

  // No dividers → fall back to static tikz block
  if (dividers.length === 0) {
    const svg = compileTikz(raw, scale)
    return `<div class="tikz-figure">\n\n${svg}\n\n</div>`
  }

  // Everything before the first divider = base template
  const baseTemplate = raw.slice(0, dividers[0].index)

  // Extract per-step YAML sections
  const stepSections: Array<{ stepNum: number; yamlContent: string }> = []
  for (let i = 0; i < dividers.length; i++) {
    const start = dividers[i].index + dividers[i].length + 1
    const end = i + 1 < dividers.length ? dividers[i + 1].index : raw.length
    stepSections.push({
      stepNum: dividers[i].stepNum,
      yamlContent: raw.slice(start, end).trim(),
    })
  }

  // Compile one SVG per step
  const svgSlots: string[] = []
  for (const { stepNum, yamlContent } of stepSections) {
    const overrides = parseStepYaml(yamlContent)
    const substituted = substituteTemplate(baseTemplate, overrides)
    const svg = compileTikz(substituted, scale)
    svgSlots.push(`  <template #${stepNum}>\n\n${svg}\n\n  </template>`)
  }

  return `<TikzMorph>\n${svgSlots.join('\n')}\n</TikzMorph>`
}

// ── Frontmatter click injection ────────────────────────────────────────────

// After tikz-steps compilation, auto-inject `clicks: N` into the slide's
// frontmatter if the user hasn't set it manually.
function injectClicksIfNeeded(code: string): string {
  if (!code.includes('<TikzMorph>')) return code

  // Find the maximum slot number across all TikzMorph blocks on this slide
  const slotRe = /<template #(\d+)>/g
  let maxSlot = -1
  let m: RegExpExecArray | null
  while ((m = slotRe.exec(code)) !== null) {
    maxSlot = Math.max(maxSlot, parseInt(m[1], 10))
  }
  if (maxSlot < 0) return code

  // Match frontmatter at the very top of the file (--- ... ---)
  const fmRe = /^---\n([\s\S]*?)\n---/
  const fmMatch = code.match(fmRe)
  if (!fmMatch) return code

  const frontmatter = fmMatch[1]
  // Skip if user already declared clicks:
  if (/^clicks\s*:/m.test(frontmatter)) return code

  const newFm = frontmatter + `\nclicks: ${maxSlot}`
  return code.replace(fmRe, `---\n${newFm}\n---`)
}

// ── Plugin export ──────────────────────────────────────────────────────────

export function tikzPlugin(): Plugin {
  return {
    name: 'vite-plugin-tikz',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return

      // Reset regex state before testing/using
      TIKZ_STEPS_RE.lastIndex = 0
      TIKZ_RE.lastIndex = 0

      const hasTikzSteps = TIKZ_STEPS_RE.test(code)
      TIKZ_STEPS_RE.lastIndex = 0
      TIKZ_RE.lastIndex = 0
      const hasTikz = TIKZ_RE.test(code)
      TIKZ_RE.lastIndex = 0

      if (!hasTikzSteps && !hasTikz) return

      // Pass 1: tikz-steps blocks (must run before tikz to avoid prefix match)
      let result = code
      if (hasTikzSteps) {
        TIKZ_STEPS_RE.lastIndex = 0
        result = result.replace(TIKZ_STEPS_RE, (_, _attrBlock, attrsRaw, body) => {
          return compileTikzSteps(body, attrsRaw)
        })
      }

      // Pass 2: regular tikz blocks
      if (hasTikz) {
        TIKZ_RE.lastIndex = 0
        result = result.replace(TIKZ_RE, (_, _attrBlock, attrsRaw, body) => {
          const { id: tikzId, scale } = parseAttrs(attrsRaw)
          const svg = compileTikz(body, scale)
          const idAttr = tikzId ? ` data-tikz="${tikzId}"` : ''
          return `<div class="tikz-figure"${idAttr}>\n\n${svg}\n\n</div>`
        })
      }

      // Pass 3: auto-inject clicks: N into frontmatter if tikz-steps was used
      if (hasTikzSteps) {
        result = injectClicksIfNeeded(result)
      }

      return { code: result, map: null }
    },
  }
}
