---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

````md magic-move
```cpp {*}
NODE query(int no, int l, int r, int a, int b) { // SegLazy
    if (b < l || r < a) return NODE();
    if (a <= l && r <= b) return seg[no];
    push(no, l, r);
    int m = (l + r) >> 1;
    return NODE::merge(query(no << 1, l, m, a, b),
                    query((no << 1) | 1, m + 1, r, a, b));
}

void update(int l, int r, const TAG& v) { update(1, 0, N - 1, l, r, v); }
NODE query(int l, int r) { return query(1, 0, N - 1, l, r); }
```

```cpp {*}
T get(int no, int l, int r, int idx) { // SegDual
    if (l == r) {
        T res = leaves[idx];
        lazy[no].apply(res);
        return res;
    }
    push(no, l, r);
    int m = (l + r) >> 1;
    if (idx <= m) return get(no << 1, l, m, idx);
    else return get((no << 1) | 1, m + 1, r, idx);
}

void update(int l, int r, const TAG& t) { update(1, 0, N - 1, l, r, t); }
T get(int idx) { return get(1, 0, N - 1, idx); }
```
````