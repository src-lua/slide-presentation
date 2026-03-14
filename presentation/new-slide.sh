#!/usr/bin/env bash
# Cria um novo slide a partir de um template mínimo.
# Uso: ./new-slide.sh <nome> [tipo]
#
# Tipos disponíveis:
#   default   — slide de conteúdo simples (padrão)
#   section   — divisor de seção
#   two-cols  — duas colunas
#   tikz      — slide com diagrama TikZ animado
#   code      — slide com código + magic-move
#
# Exemplo:
#   ./new-slide.sh lazydual9
#   ./new-slide.sh intro-beats section

set -e

NAME="${1:-}"
TYPE="${2:-default}"

if [[ -z "$NAME" ]]; then
  echo "Uso: ./new-slide.sh <nome> [tipo]"
  echo "Tipos: default | section | two-cols | tikz | code"
  exit 1
fi

FILE="slides/${NAME}.md"

if [[ -f "$FILE" ]]; then
  echo "Erro: $FILE já existe"
  exit 1
fi

# ── Templates ──────────────────────────────────────────────────────────

template_section() {
cat << 'EOF'
---
layout: section
class: text-center
---

# Título da Seção

## **Subtítulo**

<LogoBar variant="black" position="header" />
EOF
}

template_default() {
cat << 'EOF'
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Título

Conteúdo aqui.

- Item 1
- Item 2
EOF
}

template_two_cols() {
cat << 'EOF'
---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right" />

# Título

Coluna esquerda.

::right::

Coluna direita.
EOF
}

template_tikz() {
cat << 'EOF'
---
layout: default
clicks: 2
---

<script setup>
import TikzMorph from '../components/TikzMorph.vue'
</script>

<LogoBar variant="black" position="header" align="right" />

# Título

<TikzMorph>
  <template #0>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, very thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
\end{tikzpicture}
```

  </template>
  <template #1>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, very thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
  \draw[->, very thick] (A) -- (B);
\end{tikzpicture}
```

  </template>
</TikzMorph>
EOF
}

template_code() {
cat << 'EOF'
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Implementação

````md magic-move
```cpp
// Estado A
```
```cpp
// Estado B
```
````
EOF
}

# ── Gera o arquivo ──────────────────────────────────────────────────────

case "$TYPE" in
  section)  template_section  > "$FILE" ;;
  two-cols) template_two_cols > "$FILE" ;;
  tikz)     template_tikz     > "$FILE" ;;
  code)     template_code     > "$FILE" ;;
  *)        template_default  > "$FILE" ;;
esac

echo "✓ $FILE criado (tipo: $TYPE)"
echo ""
echo "Adicione ao slides.md na posição correta:"
echo ""
echo "---"
echo "src: ./$FILE"
echo "---"
