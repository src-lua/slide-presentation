import { createHash } from 'crypto'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import type { Plugin } from 'vite'

const CACHE_DIR = '.tikz-cache'
const DEFAULT_SCALE = 1.3

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

// Parse attributes from ```tikz{...} block: #id, scale=X
function parseAttrs(raw: string | undefined): { id?: string; scale: number } {
  if (!raw) return { scale: DEFAULT_SCALE }
  const id = raw.match(/#([\w-]+)/)?.[1]
  const scaleStr = raw.match(/scale=([\d.]+)/)?.[1]
  return { id, scale: scaleStr ? parseFloat(scaleStr) : DEFAULT_SCALE }
}

// Matches ```tikz or ```tikz{...attrs...}
const TIKZ_RE = /```tikz(\{([^}]*)\})?\n([\s\S]*?)```/g

function compileTikz(src: string, scale: number): string {
  const cacheKey = createHash('sha256').update(src + `|scale=${scale}`).digest('hex').slice(0, 16)
  const cached = join(CACHE_DIR, `${cacheKey}.svg`)

  if (existsSync(cached)) return readFileSync(cached, 'utf-8')

  mkdirSync(CACHE_DIR, { recursive: true })
  const tmp = join(tmpdir(), `tikz-${cacheKey}`)
  mkdirSync(tmp, { recursive: true })

  const tex = `\\documentclass[tikz,border=4pt]{standalone}
\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,positioning,calc,decorations.pathreplacing,shapes}
\\begin{document}
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

export function tikzPlugin(): Plugin {
  return {
    name: 'vite-plugin-tikz',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return
      if (!TIKZ_RE.test(code)) return
      TIKZ_RE.lastIndex = 0

      const result = code.replace(TIKZ_RE, (_, _attrBlock, attrsRaw, body) => {
        const { id: tikzId, scale } = parseAttrs(attrsRaw)
        const svg = compileTikz(body, scale)
        const idAttr = tikzId ? ` data-tikz="${tikzId}"` : ''
        return `<div class="tikz-figure"${idAttr}>\n\n${svg}\n\n</div>`
      })

      return { code: result, map: null }
    },
  }
}
