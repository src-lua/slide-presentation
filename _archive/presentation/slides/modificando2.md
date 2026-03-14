---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Seg Lazy Dual

Podemos fazer Seg Trees de quaisquer operações que respeitem algumas propriedades.

Para as segs sem lazy propagation, a operação deve:
- Ser Associativa $(a \cdot b) \cdot c = a \cdot (b \cdot c)$
- Ter elemento neutro $(a \cdot \theta) = a$


::right::

Já as segs com lazy, precisam de mais 2 propriedades:
- Distributividade (ou Composição)
- Composição de Lazy Updates

A operação de atualização deve ser capaz de ser aplicada ao resultado de um nó sem necessariamente percorrer todos os seus filhos. Isto é, a operação da TAG sobre o NODE deve ser distributiva em relação à operação de merge do NODE

