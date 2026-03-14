---
layout: default
clicks: 2
---

<script setup>
import TikzMorph from '../components/TikzMorph.vue'
</script>

<LogoBar variant="black" position="header" align="right" />

# Seg Lazy

<br> Query de $[0, 1]$ com lazy pendente no nó $[0,3]$

<TikzMorph>
  <template #0>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=1.1cm, font=\small, align=center},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.2cm]90:{\footnotesize #1}}},
  lazed/.style={fill=red!20, draw=red!60!black, thick}
]
  \node[interval={[0,7]}] {20}
    child { node[interval={[0,3]}, lazed] {20 \\ \color{red!60!black}\textbf{+5}}
      child { node[interval={[0,1]}] {0}
        child { node[interval={[0,0]}] {0} }
        child { node[interval={[1,1]}] {0} }
      }
      child { node[interval={[2,3]}] {0}
        child { node[interval={[2,2]}] {0} }
        child { node[interval={[3,3]}] {0} }
      }
    }
    child { node[interval={[4,7]}] {0}
      child { node[interval={[4,5]}] {0}
        child { node[interval={[4,4]}] {0} }
        child { node[interval={[5,5]}] {0} }
      }
      child { node[interval={[6,7]}] {0}
        child { node[interval={[6,6]}] {0} }
        child { node[interval={[7,7]}] {0} }
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
  every node/.style={circle, draw=black, thick, minimum size=1.1cm, font=\small, align=center},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.2cm]90:{\footnotesize #1}}},
  processed/.style={fill=yellow!20},
  lazed/.style={fill=red!20, draw=red!60!black, thick}
]
  \node[interval={[0,7]}, processed] {20}
    child { node[interval={[0,3]}, processed] {20}
      child { node[interval={[0,1]}, lazed] {10 \\ \color{red!60!black}\textbf{+5}}
        child { node[interval={[0,0]}] {0} }
        child { node[interval={[1,1]}] {0} }
      }
      child { node[interval={[2,3]}, lazed] {10 \\ \color{red!60!black}\textbf{+5}}
        child { node[interval={[2,2]}] {0} }
        child { node[interval={[3,3]}] {0} }
      }
    }
    child { node[interval={[4,7]}] {0}
      child { node[interval={[4,5]}] {0}
        child { node[interval={[4,4]}] {0} }
        child { node[interval={[5,5]}] {0} }
      }
      child { node[interval={[6,7]}] {0}
        child { node[interval={[6,6]}] {0} }
        child { node[interval={[7,7]}] {0} }
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
  every node/.style={circle, draw=black, thick, minimum size=1.1cm, font=\small, align=center},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.2cm]90:{\footnotesize #1}}},
  processed/.style={fill=yellow!20},
  lazed/.style={fill=red!20, draw=red!60!black, thick},
  pushed/.style={fill=green!20, draw=green!60!black, thick}
]
  \node[interval={[0,7]}, processed] {20}
    child { node[interval={[0,3]}, processed] {20}
      child { node[interval={[0,1]}, pushed] {10}
        child { node[interval={[0,0]}, lazed] {5 \\ \color{red!60!black}\textbf{+5}} }
        child { node[interval={[1,1]}, lazed] {5 \\ \color{red!60!black}\textbf{+5}} }
      }
      child { node[interval={[2,3]}, lazed] {10 \\ \color{red!60!black}\textbf{+5}}
        child { node[interval={[2,2]}] {0} }
        child { node[interval={[3,3]}] {0} }
      }
    }
    child { node[interval={[4,7]}] {0}
      child { node[interval={[4,5]}] {0}
        child { node[interval={[4,4]}] {0} }
        child { node[interval={[5,5]}] {0} }
      }
      child { node[interval={[6,7]}] {0}
        child { node[interval={[6,6]}] {0} }
        child { node[interval={[7,7]}] {0} }
      }
    };
\end{tikzpicture}
```

  </template>
</TikzMorph>
