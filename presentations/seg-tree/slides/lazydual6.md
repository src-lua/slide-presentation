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
```cpp {*}
void push(int no, int l, int r) { // SegDual
    int e = no << 1, d = e | 1;
    
    lazy[e].compose(lazy[no]);
    lazy[d].compose(lazy[no]);
    
    lazy[no] = TAG();
}
```
````
