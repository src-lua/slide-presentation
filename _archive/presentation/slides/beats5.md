---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Queremos mostrar que, apesar de termos que "descer" em alguns casos, a complexidade é $\mathcal{O}((n+q) \log n \log C)$, onde $C$ é o maior valor do array.

Para isso, vamos definir $\phi(v)$ o potencial de um nó e $\Phi$ o potencial da árvore:

$$\phi(v) = \sum_{i=l[v]}^{r[v]} \log (arr[i] + 1) $$
$$0 \leq \Phi = \sum_{} \phi(v) \leq \mathcal{O}(n \log n \log C)$$

<div class="-mt-6 text-[0.7em] !leading-[1.2em] italic">

A desigualdade vale pois cada elemento contribui com no máximo $\log (C + 1)$ para o potencial de um nó, cada um dos $\mathcal{O}(n)$ elemento está contido em exatamente um nó por nível e a árvore possui $\mathcal{O}(\log n)$ níveis.

</div>

::right::

Além dessa definição de potencial, vamos separar os nós da árvore em três tipos:

- Simples: Nós que a árvore teria que descer de qualquer forma
- Terminais: Nós que param a descida (break condition ou tag condition)
- Não-terminais: Nós que a árvore desce por causa das condições especiais