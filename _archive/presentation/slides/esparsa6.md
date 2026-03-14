---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

````md magic-move
```cpp {*}
void update(int no, int l, int r, int a, int b, const TAG& v) { // SegLazy
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

```cpp {all|2|4|5-13|15-17|all}
void update(int v, ll l, ll r, ll ql, ll qr, const TAG& t) { // Seg Esparsa
    if (ql <= l && r <= qr) return seg[v].apply(t, l, r);
    
    push(v, l, r);
    ll mid = l + (r - l) / 2;
    if (ql <= mid) {
        if (seg[v].l == -1) { seg[v].l = seg.size(); seg.emplace_back(); }
        update(seg[v].l, l, mid, ql, qr, t);
    }
    if (qr > mid) {
        if (seg[v].r == -1) { seg[v].r = seg.size(); seg.emplace_back(); }
        update(seg[v].r, mid + 1, r, ql, qr, t);
    }
    
    NODE left = (seg[v].l != -1) ? seg[seg[v].l].node : NODE();
    NODE rght = (seg[v].r != -1) ? seg[seg[v].r].node : NODE();
    seg[v].node = NODE::merge(left, rght);
}
```
````