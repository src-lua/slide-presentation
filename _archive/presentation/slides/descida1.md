---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# Descida na Árvore (SegTree Walk)

É uma técnica para buscar um índice que satisfaz uma condição específica, navegando diretamente pela estrutura da árvore.
- O Problema: Encontrar o primeiro índice i tal que $A[i] \geq x$.
- Abordagem Clássica: Busca Binária na resposta + Range Query → $\mathcal{O}(\log^2 n)$.
- Walk on Tree: Elimina a busca binária externa, descendo direto da raiz à folha → $\mathcal{O}(\log n)$.

::right::

**Como funciona (Lógica Gulosa):**

Em vez de quebrar o intervalo em vários nós, traçamos um caminho único:
- Começamos na Raiz.
- Verificamos o Filho da Esquerda:
- A resposta pode estar lá?   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (ex: $max(left) \geq x$)
  - Sim: Descemos para a Esquerda.
  - Não: Descemos para a Direita.
- Repetimos até chegar numa Folha.