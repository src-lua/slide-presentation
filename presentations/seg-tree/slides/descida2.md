---
layout: default
clicks: 6
---

<LogoBar variant="black" position="header" align="right" />

# SegTree Walk (Max)
<br>Query: Primeiro índice com val $\ge$ 10

<div class="array-table absolute top-20 right-4 scale-100 origin-top-right z-50">

| 2 | 3 | 1 | 5 | 9 | 10 | -20 | 22 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
</div>

<TikzMorph>
  <template #0>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small}
]
  \node[] {22}
    child { node[] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[] {22}
      child { node[] {10}
        child { node[] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #1>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[] {22}
      child { node[] {10}
        child { node[] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #2>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[reject] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[] {22}
      child { node[] {10}
        child { node[] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #3>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[reject] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[pathnode] {22}
      child { node[] {10}
        child { node[] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #4>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[reject] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[pathnode] {22}
      child { node[pathnode] {10}
        child { node[] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #5>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[reject] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[pathnode] {22}
      child { node[pathnode] {10}
        child { node[reject] {9} }
        child { node[] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #6>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  pathnode/.style={fill=orange!30, draw=orange!80!black, thick},
  target/.style={fill=green!30, draw=green!80!black, double},
  reject/.style={fill=red!10, draw=red!40, dashed}
]
  \node[pathnode] {22}
    child { node[reject] {5}
      child { node[] {3}
        child { node[] {2} }
        child { node[] {3} }
      }
      child { node[] {5}
        child { node[] {1} }
        child { node[] {5} }
      }
    }
    child { node[pathnode] {22}
      child { node[pathnode] {10}
        child { node[reject] {9} }
        child { node[target] {10} }
      }
      child { node[] {22}
        child { node[] {-20} }
        child { node[] {22} }
      }
    };
\end{tikzpicture}
```

  </template>
</TikzMorph>
