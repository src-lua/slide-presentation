---
layout: default
---
<LogoBar variant="black" position="header" align="right" />


# Soma em Range
<br>**Update:** Somar $x$ em $[L, R]$ | **Query:** Soma de $[L, R]$

<div style="--slidev-code-font-size: 0.58em; transform: translateY(0px);">

```cpp {all|1-9|2-5|7|8|11-15|12|14|all}
struct Node {
    ll val = 0; // Elemento Neutro da Soma

    Node() {}
    Node(ll v) : val(v) {}

    static inline Node merge(const Node& l, const Node& r) { return Node(l.val + r.val); }
    void inline apply(const Tag& t, int l, int r) { val += t.add * (r - l + 1); }
};

struct Tag {
    ll add = 0; // Elemento Neutro da Soma

    void compose(const Tag& t) { add += t.add; }
};
```
</div>