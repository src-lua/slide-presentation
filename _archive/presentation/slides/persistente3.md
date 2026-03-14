---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Path Copying

Um update pontual altera apenas o caminho da raiz até a folha ($\mathcal{O}(\log N)$ nós).

Todo o restante da árvore (as sub-árvores irmãs do caminho) permanece idêntico.

Portanto, em vez de copiar tudo, reaproveitamos os nós que não mudaram.

::right::

- Criamos apenas os nós novos do caminho alterado.
- Os novos nós apontam para os filhos "velhos" quando o caminho não segue por lá.

É essencialmente uma SegTree Dinâmica onde nunca deletamos nós.
Temos um array de raízes: $roots[k]$ aponta para a raiz da árvore no tempo $k$.
