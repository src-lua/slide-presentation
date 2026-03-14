---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Persistente

Por vezes, queremos realizar queries em uma versão anterior da estrutura de dados. 
- Exemplo: "Qual era a soma no range $[L,R]$ logo após o $k$-ésimo update?"

A Abordagem Ingênua: Clonar a árvore inteira a cada update.

::right::

Guardamos um array de SegTrees: vector\<SegTree\> versions;

O Gargalo:
- Tempo: $\mathcal{O}(N \cdot Q )$ para copiar tudo a cada update.
- Memória: $\mathcal{O}(N \cdot Q)$. Se $N=10^5$ e &nbsp;&nbsp; $Q=10^5$, precisamos de $10^{10}$ posições. Explode a memória!


