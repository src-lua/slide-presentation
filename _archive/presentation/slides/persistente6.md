---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

````md magic-move
```cpp {*}
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

```cpp {all|2|3|5|7-16|18-19|all}
int update(int prev_root, int L, int R, int idx, NODE v) { // Seg Persistente
    int node = seg.size();
    seg.push_back(prev_root == 0 ? Node() : seg[prev_root]);

    if (L == R) { seg[node].data.apply(v); return node }
    
    int mid = L + (R - L) / 2;
    
    if (idx <= mid) { // Cuidado com ordem de avaliacao (LHS) pre-C++17
        int prev_left = (prev_root == 0) ? 0 : seg[prev_root].l;
        seg[node].l = update(prev_left, L, mid, idx, v);
    }
    else { // Cuidado com ordem de avaliacao (LHS) pre-C++17
        int prev_right = (prev_root == 0) ? 0 : seg[prev_root].r;
        seg[node].r = update(prev_right, mid + 1, R, idx, v);
    }

    seg[node].data = NODE::merge(seg[seg[node].l].data, seg[seg[node].r].data);
    return node;
}
```
````