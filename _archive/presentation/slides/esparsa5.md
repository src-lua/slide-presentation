---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

<br>

# Código

````md magic-move
```cpp {*}
template<typename NODE, typename TAG>
struct LazySegmentTree {
    int N;
    vector<NODE> seg;
    vector<TAG> lazy;

    LazySegmentTree(int n) : N(n), seg(4 * n), lazy(4 * n) {}

    LazySegmentTree(const vector<int>& v)
        : N(v.size()), seg(4 * v.size()), lazy(4 * v.size()) {
        build(1, 0, N - 1, v);
    }

    void build(int no, int l, int r, const vector<int>& v) {
        if (l == r) {
            seg[no] = NODE(v[l]); 
            return;
        }
        int m = (l + r) >> 1;
        build(no << 1, l, m, v);
        build((no << 1) | 1, m + 1, r, v);
        seg[no] = NODE::merge(seg[no << 1], seg[(no << 1) | 1]);
    }
```

```cpp {all|3-13|15-20|all}
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
````