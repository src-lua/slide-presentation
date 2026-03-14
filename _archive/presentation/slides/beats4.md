---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Beats

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">

<div>

A Break Condition serve para evitar fazer updates desnecessários em segmentos que não serão afetados pela operação. Por exemplo, aplicar um $mod = x$, se o valor máximo do segmento já for menor que $x$.

Já a Tag Condition verifica se o segmento inteiro pode ser atualizado diretamente sem precisar propagar a operação para os filhos. Por exemplo, podemos ver $a\%x$ como $a - \lfloor \frac{a}{x} \rfloor \cdot x$. Sendo assim, se $\lfloor \frac{a}{x} \rfloor$ for constante no segmento, podemos aplicar a operação diretamente.
  
</div>

<div class="-ml-10" style="--slidev-code-font-size: 0.5em; transform: translate(30px, 20px);">
```cpp {*}
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
</div>
</div>