#!/usr/bin/env bash
# new-slide.sh — Add a new slide to an existing presentation
#
# Usage:
#   ./scripts/new-slide.sh <presentation> <slide-name> [type]
#
# Types:
#   default    — standard content slide with title
#   section    — section divider
#   two-cols   — two-column layout
#   tikz-steps — animated TikZ with declarative overlay syntax (recommended for diagrams)
#   tikz       — manual TikzMorph with explicit templates
#   code       — magic-move code comparison
#
# Examples:
#   ./scripts/new-slide.sh seg-tree intro default
#   ./scripts/new-slide.sh grafos bfs-walk tikz-steps

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PRES="${1:-}"
NAME="${2:-}"
TYPE="${3:-default}"

if [[ -z "$PRES" || -z "$NAME" ]]; then
  echo "Usage: ./scripts/new-slide.sh <presentation> <slide-name> [type]"
  echo "Types: default | section | two-cols | tikz-steps | tikz | code"
  exit 1
fi

PRES_DIR="$ROOT/presentations/$PRES"
if [[ ! -d "$PRES_DIR" ]]; then
  echo "Error: presentation '$PRES' not found at $PRES_DIR"
  exit 1
fi

FILE="$PRES_DIR/slides/${NAME}.md"
SLIDES_MD="$PRES_DIR/slides.md"

if [[ -f "$FILE" ]]; then
  echo "Error: $FILE already exists"
  exit 1
fi

# ── Templates ──────────────────────────────────────────────────────────────────

template_default() {
cat << 'EOF'
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Title

Content here.

- Item 1
- Item 2
EOF
}

template_section() {
cat << 'EOF'
---
layout: section
class: text-center
---

# Section Title

## **Subtitle**

<LogoBar variant="black" position="header" />
EOF
}

template_two_cols() {
cat << 'EOF'
---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right" />

# Title

::default::

Left column content.

::right::

Right column content.
EOF
}

template_tikz_steps() {
cat << 'EOF'
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Animated Diagram

```tikz-steps{scale=1.3}
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=4cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small}
]
  \node[{{root}}] {R}
    child { node[{{L}}] {L} }
    child { node[{{R}}] {R'} };
\end{tikzpicture}
---0---

---1---
root: pathnode
---2---
root: pathnode
L: reject
R: target
```

<!--
  Placeholder guide:
  - Define placeholders as {{name}} inside the TikZ code
  - In each ---N--- section, declare overrides as YAML: name: style
  - Available styles (from shared/tikz-macros/common.tex):
      pathnode  — orange fill (active path)
      reject    — red dashed (pruned branch)
      target    — green double (goal found)
      active    — orange (currently processed)
      done      — green (processed)
      pruned    — red dashed (eliminated)
      highlight — yellow (emphasized)
  - clicks: N is auto-injected into frontmatter
-->
EOF
}

template_tikz() {
cat << 'EOF'
---
layout: default
clicks: 2
---

<LogoBar variant="black" position="header" align="right" />

# Animated Diagram

<TikzMorph>
  <template #0>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
\end{tikzpicture}
```

  </template>
  <template #1>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
  \draw[->, thick] (A) -- (B);
\end{tikzpicture}
```

  </template>
  <template #2>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, thick, minimum size=0.9cm}]
  \node[pathnode] (A) at (0,0) {A};
  \node[target]   (B) at (2,0) {B};
  \draw[->, thick] (A) -- (B);
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

# Implementation

````md magic-move
```cpp
// State A
int solve() {
    return 0;
}
```
```cpp
// State B
int solve(int n) {
    if (n == 0) return 1;
    return n * solve(n - 1);
}
```
````
EOF
}

# ── Generate file ───────────────────────────────────────────────────────────────
case "$TYPE" in
  section)    template_section    > "$FILE" ;;
  two-cols)   template_two_cols   > "$FILE" ;;
  tikz-steps) template_tikz_steps > "$FILE" ;;
  tikz)       template_tikz       > "$FILE" ;;
  code)       template_code       > "$FILE" ;;
  *)          template_default    > "$FILE" ;;
esac

# ── Append src reference to slides.md ────────────────────────────────────────
# Insert before the final FinalSlide block if present, otherwise append.
INSERTION="---\nsrc: ./slides/${NAME}.md\n---\n"

if grep -q '<FinalSlide' "$SLIDES_MD" 2>/dev/null; then
  python3 - "$SLIDES_MD" "$NAME" << 'PYEOF'
import sys, re
path, name = sys.argv[1], sys.argv[2]
content = open(path).read()
insertion = f"\n---\nsrc: ./slides/{name}.md\n---\n"
# Insert before the last slide block containing FinalSlide
idx = content.rfind('<FinalSlide')
if idx == -1:
    content += insertion
else:
    # Find the start of the --- block containing FinalSlide
    block_start = content.rfind('\n---\n', 0, idx)
    if block_start == -1:
        content += insertion
    else:
        content = content[:block_start] + '\n' + insertion.strip() + content[block_start:]
open(path, 'w').write(content)
PYEOF
else
  printf "\n---\nsrc: ./slides/%s.md\n---\n" "$NAME" >> "$SLIDES_MD"
fi

echo "Created:  $FILE"
echo "Updated:  $SLIDES_MD"
