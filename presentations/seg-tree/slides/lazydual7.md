---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# Seg Tag

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
<div>

Como a Seg Lazy Dual não guarda valores parciais nos nós, não precisamos de um Node.

Por conta disso, a TAG guanha mais uma responsabilidade: 

<li> Aplicar o update em um valor pontual. </li>
<li> Guardar o update pendente </li>
<li> Saber se unir com outra tag </li>

</div>

<div style="--slidev-code-font-size: 0.5em; transform: translateY(20px);">

````md magic-move
```cpp {*}{maxHeight:'400px'}
struct Tag { // SegLazy
    ll add = 0;

    inline void compose(const Tag& t) {
        add += t.add;
    }
};
```
```cpp {all|3-5|8|all}
struct Tag { // SegDual
    ll add = 0;

    inline void compose(const Tag& t) {
        add += t.add;
    }

    void apply(ll& val) { val += t.add; }
};
```
````
</div>

</div>