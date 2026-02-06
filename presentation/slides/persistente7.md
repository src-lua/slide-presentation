---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

````md magic-move
```cpp {*}
NODE query(int v, ll l, ll r, ll ql, ll qr) { // Seg Esparsa
    if (v == -1 || ql > r || qr < l) return NODE();
    if (ql <= l && r <= qr) return seg[v].node;
    push(v, l, r);
    ll mid = l + (r - l) / 2;
    return NODE::merge(query(seg[v].l, l, mid, ql, qr),
                        query(seg[v].r, mid + 1, r, ql, qr));
}

void update(ll ql, ll qr, const TAG& t) { update(0, L, R, ql, qr, t); }
NODE query(ll ql, ll qr) { return query(0, L, R, ql, qr); }
```

```cpp {all|2|3|4|5-6|9-11|13-15|all}
NODE query(int node, int L, int R, int i, int j) { // Seg Persistente
    if (node == 0 || i > R || j < L) return NODE();
    if (i <= L && R <= j) return st[node].data;
    int mid = L + (R - L) / 2;
    return NODE::merge(query(st[node].l, L, mid, i, j),
                    query(st[node].r, mid + 1, R, i, j));
}

void update(int idx, NODE v) {
    roots.push_back(update(roots.back(), 0, N - 1, idx, v));
}

NODE query(int version, int l, int r) {
    return query(roots[version], 0, N - 1, l, r);
}
```
````