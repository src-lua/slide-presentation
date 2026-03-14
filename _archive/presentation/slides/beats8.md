---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Para calcular $\Phi_+$, podemos usar do fato de que, em cada atualização, sabemos que $oldValue \geq 0$ e que $newValue \le C$. Logo, o potencial adicional de cada elemento é no máximo $\log (C + 1) - \log (0 + 1) = \log C$.

Sendo assim, como temos $\mathcal{O}(q)$ updates e cada update influencia em no máximo $\mathcal{O}(\log n)$ nós, temos $\Phi_+ \leq \mathcal{O}(q \log n \log C)$.

::right::

Agora, resta provar que o potencial diminui em pelo menos 1 para cada nó não-terminal que visitamos. Como o nó é não-terminal, algum filho dele tem que ser atualizado, logo, algum filho dele possuí valor $k \geq x$.

Vamos usar a identidade $k \% x \leq \frac{k-1}{2}$ para mostrar que, como o valor de algum nó diminuiu pelo menos para a sua metade, o logaritmo do valor do nó diminui em pelo menos 1, logo, o potencial da árvore diminui em pelo menos 1.