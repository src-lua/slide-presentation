---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Queremos mostrar que, apesar de termos que "descer" em alguns casos, a complexidade total é $\mathcal{O}((n+q) \log N \log C)$, onde $C$ é o maior valor presente no array.

Para isso, vamos definir $\phi(v)$ o potencial de um nó e o potencial da árvore:

$$\phi(v) = \sum_{i=l[v]}^{r[v]} \log (arr[i] + 1) $$
$$0 \leq \Phi(v) = \sum_{} \phi(v) \leq \mathcal{O}(n \log n \log c)$$

<div class="-mt-6 text-[0.7em] !leading-[1.2em] italic">

A desigualdade vale pois cada elemento contribui com no máximo $\log C + 1$ para o potencial de cada nível da árvore, e a árvore tem altura $\log N$.

</div>

::right::

Além dessa definição de potencial, vamos separar os nós da árvore em três tipos:

- Simples: Nós que a árvore teria que descer de qualquer forma
- Terminais: Nós que param a descida (break condition ou tag condition)
- Não-terminais: Nós que a árvore desce por causa das condições especiais