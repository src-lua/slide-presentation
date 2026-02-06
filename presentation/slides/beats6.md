---
layout: default
clicks: 1
---

<script setup>
import TikzFade from '../components/TikzFade.vue'
import TikzServerSide from '../components/TikzServerSide.vue'
</script>

<LogoBar variant="black" position="header" align="right" />

# Prova de Complexidade
<TikzFade :clicks="$clicks" style="scale: 0.65;">
  <template #base>
    <TikzServerSide scale="1.6" style="transform: translate(0px, -75px);">
      <div v-pre>
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
\end{tikzpicture}
      </div>
    </TikzServerSide>
  </template>

</TikzFade>