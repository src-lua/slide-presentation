---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Extended Ji Driver Segmment Tree

Queries que queremos suportar:
- Update Range Chmin: $A_i​=\min(A_i​,x)$
- Update Range Chmax:$A_i​=\max(A_i​,x)$
- Update Range Assign: $A_i​ = x$
- Update Range Sum: $A_i​ += x$
- Range Sum: $S = \sum_{i=L}^R A_i$
- Range Min: $S = \min_{i=L}^R A_i$
- Range Max: $S = \max_{i=L}^R A_i$

::right::

Já sabemos como fazer todas essas operações simultaneamente, exceto pelo update de range com soma.
Na prática, a operação de $(+=)$ não é dificil de implementar, no entanto, ela quebra a nossa complexidade do potencial.

Suponha um array $A$ com $n$ elementos. Suponha que os primeiros $\frac{n}{2}$ elementos sejam distintos e os próximos $\frac{n}{2}$ elementos sejam uma cópia dos primeiros. Agora suponha que fazemos a query $addone(\frac{n}{2}, n)$. Agora o array tem n elementos, portanto, $\Phi_+ \in \mathcal{O}(n)$.