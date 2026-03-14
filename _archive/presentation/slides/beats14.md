---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Agora basta provar que, visitando um nó não-terminal o potencial é diminúido em pelo menos um. Isso acontece por que, se o nó é um nó não terminal, então $max < secondMax < x$, logo, ambos $max$ e $secondMax$ vão colapsar para o mesmo valor $x$ e diminuir o potencial em pelo menos 1.


Portanto, a complexidade total do algoritmo é:
- $\mathcal{O}(n \log n)$: Do potencial inicial
- $\mathcal{O}(q \log n)$: De visitar os nós comuns
- ***Total:*** $\mathcal{O}((n+q) \log n)$

::right::

Note que, de forma análoga, podemos suportar a operação de chmax ($A_i​=max(A_i​,x)$). 

Inclusive, é possível suportar ambas as operações simultaneamente guardando o máximo, 2º máximo, o mínimo, 2º mínimo, a quantidade de máximos e a quantidade de mínimos para cada intervalo.

Uma operação de assign $(=)$ também pode ser adicionada sem alterar a complexidade temporal pois também soma, no máximo, $\mathcal{O}(q \log n)$ ao $\Phi_+$.