---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

&nbsp;

# Código

````md magic-move
```cpp {*}
void push(int no, int l, int r) { // SegLazy
    int m = (l + r) >> 1;
    int e = no << 1, d = e | 1;

    seg[e].apply(lazy[no], l, m);
    lazy[e].compose(lazy[no]);

    seg[d].apply(lazy[no], m + 1, r);
    lazy[d].compose(lazy[no]);

    lazy[no] = TAG(); 
}
```
```cpp {all|2|3-6|8-9|11-13|15|all}
void push(int v, ll l, ll r) { // Seg Esparsa
    if (seg[v].tag == TAG()) return;
    if (l == r) {
        seg[v].tag = TAG();
        return;
    }

    if (seg[v].l == -1) { seg[v].l = seg.size(); seg.emplace_back(); }
    if (seg[v].r == -1) { seg[v].r = seg.size(); seg.emplace_back(); }

    ll mid = l + (r - l) / 2;
    seg[seg[v].l].apply(seg[v].tag, l, mid);
    seg[seg[v].r].apply(seg[v].tag, mid+1, r);
    
    seg[v].tag = TAG();
}
```
````
