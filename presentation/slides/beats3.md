---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Beats

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">

<div>
A ideia central da Segment Tree Beats é usar a Complexidade Amortizada.

Não usamos Lazy tradicional. Em vez disso, usamos condições de parada inteligentes (break_condition e tag_condition) para evitar propagar operações que não afetariam o resultado ou que já podem ser pre-calculadas.
</div>

<div style="--slidev-code-font-size: 0.5em; transform: translateY(20px);">

````md magic-move
```cpp {*}{maxHeight:'400px'}
void update(int no, int l, int r, int a, int b, const TAG& v) {
    if (b < l || r < a) return;
    if (a <= l && r <= b) {
        seg[no].apply(v, l, r);
        lazy[no].compose(v);
        return;
    }
    push(no, l, r);
    int m = (l + r) >> 1;
    update(no << 1, l, m, a, b, v);
    update((no << 1) | 1, m + 1, r, a, b, v);
    seg[no] = NODE::merge(seg[no << 1], seg[(no << 1) | 1]);
}
```
```cpp {all|2|3-4|all}
void update(int no, int l, int r, int a, int b, const TAG& v) { 
    if (b < l || r < a || seg[no].break_condition(v)) return;
    if (l == r) return seg[no].apply(v, l, r), void();
    if ((a <= l && r <= b) && seg[no].tag_condition(v)) {
        seg[no].apply(v, l, r);
        lazy[no].compose(v);
        return;
    }
    push(no, l, r);
    int m = (l + r) >> 1;
    update(no << 1, l, m, a, b, v);
    update((no << 1) | 1, m + 1, r, a, b, v);
    seg[no] = NODE::merge(seg[no << 1], seg[(no << 1) | 1]);
}
```
````
</div>
</div>