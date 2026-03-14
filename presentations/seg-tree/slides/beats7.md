---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Para efeitos de complexidade, toda vez que descemos para um nó terminal, terminamos uma descida, logo, não precisamos nos preocupar com esses nós.

Para os nós simples, a árvore teria que descer de qualquer forma, logo, eles também não impactam a complexidade extra. De qualquer forma, cada update só pode descer $\mathcal{O}(q \log n)$ vezes em nós simples.

::right::

Vamos mostrar que, ao visitar um nó não-terminal, o potencial da árvore diminui em pelo menos 1. Sendo assim, eles contribuem com $\mathcal{O}(n \log n \log c) + \Phi_+$ onde $\Phi_+$ é o potencial adicional da árvore (vamos falar mais sobre posteriormente).

Definindo dessa forma, a complexidade total de descidas seria $\mathcal{O}(n \log n \log C + \Phi_+ + q \log n)$. Portanto, para provar que o algoritmo está em $\mathcal{O}((n+q) \log n \log C)$, precisamos mostrar que $\Phi_+ \in \mathcal{O}((n+q) \log n \log C)$.