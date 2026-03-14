---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Pela nossa definição, ao passar por nós comuns, o potencial pode ser modificado em no máximo $\mathcal{O}(q \log n)$ nós. Como o potencial de cada nó em no máximo 1, $\Phi_+ \in \mathcal{O}(q \log n)$

Como ao passar por um nó não-terminal, o potencial diminui em $\frac{1}{\log n}$, vamos multiplicar todo o potencial por $\log n$ e obter, agora um novo potencial $\Psi$ que é diminuído em 1 ao passar por cada nó não-terminal. 

$$\Psi \in \mathcal{O}(n \log n)$$
$$\Psi_+ \in \mathcal{O}(q \log^2 n)$$

::right::

Portanto, a complexidade total do algoritmo está em $\mathcal{O}((n+q) \log² n)$

Ou seja, a adição da operação $(+=)$ altera a classe de complexidade da SegBeats por apenas um logaritmo, mantendo a eficiência do algoritmo.

<div class="text-xs w-full">

| Variante | Operações | Complexidade |
| :--- | :--- | :--- |
| **Lazy SegTree** | $+$, $=$, Sum | $\mathcal{O}(q \log n)$ |
| **Jiri Driver** | $\min=$, Sum | $\mathcal{O}((n+q) \log n)$ |
| **Extended Jiri** | $\min=$, $+$, Sum | $\mathcal{O}((n+q ) \log^2 N)$ |
</div>
