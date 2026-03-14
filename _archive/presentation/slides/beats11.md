---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Outras operações

No geral, a prova de complexidade para qualquer operação de Seg Beats é similar. Definimos um potencial inicial $\Phi$ e um potencial adicional $\Phi_+$, e mostramos que o potencial diminui em pelo menos 1 para cada nó não-terminal visitado e que $\Phi_+$ é limitado por uma função polinomial de $n$ e $q$.

É como se tivéssemos um "orçamento" de descidas e cada operação que fazemos gasta um pouco dele. A chave é mostrar que, mesmo com descidas extras, o orçamento total necessário ainda é limitado por uma função polinomial de $n$ e $q$.

::right::

Em especial, existem mais 3 operações "famosas" de seg beats:
- chmin ($A_i​=min(A_i​,x)$) ("Ji Driver Segmment Tree")
- chmin, chmax and add ("Extended Ji Driver Segment Tree")
- chmin and/or add update with gcd query (não veremos, mas não é difícil de chegar)