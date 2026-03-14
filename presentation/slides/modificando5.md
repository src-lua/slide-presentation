---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# Soma e produto
<br>**Update:** Multiplicar por $M$ e Somar $A$ em $[L, R]$ | **Query:** Soma de $[L, R]$ (Com módulo)

<div style="--slidev-code-font-size: 0.58em; transform: translateY(0px);">

```cpp {all|1-11|2-5|7|8-10|13-20|14|16-19|all}
struct Node {
    ll val = 0; // Elemento Neutro da Soma

    Node() {}
    Node(ll v) : val(v) {}

    static inline Node merge(const Node& l, const Node& r) { return Node((l.val + r.val) % MOD); }
    void inline apply(const Tag& t, int l, int r) {
        val = (val * t.mul % MOD + t.add * (r - l + 1) % MOD) % MOD;
    }
};

struct Tag {
    ll add = 0, mul = 1; // Neutros da Soma e do Produto

    void compose(const Tag& t) {
        add = (add * t.mul % MOD + t.add) % MOD;
        mul = (mul * t.mul) % MOD;
    }
};
```
</div>