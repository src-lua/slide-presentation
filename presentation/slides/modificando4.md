---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# Set em Range

<br>**Update:** Setar $x$ para todo elemento em $[L, R]$ | **Query:** Soma de $[L, R]$

<div style="--slidev-code-font-size: 0.58em; transform: translateY(0px);">

```cpp {all|1|1,3-11|4-7|9|10,1|13-17|1,14|1,16|all}
const int NO_UPDATE = -1e9;

struct Node {
    ll val = 0; // Elemento Neutro da Soma

    Node() {}
    Node(ll v) : val(v) {}

    static inline Node merge(const Node& l, const Node& r) { return Node(l.val + r.val); }
    void inline apply(const Tag& t, int l, int r) { if (t.set != NO_UPDATE) val = t.set * (r - l + 1); }
};

struct Tag {
    ll set = NO_UPDATE; // Elemento Neutro do set

    void compose(const Tag& t) { if (t.set != NO_UPDATE) set = t.set; }
};
```
</div>