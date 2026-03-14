---
layout: default
---

<LogoBar variant="black" position="header" align="right" />

<br>

# Código

```cpp {all|2-4|6-8|10-20|11-14|15-18|21-23|25-27|all}{maxHeight:'400px'}
struct Node {
    ll val, mx;

    Node(ll val = 0) : val(val), mx(val) {}

    inline static Node merge(const Node& l, const Node& r) {
        return {l.val + r.val, max(l.mx, r.mx)};
    }

    inline void apply(const Tag& t, ll l, ll r) {
        if (t.set != NO_OP) {
            mx = t.set;
            val = t.set * (r-l+1);
        }
        else if (t.mod != NO_OP) {
            mx %= t.mod;
            val = mx * (r-l+1);
        }
    }

    inline bool break_condition(const Tag& t) const {
        return t.set == NO_OP && mx < t.mod;
    }

    inline bool tag_condition(const Tag& t) const {
        return false;
    }
};
```