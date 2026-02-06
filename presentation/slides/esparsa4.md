---
layout: default
clicks: 5
---

<script setup>
import TikzFade from '../components/TikzFade.vue'
import TikzServerSide from '../components/TikzServerSide.vue'
</script>

<LogoBar variant="black" position="header" align="right" />

# SegTree Esparsa


<TikzFade :clicks="$clicks">
  <template #base>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick}
]
  \node[] {}
    child { node[] {}
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    }
    child { node[] {}
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>
  <template #click-1>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick}
]
  \node[yellow] {}
    child { node[yellow] {}
      child { node[yellow] {}
        child { node[] {} }
        child { node[green] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    }
    child { node[] {}
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

  <template #click-2>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick},
  void/.style={draw=gray!50, dashed, text=gray!50, thick, fill=none},
  link/.style={edge from parent/.style={draw=gray!50, dashed, thick}}
]
  \node[blue] {}
    child { node[yellow] {}
      child { node[yellow] {}
        child { node[] {} }
        child { node[green] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    }
    child { node[blue] {}
      child { node[green] {}
        child { node[] {} }
        child { node[] {} }
      }
      child { node[] {}
        child { node[] {} }
        child { node[] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

  <template #click-3>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick},
  void/.style={draw=gray!50, dashed, text=gray!50, thick, fill=none},
  link/.style={edge from parent/.style={draw=gray!50, dashed, thick}}
]
  \node[blue] {}
    child { node[yellow] {}
      child { node[yellow] {}
        child[link] { node[void] {} }
        child { node[green] {} }
      }
      child[link] { node[void] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
    }
    child { node[blue] {}
      child { node[green] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
      child[link] { node[void] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

  <template #click-4>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick},
  purple/.style={fill=purple!30, draw=purple!80!black, thick},
  void/.style={draw=gray!50, dashed, text=gray!50, thick, fill=none},
  link/.style={edge from parent/.style={draw=gray!50, dashed, thick}}
]
  \node[purple] {}
    child { node[purple] {}
      child { node[yellow] {}
        child[link] { node[void] {} }
        child { node[green] {} }
      }
      child[] { node[purple] {}
        child[] { node[purple] {} }
        child[link] { node[void] {} }
      }
    }
    child { node[blue] {}
      child { node[green] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
      child[link] { node[void] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

  <template #click-5>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
\begin{tikzpicture}[
  level distance=1.5cm,
  level 1/.style={sibling distance=7cm},
  level 2/.style={sibling distance=3.5cm},
  level 3/.style={sibling distance=1.8cm},
  every node/.style={circle, draw=black, thick, minimum size=0.9cm, font=\small},
  interval/.style={label={[draw=none, rectangle, text=gray, yshift=-0.15cm]90:{\footnotesize #1}}},
  yellow/.style={fill=orange!30, draw=orange!80!black, thick},
  green/.style={fill=green!30, draw=green!80!black, thick},
  blue/.style={fill=blue!30, draw=blue!80!black, thick},
  purple/.style={fill=purple!30, draw=purple!80!black, thick},
  cyan/.style={fill=cyan!30, draw=cyan!80!black, thick},
  void/.style={draw=gray!50, dashed, text=gray!50, thick, fill=none},
  link/.style={edge from parent/.style={draw=gray!50, dashed, thick}}
]
  \node[cyan] {}
    child { node[purple] {}
      child { node[yellow] {}
        child[link] { node[void] {} }
        child { node[green] {} }
      }
      child[] { node[purple] {}
        child[] { node[purple] {} }
        child[link] { node[void] {} }
      }
    }
    child { node[cyan] {}
      child { node[cyan] {}
        child[link] { node[void] {} }
        child[] { node[cyan] {} }
      }
      child[link] { node[void] {}
        child[link] { node[void] {} }
        child[link] { node[void] {} }
      }
    };
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

</TikzFade>