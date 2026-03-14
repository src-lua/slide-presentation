---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Beats

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">

<div>
Note que não usamos a tag_condition em lugar nenhum na prova. De fato, para esse caso com point-updates, a tag_condition não é necessária. No entanto, para casos mais gerais, como range-updates, a tag_condition é essencial para garantir a eficiência do algoritmo. 

(O Peltorator não conseguiu explicar a prova mas ele jura que precisa)

</div>

<div style="--slidev-code-font-size: 0.5em; transform: translateY(20px);">

```cpp {all|2-4|6-17|7-10|11-16|all}{maxHeight:'400px'}
struct Tag {
    ll set, mod;

    Tag(ll set = NO_OP, ll mod = NO_OP) : set(set), mod(mod) {}

    void inline compose(const Tag& t) {
        if (set != NO_OP) {
            if (t.set != NO_OP) set = t.set, mod = NO_OP;
            else set %= t.mod;
        }
        else {
            if (t.set != NO_OP) set = t.set, mod = NO_OP;
            else if (mod == NO_OP) mod = t.mod;
            // CASO BEATS, não dá pra compor 
            // if (mod != NO_OP && t.mod != NO_OP) 
        }
    }
};
```
</div>
</div>