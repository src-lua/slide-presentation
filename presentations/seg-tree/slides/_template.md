<!--
  _template.md — Referência de padrões de slides
  Este arquivo NÃO é incluído em slides.md, serve só como guia.

  Para criar um novo slide:
    cd presentation && ./new-slide.sh <nome>

  Para adicionar ao fluxo da apresentação, insira em slides.md:
    ---
    src: ./slides/<nome>.md
    ---
-->

<!-- ══════════════════════════════════════════════════
     1. SLIDE DE SEÇÃO (divisor de tópico)
     ══════════════════════════════════════════════════ -->
---
layout: section
class: text-center
---

# Nome da Seção

## **Subtítulo descritivo**

<LogoBar variant="black" position="header" />

---

<!-- ══════════════════════════════════════════════════
     2. SLIDE DE CONTEÚDO SIMPLES
     ══════════════════════════════════════════════════ -->
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Título

Parágrafo de texto. Suporta **negrito**, _itálico_ e `código inline`.

- Item 1
- Item 2
  - Sub-item
- Item 3

Math inline: $O(n \log n)$ e display:

$$\sum_{i=1}^{n} a_i$$

---

<!-- ══════════════════════════════════════════════════
     3. SLIDE DUAS COLUNAS
     ══════════════════════════════════════════════════ -->
---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right" />

# Título

Coluna esquerda com explicação.

- Ponto A
- Ponto B

::right::

Coluna direita com complemento.

$$\text{fórmula}$$

---

<!-- ══════════════════════════════════════════════════
     4. SLIDE COM CÓDIGO (syntax highlight)
     ══════════════════════════════════════════════════ -->
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Implementação

```cpp {*|1-3|5-10}
// {*} = highlight tudo
// {1-3} = highlight linhas 1-3 no click seguinte
// {5-10} = highlight linhas 5-10 no click seguinte
void update(int node, int l, int r, int pos, int val) {
    if (l == r) {
        seg[node] = val;
        return;
    }
    int mid = (l + r) / 2;
    if (pos <= mid) update(2*node, l, mid, pos, val);
    else            update(2*node+1, mid+1, r, pos, val);
    seg[node] = seg[2*node] + seg[2*node+1];
}
```

---

<!-- ══════════════════════════════════════════════════
     5. SLIDE COM CÓDIGO ANIMADO (magic-move)
     ══════════════════════════════════════════════════ -->
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Evolução do Código

````md magic-move
```cpp
// Estado inicial
struct Node {
    int val;
};
```
```cpp
// Com lazy tag
struct Node {
    int val;
    int lazy;
};
```
```cpp
// Com funções de merge e apply
struct Node {
    int val;
    int lazy;

    void apply(int tag) { val += tag; lazy += tag; }
};
```
````

---

<!-- ══════════════════════════════════════════════════
     6. SLIDE COM TIKZ ESTÁTICO
     ══════════════════════════════════════════════════ -->
---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

# Diagrama

```tikz
\begin{tikzpicture}[
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm}
]
  \node (root) at (2,2) {$[1,4]$};
  \node (l)    at (1,1) {$[1,2]$};
  \node (r)    at (3,1) {$[3,4]$};
  \node (ll)   at (0.5,0) {$[1,1]$};
  \node (lr)   at (1.5,0) {$[2,2]$};
  \node (rl)   at (2.5,0) {$[3,3]$};
  \node (rr)   at (3.5,0) {$[4,4]$};

  \draw[very thick] (root)--(l) (root)--(r)
                    (l)--(ll) (l)--(lr)
                    (r)--(rl) (r)--(rr);
\end{tikzpicture}
```

---

<!-- ══════════════════════════════════════════════════
     7. SLIDE COM TIKZ ANIMADO (TikzMorph — slots #0, #1, #2, ...)
     ══════════════════════════════════════════════════ -->
---
layout: default
clicks: 2
---

<LogoBar variant="black" position="header" align="right" />

# Diagrama com Animação

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
  <template #2>

```tikz
\begin{tikzpicture}[every node/.style={circle, draw, very thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
  \node (C) at (1,1.5) {C};
  \draw[->, very thick] (A) -- (B);
  \draw[->, very thick] (A) -- (C);
  \draw[->, very thick] (B) -- (C);
\end{tikzpicture}
```

  </template>
</TikzMorph>

---

<!-- ══════════════════════════════════════════════════
     8. SLIDE COM TIKZ MORPH (animação GSAP entre SVGs)
        Requer ids {#nome} nos blocos tikz
     ══════════════════════════════════════════════════ -->
---
layout: default
clicks: 1
---

<LogoBar variant="black" position="header" align="right" />

# Morph entre diagramas

```tikz{#grafo-antes}
\begin{tikzpicture}[every node/.style={circle, draw, very thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
\end{tikzpicture}
```

```tikz{#grafo-depois}
\begin{tikzpicture}[every node/.style={circle, draw, very thick, minimum size=0.9cm}]
  \node (A) at (0,0) {A};
  \node (B) at (2,0) {B};
  \draw[->, very thick] (A) -- (B);
\end{tikzpicture}
```

<TikzMorph from="grafo-antes" to="grafo-depois" :click="1" />

---

<!-- ══════════════════════════════════════════════════
     9. SLIDE DE DÚVIDAS
     ══════════════════════════════════════════════════ -->
---
layout: section
class: text-center
---

# Dúvidas?

<LogoBar variant="black" position="header" />
