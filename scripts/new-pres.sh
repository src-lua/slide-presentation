#!/usr/bin/env bash
# new-pres.sh — Scaffold a new Slidev presentation in presentations/<name>/
#
# Usage:
#   ./scripts/new-pres.sh <folder-name> ["Title"] ["Subtitle"]
#
# Example:
#   ./scripts/new-pres.sh grafos "Grafos" "BFS, DFS, Dijkstra"

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NAME="${1:-}"
TITLE="${2:-New Presentation}"
SUBTITLE="${3:-}"

if [[ -z "$NAME" ]]; then
  echo "Usage: ./scripts/new-pres.sh <folder-name> [\"Title\"] [\"Subtitle\"]"
  exit 1
fi

DEST="$ROOT/presentations/$NAME"

if [[ -d "$DEST" ]]; then
  echo "Error: $DEST already exists"
  exit 1
fi

mkdir -p "$DEST/slides" "$DEST/setup" "$DEST/styles"

# ── package.json ──────────────────────────────────────────────────────────────
cat > "$DEST/package.json" << PKGJSON
{
  "name": "$NAME",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "slidev --open slides.md",
    "build": "slidev build slides.md",
    "export": "slidev export slides.md --with-clicks",
    "export-pdf": "slidev export slides.md --with-clicks --format pdf",
    "export-png": "slidev export slides.md --with-clicks --format png"
  },
  "dependencies": {
    "@slidev/theme-default": "^0.25.0",
    "vue": "^3.5.27"
  },
  "devDependencies": {
    "@slidev/cli": "^52.11.5",
    "playwright-chromium": "^1.58.1"
  }
}
PKGJSON

# ── vite.config.ts ────────────────────────────────────────────────────────────
cat > "$DEST/vite.config.ts" << 'VITECFG'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { tikzPlugin } from '../../shared/vite-plugin-tikz'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Serve shared/public/ as the static root so /logos/... paths resolve correctly
  publicDir: path.resolve(__dirname, '../../shared/public'),
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  server: { fs: { strict: false } },
  optimizeDeps: { exclude: ['oniguruma-parser'] },
  assetsInclude: ['**/*.wasm', '**/*.dump.gz'],
  plugins: [tikzPlugin()],
})
VITECFG

# ── tsconfig.json ─────────────────────────────────────────────────────────────
cat > "$DEST/tsconfig.json" << 'TSCFG'
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": [
    "**/*.ts",
    "**/*.d.ts",
    "**/*.vue",
    "../../shared/**/*.ts",
    "../../shared/**/*.vue"
  ]
}
TSCFG

# ── setup/main.ts ─────────────────────────────────────────────────────────────
cat > "$DEST/setup/main.ts" << 'SETUP'
import { defineAppSetup } from '@slidev/types'
import TikzMorph from '../../../shared/components/TikzMorph.vue'
import LogoBar from '../../../shared/components/LogoBar.vue'
import Author from '../../../shared/components/Author.vue'
import Copyright from '../../../shared/components/Copyright.vue'
import FinalSlide from '../../../shared/components/FinalSlide.vue'
import AnnotationBox from '../../../shared/components/AnnotationBox.vue'
import Counter from '../../../shared/components/Counter.vue'

export default defineAppSetup(({ app }) => {
  app.component('TikzMorph', TikzMorph)
  app.component('LogoBar', LogoBar)
  app.component('Author', Author)
  app.component('Copyright', Copyright)
  app.component('FinalSlide', FinalSlide)
  app.component('AnnotationBox', AnnotationBox)
  app.component('Counter', Counter)
})
SETUP

# ── setup/shiki.ts ────────────────────────────────────────────────────────────
cat > "$DEST/setup/shiki.ts" << 'SHIKI'
import { defineShikiSetup } from '@slidev/types'

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    transformers: [],
  }
})
SHIKI

# ── styles/index.css ──────────────────────────────────────────────────────────
cat > "$DEST/styles/index.css" << 'STYLECSS'
@import '../../../shared/styles/base.css';

/* Presentation-local overrides go here */
STYLECSS

# ── slides.md ─────────────────────────────────────────────────────────────────
cat > "$DEST/slides.md" << SLIDESMD
---
theme: default
colorSchema: 'light'
class: text-center
highlighter: shiki
lineNumbers: true
codeTheme: github-light
drawings:
  persist: false
transition: slide-left
title: $TITLE
mdc: true
fonts:
  mono: 'JetBrains Mono'
---

<style src="./styles/index.css"></style>

# $TITLE

## $SUBTITLE

<LogoBar variant="black" position="header" align="right"/>

<Author :authors="['Author Name <tag>']" />
<Copyright version="rev. 1.0" />

---
src: ./slides/intro.md
---

---
layout:
---
<FinalSlide />
SLIDESMD

# ── First slide ───────────────────────────────────────────────────────────────
cat > "$DEST/slides/intro.md" << 'INTRO'
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Introduction

Content here.
INTRO

echo ""
echo "Created: $DEST"
echo ""
echo "Next steps:"
echo "  cd presentations/$NAME"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "Add more slides:"
echo "  ./scripts/new-slide.sh $NAME <slide-name> [type]"
echo "  Types: default | section | two-cols | tikz-steps | tikz | code"
