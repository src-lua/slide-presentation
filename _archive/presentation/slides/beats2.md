---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Beats

Até agora, lidamos com operações "amigáveis" que permitem Lazy Propagation:
- Range Add (+)
- Range Set (=)
- Range Mul (×)

Mas e se a operação não for distributiva ou for difícil de compor?

::right::

Imagine operações como:

- Range Chmin: $A_i​=min(A_i,x)$
- Range Modulo: $A_i​=A_i ​\% M$
- Range Sqrt: $A_i​= \sqrt{A_i}$

**Por que o Lazy falha?** Não existe uma fórmula fechada simples para calcular a soma de um intervalo após aplicar mod M ou sqrt sem olhar os elementos individualmente.
