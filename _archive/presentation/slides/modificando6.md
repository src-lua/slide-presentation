---
layout: default
---
<LogoBar variant="black" position="header" align="right" />

# Outras Operações

<div style="--slidev-code-font-size: 0.4em; margin-top: 20px;">

<div class="grid grid-cols-2 gap-6">

<div class="flex flex-col gap-2">

<div>
      <!-- <span class="text-sm opacity-70 font-bold">Lazy Simples (XOR)</span> -->

```cpp
struct FlipTag {
    bool flip = false;

    void compose(const FlipTag& t) { flip ^= t.flip; }
};
```

</div>

<div>
  <!-- <span class="text-sm opacity-70 font-bold">Merge: Rolling Hash</span> -->

```cpp
ll P[MANX]; // Potências da base pré-calculadas

struct HNode { // HashNode
    ll hash = 0; int len = 0;

    HNode() : hash(0), len(0) {}
    HNode(char c) : hash(c-'a'+1), len(1) {}

    static inline HNode merge(const HNode& l, const HNode& r) {
        HNode res;
        res.hash = (l.hash * P[r.len] + r.hash) % MOD;
        res.len = l.len + r.len;
        return res;
    }
};
```

</div>

</div>

<div> 
<!-- <span class="text-sm opacity-70 font-bold">Composição: Set + Add</span> -->

```cpp
struct SANode { //SetAddNode
    ll val = 0; SANode(ll val = 0) : val(val) {}

    static inline SANode merge(const SANode& l, const SANode& r) {
        return SANode(l.val + r.val);
    }

    void inline apply(const SetAddTag& t, int l, int r) {
        if (t.set != NO_UPDATE) val = t.set * (r - l + 1);
        val += t.add * (r - l + 1);
    }
};

struct SetAddTag {
    ll set = NO_UPDATE, add = 0;

    void compose(const SetAddTag& t) {
        if (t.set != NO_UPDATE) set = t.set, add = 0;
        else {
            if (set != NO_UPDATE) set += t.add;
            else add += t.add;
        }
    }
};
```

</div>
</div>
</div>
