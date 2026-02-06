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

```cpp {*}
void update(int no, int l, int r, int a, int b, const TAG& v) { // SegDual
    if (b < l || r < a) return;
    if (a <= l && r <= b) {
        lazy[no].compose(v);
        return;
    }
    push(no, l, r);
    int m = (l + r) >> 1;
    update(no << 1, l, m, a, b, v);
    update((no << 1) | 1, m + 1, r, a, b, v);
}
```
````