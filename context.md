# Contexto: Slidev + TikZ via build-time plugin

## Problema original

Estava usando Slidev com componentes Vue customizados e um servidor separado para
compilar diagramas TikZ em runtime. Funcionava bem mas ficou pesado:
- Servidor LaTeX sempre rodando
- Latência visível ao mudar slides
- HMR lento porque cada bloco TikZ dispara uma requisição HTTP

## Solução decidida

Mover toda compilação TikZ para o **build time** via plugin Vite.
O plugin intercepta blocos ```tikz no markdown, compila uma única vez
(cacheando por hash SHA-256 do conteúdo), e emite SVG inline no HTML.
Nenhum servidor precisa existir durante a apresentação.

## Stack

- Slidev (apresentações em Markdown + Vue)
- Vite (bundler — plugin customizado aqui)
- tectonic (engine LaTeX em Rust, leve, sem instalar TeX Live)
- dvisvgm (converte PDF/DVI para SVG)
- Cache local em `.tikz-cache/` por hash do conteúdo
- v-motion / GSAP MorphSVGPlugin para transições entre estados

---

## Arquitetura

```
slide.md
  └─> Vite plugin (transform, enforce: 'pre')
        └─> calcula SHA-256 do bloco tikz
              ├─> cache hit  → lê SVG de .tikz-cache/<hash>.svg
              └─> cache miss → tectonic → dvisvgm → salva cache → SVG inline

SVG inline no HTML
  └─> v-motion / GSAP animam elementos SVG direto no DOM
```

---

## Arquivos a criar

| Arquivo | Descrição |
|---|---|
| `vite-plugin-tikz.ts` | Plugin principal |
| `components/TikzMorph.vue` | Animação entre dois estados TikZ com GSAP |
| `styles/custom.css` | Transições CSS para v-switch |
| `.gitignore` (atualizar) | Adicionar `.tikz-cache/` ou commitar o cache |

---

## Código completo

### `vite-plugin-tikz.ts`

```ts
import { createHash } from 'crypto'
import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import type { Plugin } from 'vite'

const CACHE_DIR = '.tikz-cache'
const TIKZ_RE = /```tikz([\s\S]*?)```/g

function compileTikz(src: string): string {
  const hash = createHash('sha256').update(src).digest('hex').slice(0, 16)
  const cached = join(CACHE_DIR, `${hash}.svg`)

  if (existsSync(cached)) return readFileSync(cached, 'utf-8')

  mkdirSync(CACHE_DIR, { recursive: true })
  const tmp = join(tmpdir(), `tikz-${hash}`)
  mkdirSync(tmp, { recursive: true })

  const tex = `\\documentclass[tikz,border=4pt]{standalone}
\\usepackage{tikz}
\\usetikzlibrary{arrows.meta,positioning,calc,decorations.pathreplacing}
\\begin{document}
${src.trim()}
\\end{document}`

  writeFileSync(join(tmp, 'fig.tex'), tex)

  // tectonic: engine LaTeX em Rust, baixa pacotes on-demand
  execSync(`tectonic -X compile --outfmt pdf fig.tex`, { cwd: tmp })
  execSync(`dvisvgm --pdf --font-format=woff2 --exact --output=${hash}.svg fig.pdf`, {
    cwd: tmp,
  })

  const svg = readFileSync(join(tmp, `${hash}.svg`), 'utf-8')
    .replace(/<\?xml[^>]*\?>/, '')
    .replace(/<!DOCTYPE[^>]*>/, '')
    .replace(/<svg /, '<svg style="max-width:100%;height:auto" ')

  writeFileSync(cached, svg)
  return svg
}

export function tikzPlugin(): Plugin {
  return {
    name: 'vite-plugin-tikz',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return

      const result = code.replace(TIKZ_RE, (_, body) => {
        const svg = compileTikz(body)
        return `<div class="tikz-figure">\n\n${svg}\n\n</div>`
      })

      return { code: result, map: null }
    },
  }
}
```

### `vite.config.ts` (ou `slidev.config.ts`)

```ts
import { tikzPlugin } from './vite-plugin-tikz'

