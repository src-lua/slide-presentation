---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# Seg Node

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
  <div>

O Node é um template que guarda as informações de cada nó da segtree.

O Node tem 3 responsabilidades:

<li> Guardar seu próprio valor </li>
<li> Saber se unir com outro nó </li>
<li> Saber como aplicar um update </li>

  </div>
  <div style="min-width: 0; max-width: 100%; overflow: hidden;">

<div style="scale=0.5">

```cpp {all|2-3|5-7|9-11|all}{maxHeight:'400px'}
struct Node {
    ll val = 0;
    Node(ll v = 0) : val(v) {}

    static inline Node merge(const Node& l, const Node& r) {
        return Node(l.val + r.val);
    }

    inline void apply(int v) {
        val = v;
    }
};
```

</div>

  </div>
</div>