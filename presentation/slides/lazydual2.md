---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Seg Lazy Dual

Às vezes, precisamos de range update, mas as queries serão só de pontos. Podemos usar uma Seg Lazy normal para isso, no entanto, a Lazy Dual é mais eficiente!

A Lazy Dual é uma variação da SegTree Lazy onde, ao invés de armezarmos os valores parciais nos nós, armazenamos apenas os updates pendentes e os valores das folhas.

::right::

A ideia principal é que não precisamos guardar todos os nós da seg, apenas as folhas. Assim não precisamos atualizar os nós no update, só dar push no lazy tag.

A complexidade se mantêm a mesma, no entanto, a constante acaba melhorando pois precisamos de menos operações intermediárias por update.