export default {
  plugins: [tikzPlugin()],
}
```

### `components/TikzMorph.vue`

Anima morfologicamente paths SVG entre dois diagramas TikZ via GSAP MorphSVGPlugin.
Os diagramas precisam ter atributo `data-tikz="<id>"` no wrapper — o plugin pode
injetar isso se o bloco tiver `{#id}` como atributo:

````md
```tikz{#grafo-inicial}
...
```
````

```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useNav } from '@slidev/client'
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const props = defineProps<{ from: string; to: string; click: number }>()
const { clicks } = useNav()

watch(clicks, (n) => {
  if (n === props.click) {
    const fromPaths = document.querySelectorAll(`[data-tikz="${props.from}"] path`)
    const toPaths   = document.querySelectorAll(`[data-tikz="${props.to}"] path`)
    fromPaths.forEach((p, i) => {
      if (toPaths[i]) {
        gsap.to(p, { morphSVG: toPaths[i] as SVGPathElement, duration: 0.6 })
      }
    })
  }
})
</script>

<template><slot /></template>
```

### `styles/custom.css`

```css
/* Transição suave entre estados no v-switch */
.tikz-figure {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

[style*="display: none"] .tikz-figure {
  opacity: 0;
}
```

---

## Como usar nos slides

### Fade simples entre dois estados (v-switch)

```md
<v-switch>
  <template #1>

  ```tikz
  \begin{tikzpicture}
    \node[draw, circle] (A) at (0,0) {A};
    \node[draw, circle] (B) at (2,0) {B};
  \end{tikzpicture}
  ```

  </template>
  <template #2>

  ```tikz
  \begin{tikzpicture}
    \node[draw, circle] (A) at (0,0) {A};
    \node[draw, circle] (B) at (2,0) {B};
    \draw[->] (A) -- (B);
  \end{tikzpicture}
  ```

  </template>
</v-switch>
```

### Magic move real com GSAP (TikzMorph)

```md
```tikz{#grafo-antes}
\begin{tikzpicture}
  \node[draw,circle] (A) at (0,0) {A};
  \node[draw,circle] (B) at (2,0) {B};
\end{tikzpicture}
```

```tikz{#grafo-depois}
\begin{tikzpicture}
  \node[draw,circle] (A) at (0,0) {A};
  \node[draw,circle] (B) at (2,0) {B};
  \draw[->] (A) -- (B);
\end{tikzpicture}
```

<TikzMorph from="grafo-antes" to="grafo-depois" :click="2" />
```

---

## Instalação das dependências

```bash
# tectonic (engine LaTeX leve em Rust)
curl --proto '=https' --tlsv1.2 -fsSL https://drop.toml.rs/tectonic | sh
# ou: cargo install tectonic

# dvisvgm (conversor PDF → SVG)
# macOS:
brew install dvisvgm
# Ubuntu/Debian:
apt install dvisvgm

# GSAP (se usar TikzMorph)
npm install gsap
```

---

## Decisões de design e trade-offs

| Decisão | Motivo |
|---|---|
| SVG inline (não `<img src>`) | Permite animar elementos internos do SVG com CSS/GSAP |
| Cache por SHA-256 | Diagrama não alterado nunca recompila, mesmo entre sessões |
| tectonic em vez de pdflatex | Sem instalar TeX Live (4 GB), baixa só o que usa, ~10x mais rápido |
| enforce: 'pre' no plugin | Roda antes dos outros plugins do Vite/Slidev processarem o .md |
| Wrapper `.tikz-figure` | Permite estilização e permite que v-motion selecione o elemento |

## Próximos passos sugeridos

1. Implementar suporte a `{#id}` no regex do plugin para injetar `data-tikz`
2. Adicionar watcher de erros de compilação com mensagem amigável no HMR
3. Avaliar se o cache deve ir pro `.gitignore` (rebuild limpo) ou ser commitado (CI mais rápido)
4. Testar com `tikzlibrary` mais pesadas (pgfplots, circuitikz)
5. Implementar `TikzMorph.vue` com fallback para browsers sem GSAP Pro