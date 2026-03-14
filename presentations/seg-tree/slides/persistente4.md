---
layout: default
clicks: 4
---

<LogoBar variant="black" position="header" align="right" />

# SegTree Persistente

<div style="transform: scale(1.12); margin-top: 0px;">
<TikzMorph>
  <template #0>

```tikz
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  edge from parent/.style={draw, very thick},
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, very thick},
  new/.style={fill=white, draw=red!80!black, very thick, opacity=0},
  new2/.style={fill=white, draw=blue!80!black, very thick, opacity=0},
  shared/.style={draw=red!50, dashed, ->, very thick, opacity=0},
  shared2/.style={draw=blue!50, dashed, ->, very thick, opacity=0},
  newedge/.style={draw=red, very thick, opacity=0},
  newedge2/.style={draw=blue, very thick, opacity=0}
]
  \node[old] (root) {}
    child { node[old] (l1) {} 
      child { node[old] (ll2) {} 
        child {node[old] (lll3) {} }
        child {node[old] (llr3) {} }
      }
      child { node[old] (lr2) {} 
        child {node[old] (lrl3) {} }
        child {node[old] (lrr3) {} }
      }
    }
    child { node[old] (r1) {} 
      child { node[old] (rl2) {} 
        child {node[old] (rll3) {} }
        child {node[old] (rlr3) {} }
      }
      child { node[old] (rr2) {} 
        child {node[old] (rrl3) {} }
        child {node[old] (rrr3) {} }
      }
    };
  \node[new, xshift=0.5cm, yshift=0cm] (newroot) at (root) {};
    \draw[shared] (newroot) -- (l1);
  \node[new, xshift=0.5cm, yshift=0cm] (newr1) at (r1) {};
  \draw[newedge] (newroot) -- (newr1);
  \draw[shared] (newr1) -- (rr2);
  \node[new, xshift=0.5cm, yshift=0cm] (newrl2) at (rl2) {};
  \draw[newedge] (newr1) -- (newrl2);
  \draw[shared] (newrl2) -- (rll3);
  \node[new, xshift=0.5cm, yshift=0cm] (newrlr3) at (rlr3) {};
  \draw[newedge] (newrlr3) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2root) at (newroot) {};
  \draw[shared2] (new2root) -- (l1);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2r1) at (newr1) {};
  \draw[newedge2] (new2r1) -- (new2root);
  \draw[shared2] (new2r1) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rr2) at (rr2) {};
  \draw[newedge2] (new2rr2) -- (new2r1);
  \draw[shared2] (new2rr2) -- (rrl3);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rrr3) at (rrr3) {};
  \draw[newedge2] (new2rrr3) -- (new2rr2);
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
  edge from parent/.style={draw, very thick},
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, very thick},
  new/.style={fill=white, draw=red!80!black, very thick, opacity=0},
  new2/.style={fill=white, draw=blue!80!black, very thick, opacity=0},
  shared/.style={draw=red!50, dashed, ->, very thick, opacity=0},
  shared2/.style={draw=blue!50, dashed, ->, very thick, opacity=0},
  newedge/.style={draw=red, very thick, opacity=0},
  newedge2/.style={draw=blue, very thick, opacity=0},
  red/.style={fill=white, draw=red!80!black, very thick},
]
  \node[red] (root) {}
    child { node[old] (l1) {} 
      child { node[old] (ll2) {} 
        child {node[old] (lll3) {} }
        child {node[old] (llr3) {} }
      }
      child { node[old] (lr2) {} 
        child {node[old] (lrl3) {} }
        child {node[old] (lrr3) {} }
      }
    }
    child[red] { node[red] (r1) {} 
      child[red] { node[red] (rl2) {} 
        child[old] {node[old] (rll3) {} }
        child[red] {node[red] (rlr3) {} }
      }
      child[old] { node[old] (rr2) {} 
        child {node[old] (rrl3) {} }
        child {node[old] (rrr3) {} }
      }
    };
  \node[new, xshift=0.5cm, yshift=0cm] (newroot) at (root) {};
    \draw[shared] (newroot) -- (l1);
  \node[new, xshift=0.5cm, yshift=0cm] (newr1) at (r1) {};
  \draw[newedge] (newroot) -- (newr1);
  \draw[shared] (newr1) -- (rr2);
  \node[new, xshift=0.5cm, yshift=0cm] (newrl2) at (rl2) {};
  \draw[newedge] (newr1) -- (newrl2);
  \draw[shared] (newrl2) -- (rll3);
  \node[new, xshift=0.5cm, yshift=0cm] (newrlr3) at (rlr3) {};
  \draw[newedge] (newrlr3) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2root) at (newroot) {};
  \draw[shared2] (new2root) -- (l1);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2r1) at (newr1) {};
  \draw[newedge2] (new2r1) -- (new2root);
  \draw[shared2] (new2r1) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rr2) at (rr2) {};
  \draw[newedge2] (new2rr2) -- (new2r1);
  \draw[shared2] (new2rr2) -- (rrl3);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rrr3) at (rrr3) {};
  \draw[newedge2] (new2rrr3) -- (new2rr2);
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
  edge from parent/.style={draw, very thick},
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, very thick},
  new/.style={fill=white, draw=red!80!black, very thick},
  new2/.style={fill=white, draw=blue!80!black, very thick, opacity=0},
  shared/.style={draw=red!50, dashed, ->, very thick},
  shared2/.style={draw=blue!50, dashed, ->, very thick, opacity=0},
  newedge/.style={draw=red, very thick},
  newedge2/.style={draw=blue, very thick, opacity=0}
]
  \node[old] (root) {}
    child { node[old] (l1) {} 
      child { node[old] (ll2) {} 
        child {node[old] (lll3) {} }
        child {node[old] (llr3) {} }
      }
      child { node[old] (lr2) {} 
        child {node[old] (lrl3) {} }
        child {node[old] (lrr3) {} }
      }
    }
    child { node[old] (r1) {} 
      child { node[old] (rl2) {} 
        child {node[old] (rll3) {} }
        child {node[old] (rlr3) {} }
      }
      child { node[old] (rr2) {} 
        child {node[old] (rrl3) {} }
        child {node[old] (rrr3) {} }
      }
    };
  \node[new, xshift=0.5cm, yshift=0cm] (newroot) at (root) {};
    \draw[shared] (newroot) -- (l1);
  \node[new, xshift=0.5cm, yshift=0cm] (newr1) at (r1) {};
  \draw[newedge] (newroot) -- (newr1);
  \draw[shared] (newr1) -- (rr2);
  \node[new, xshift=0.5cm, yshift=0cm] (newrl2) at (rl2) {};
  \draw[newedge] (newr1) -- (newrl2);
  \draw[shared] (newrl2) -- (rll3);
  \node[new, xshift=0.5cm, yshift=0cm] (newrlr3) at (rlr3) {};
  \draw[newedge] (newrlr3) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2root) at (newroot) {};
  \draw[shared2] (new2root) -- (l1);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2r1) at (newr1) {};
  \draw[newedge2] (new2r1) -- (new2root);
  \draw[shared2] (new2r1) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rr2) at (rr2) {};
  \draw[newedge2] (new2rr2) -- (new2r1);
  \draw[shared2] (new2rr2) -- (rrl3);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rrr3) at (rrr3) {};
  \draw[newedge2] (new2rrr3) -- (new2rr2);
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
  edge from parent/.style={draw, very thick},
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, very thick},
  new/.style={fill=white, draw=red!80!black, very thick},
  new2/.style={fill=white, draw=blue!80!black, very thick, opacity=0},
  shared/.style={draw=red!50, dashed, ->, very thick},
  shared2/.style={draw=blue!50, dashed, ->, very thick, opacity=0},
  newedge/.style={draw=red, very thick},
  newedge2/.style={draw=blue, very thick, opacity=0},
  blue/.style={fill=white, draw=blue!80!black, very thick},
]
  \node[old] (root) {}
    child { node[old] (l1) {} 
      child { node[old] (ll2) {} 
        child {node[old] (lll3) {} }
        child {node[old] (llr3) {} }
      }
      child { node[old] (lr2) {} 
        child {node[old] (lrl3) {} }
        child {node[old] (lrr3) {} }
      }
    }
    child { node[old] (r1) {} 
      child { node[old] (rl2) {} 
        child {node[old] (rll3) {} }
        child {node[old] (rlr3) {} }
      }
      child { node[blue] (rr2) {} 
        child {node[old] (rrl3) {} }
        child[blue] {node[blue] (rrr3) {} }
      }
    };
  \node[blue, xshift=0.5cm, yshift=0cm] (newroot) at (root) {};
  \draw[shared] (newroot) -- (l1);
  \node[blue, xshift=0.5cm, yshift=0cm] (newr1) at (r1) {};
  \draw[blue] (newroot) -- (newr1);
  \draw[blue] (newr1) -- (rr2);
  \node[new, xshift=0.5cm, yshift=0cm] (newrl2) at (rl2) {};
  \draw[newedge] (newr1) -- (newrl2);
  \draw[shared] (newrl2) -- (rll3);
  \node[new, xshift=0.5cm, yshift=0cm] (newrlr3) at (rlr3) {};
  \draw[newedge] (newrlr3) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2root) at (newroot) {};
  \draw[shared2] (new2root) -- (l1);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2r1) at (newr1) {};
  \draw[newedge2] (new2r1) -- (new2root);
  \draw[shared2] (new2r1) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rr2) at (rr2) {};
  \draw[newedge2] (new2rr2) -- (new2r1);
  \draw[shared2] (new2rr2) -- (rrl3);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rrr3) at (rrr3) {};
  \draw[newedge2] (new2rrr3) -- (new2rr2);
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
  edge from parent/.style={draw, very thick},
  every node/.style={circle, draw=black, very thick, minimum size=0.9cm, font=\small},
  old/.style={fill=white, draw=gray!80!black, very thick},
  new/.style={fill=white, draw=red!80!black, very thick},
  new2/.style={fill=white, draw=blue!80!black, very thick},
  shared/.style={draw=red!50, dashed, ->, very thick},
  shared2/.style={draw=blue!50, dashed, ->, very thick},
  newedge/.style={draw=red, very thick},
  newedge2/.style={draw=blue, very thick}
]
  \node[old] (root) {}
    child { node[old] (l1) {} 
      child { node[old] (ll2) {} 
        child {node[old] (lll3) {} }
        child {node[old] (llr3) {} }
      }
      child { node[old] (lr2) {} 
        child {node[old] (lrl3) {} }
        child {node[old] (lrr3) {} }
      }
    }
    child { node[old] (r1) {} 
      child { node[old] (rl2) {} 
        child {node[old] (rll3) {} }
        child {node[old] (rlr3) {} }
      }
      child { node[old] (rr2) {} 
        child {node[old] (rrl3) {} }
        child {node[old] (rrr3) {} }
      }
    };
  \node[new, xshift=0.5cm, yshift=0cm] (newroot) at (root) {};
    \draw[shared] (newroot) -- (l1);
  \node[new, xshift=0.5cm, yshift=0cm] (newr1) at (r1) {};
  \draw[newedge] (newroot) -- (newr1);
  \draw[shared] (newr1) -- (rr2);
  \node[new, xshift=0.5cm, yshift=0cm] (newrl2) at (rl2) {};
  \draw[newedge] (newr1) -- (newrl2);
  \draw[shared] (newrl2) -- (rll3);
  \node[new, xshift=0.5cm, yshift=0cm] (newrlr3) at (rlr3) {};
  \draw[newedge] (newrlr3) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2root) at (newroot) {};
  \draw[shared2] (new2root) -- (l1);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2r1) at (newr1) {};
  \draw[newedge2] (new2r1) -- (new2root);
  \draw[shared2] (new2r1) -- (newrl2);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rr2) at (rr2) {};
  \draw[newedge2] (new2rr2) -- (new2r1);
  \draw[shared2] (new2rr2) -- (rrl3);
  \node[new2, xshift=0.5cm, yshift=0cm] (new2rrr3) at (rrr3) {};
  \draw[newedge2] (new2rrr3) -- (new2rr2);
\end{tikzpicture}
```

  </template>
</TikzMorph>
</div>
