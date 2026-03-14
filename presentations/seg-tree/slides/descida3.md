---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

```cpp {all|2|3-4|6-7|9-12|all}{maxHeight:'400px'}
int walk(SegTree<Node>& seg, int target, int no = 1, int l = 0, int r = -1) {
    if (r == -1) r = seg.N - 1;
    if (seg.seg[no].val < target) return -1;
    if (l == r) return l;

    int m = (l + r) >> 1;
    int e = no << 1, d = e | 1;

    if (seg.seg[e].val >= target)
        return walk(seg, target, e, l, m);
    else
        return walk(seg, target, d, m + 1, r);
}
```
