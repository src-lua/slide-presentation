---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

<br>

# Código

````md magic-move
```cpp {*}
template<typename NODE, typename TAG>
struct DynamicSegTree {
    struct InternalNode {
        NODE node;
        TAG tag;
        int l, r;
        InternalNode() : node(NODE()), tag(TAG()), l(-1), r(-1) {}

        void apply(const TAG& t, ll l, ll r) {
            node.apply(t, l, r);
            tag.compose(t);
        }
    };

    ll L, R;
    vector<InternalNode> seg;

    DynamicSegTree(ll l, ll r) : L(l), R(r) {
        seg.reserve(4e6); seg.emplace_back();
    }
```

```cpp {all|3-7|9-16|15|all}
template<typename NODE>
struct PersistentSegmentTree {
    struct InternalNode {
        NODE data;
        int l, r;
        InternalNode() : data(NODE()), l(0), r(0) {}
    };

    int N;
    vector<InternalNode> seg;
    vector<int> roots;

    PersistentSegmentTree(int n) : N(n) {
        seg.reserve(4e6); seg.emplace_back();
        roots.push_back(0);
    }
```
````