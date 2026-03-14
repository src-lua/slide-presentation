---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Vamos redefinir o potencial de um nó $\phi(v)$ da seguinte forma:

$$ \phi(v) = \begin{cases} 1 & \text{se } \max(left) \neq \max(right) \\ 0 & \text{caso contrário} \end{cases}$$
$$0 \leq \Phi(v) = \sum_{} \phi(v) \leq \mathcal{O}(n)$$

<div class="-mt-6 text-[0.7em] !leading-[1.2em] italic">

A desigualdade vale pois existem no máximo $4 \cdot n$ nós que contribuem com no máximo 1 para o potencial.

</div>

Vamos chamar os nós não-terminais $u / \phi(u) = 1$ de marcados. Para cada nó marcado $u$, existe, na sua subárvore um nó $v$ tal que $left(v) = max(u), right(v) = secondMax(u)$.

::right::

Sendo assim, ao aplicar um $chmin(x)$, $max(u) \lt secondMax(u) \lt x$ , caso contrário, $u$ não seria não-terminal.

Sendo assim, ao aplicar a operação, os dois filhos de $v$ vão se tornar iguais a $x$, sendo assim, $\phi(v)$ muda de 1 para 0.

Com isso, acabamos de provar que o potencial continua diminuindo em pelo menos 1 toda vez que visitamos uma subtree que contem um nó não terminal. Como essa subtree contêm $\mathcal{O}(\log n)$ nós, o potencial diminui em $\frac{1}{\log n}$ por nó não-terminal visitado.