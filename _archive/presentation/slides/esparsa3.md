---
layout: default
---


<LogoBar variant="black" position="header" align="right" />

# SegTree Esparsa

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
<div>

Para fazer uma árvore esparsa (ou dinâmica) podemos usar uma estrutura de ponteiros para criar os nós sob demanda, somente quando uma query ou update tentar acessá-lo. Dessa forma, cada nó da árvore tem um ponteiro para quem é seu filho à esquerda e à direita.

Para evitar o *overhead* de ponteiros e de alocação de memória na *heap* (lento), podemos guardar a estrutura inteira em um vector\<InternalNode\>  e usar índices inteiros.
</div>

<div style="--slidev-code-font-size: 0.5em; transform: translateY(20px);">

````md magic-move
```cpp {*}
    struct InternalNode {
        NODE node;
        TAG tag;
        InternalNode *l, *r;
        InternalNode() : node(NODE()), tag(TAG()),
                         l(nullptr), r(nullptr) {}

        void apply(const TAG& t, ll l, ll r) {
            node.apply(t, l, r);
            tag.compose(t);
        }
    };
```
```cpp {*}
template<typename NODE, typename TAG>
struct DynamicSegTree {
    struct InternalNode {
        NODE node;
        TAG tag;
        int l, r;
        InternalNode() : node(NODE()), tag(TAG()),
                            l(-1), r(-1) {}

        void apply(const TAG& t, ll l, ll r) {
            node.apply(t, l, r);
            tag.compose(t);
        }
    };

    ll L, R;
    vector<InternalNode> seg;

    ...
};
```
````
</div>

</div>