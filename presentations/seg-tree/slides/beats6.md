---
layout: default
clicks: 3
---

<LogoBar variant="black" position="header" align="right" />

# Prova de Complexidade

<div style="transform: scale(1.6); margin-top: 150px;">
<TikzMorph :scale="0.65">
  <template #0>

```tikz
\begin{tikzpicture}[
  level distance=2cm,
  level 1/.style={sibling distance=14cm},
  level 2/.style={sibling distance=7cm},
  level 3/.style={sibling distance=3.5cm},
  level 4/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=1.3cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, thick},
  new/.style={fill=white, draw=red!80!black, thick}
]
  \path[use as bounding box] (-15, 2) rectangle (15, -11.5);
  \node[] (root) {}
    child { node[] (l1) {}
      child { node[] (ll2) {}
        child {node[] (lll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (llr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (lr2) {}
        child {node[] (lrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (lrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    }
    child { node[] (r1) {}
      child { node[] (rl2) {}
        child {node[] (rll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (rlr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (rr2) {}
        child {node[] (rrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (rrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    };
\end{tikzpicture}
```

  </template>

  <template #1>

```tikz
\begin{tikzpicture}[
  level distance=2cm,
  level 1/.style={sibling distance=14cm},
  level 2/.style={sibling distance=7cm},
  level 3/.style={sibling distance=3.5cm},
  level 4/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=1.3cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, thick},
  new/.style={fill=white, draw=red!80!black, thick},
  common/.style={fill=yellow!90!black, draw=yellow!80!black, thick}
]
  \path[use as bounding box] (-15, 2) rectangle (15, -11.5);
  \node[common] (root) {}
    child { node[common] (l1) {}
      child { node[common] (ll2) {}
        child {node[] (lll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[common] (llr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (lr2) {}
        child {node[] (lrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (lrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    }
    child { node[common] (r1) {}
      child { node[common] (rl2) {}
        child {node[] (rll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[common] (rlr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (rr2) {}
        child {node[] (rrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (rrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    };
  \begin{scope}[yshift=-10.5cm]
    \node[common, minimum size=0.6cm] at (-6, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (-5.5, 0) {Comum};
  \end{scope}
\end{tikzpicture}
```

  </template>

  <template #2>

```tikz
\begin{tikzpicture}[
  level distance=2cm,
  level 1/.style={sibling distance=14cm},
  level 2/.style={sibling distance=7cm},
  level 3/.style={sibling distance=3.5cm},
  level 4/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=1.3cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, thick},
  new/.style={fill=white, draw=red!80!black, thick},
  common/.style={fill=yellow!90!black, draw=yellow!80!black, thick},
  additional/.style={fill=cyan!90!black, draw=cyan!80!black, thick},
  deadend/.style={fill=purple!90!black, draw=purple!80!black, thick}
]
  \path[use as bounding box] (-15, 2) rectangle (15, -11.5);
  \node[common] (root) {}
    child { node[common] (l1) {}
      child { node[common] (ll2) {}
        child {node[] (lll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[common] (llr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (lr2) {}
        child {node[] (lrl3) {}
            child {node[deadend] {} }
            child {node[deadend] {} }
        }
        child {node[] (lrr3) {}
            child {node[deadend] {} }
            child {node[deadend] {} }
        }
      }
    }
    child { node[common] (r1) {}
      child { node[common] (rl2) {}
        child {node[deadend] (rll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[common] (rlr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (rr2) {}
        child {node[] (rrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (rrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    };
  \begin{scope}[yshift=-10.5cm]
    \node[common, minimum size=0.6cm] at (-6, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (-5.5, 0) {Comum};
    \node[deadend, minimum size=0.6cm] at (-1.5, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (-1.0, 0) {Terminal};
  \end{scope}
\end{tikzpicture}
```

  </template>

  <template #3>

```tikz
\begin{tikzpicture}[
  level distance=2cm,
  level 1/.style={sibling distance=14cm},
  level 2/.style={sibling distance=7cm},
  level 3/.style={sibling distance=3.5cm},
  level 4/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=1.3cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, thick},
  new/.style={fill=white, draw=red!80!black, thick},
  common/.style={fill=yellow!90!black, draw=yellow!80!black, thick},
  additional/.style={fill=orange!90!black, draw=orange!80!black, thick},
  deadend/.style={fill=purple!90!black, draw=purple!80!black, thick}
]
  \path[use as bounding box] (-15, 2) rectangle (15, -11.5);
  \node[common] (root) {}
    child { node[common] (l1) {}
      child { node[common] (ll2) {}
        child {node[] (lll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (llr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[additional] (lr2) {}
        child {node[additional] (lrl3) {}
            child {node[deadend] {} }
            child {node[deadend] {} }
        }
        child {node[additional] (lrr3) {}
            child {node[deadend] {} }
            child {node[deadend] {} }
        }
      }
    }
    child { node[common] (r1) {}
      child { node[common] (rl2) {}
        child {node[deadend] (rll3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[common] (rlr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
      child { node[] (rr2) {}
        child {node[] (rrl3) {}
            child {node[] {} }
            child {node[] {} }
        }
        child {node[] (rrr3) {}
            child {node[] {} }
            child {node[] {} }
        }
      }
    };
  \begin{scope}[yshift=-10.5cm]
    \node[common, minimum size=0.6cm] at (-6, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (-5.5, 0) {Comum};
    \node[deadend, minimum size=0.6cm] at (-1.5, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (-1.0, 0) {Terminal};
    \node[additional, minimum size=0.6cm] at (3.5, 0) {};
    \node[draw=none, fill=none, minimum size=0pt, rectangle, anchor=west, font=\small] at (4.0, 0) {N\~{a}o~Terminal};
  \end{scope}
\end{tikzpicture}
```

  </template>

</TikzMorph>
</div>
