---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# CHMIN "Ji Driver Segmment Tree"

Queries que queremos suportar:
- Update Range Chmin: $A_i​=\min(A_i,x)$
- Range Sum: $S = \sum_{i=L}^R A_i$

<br>Sendo assim, podemos definir:

- Break Condition: $max[v] <= x$
- Tag Condition: $secondMax[v] < x <max[v]$

::right::

Com essa tag condition, se soubermos a quantidade de elementos que são iguais ao máximo, podemos calcular o valor total do intervalo após a operação de chmin sem precisar olhar os elementos individualmente.

$$newSum = Sum - (max[v] - x) \cdot countMax[v]$$

A composição de Tags também funciona, visto que se quisermos fazer um chmin com $X_1$ e depois um chmin com $X_2$, o resultado é o mesmo que fazer um chmin com $min(X_1, X_2)$.