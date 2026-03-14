---
layout: two-cols
---

<LogoBar variant="black" position="header" align="right"/>

# Prova de Complexidade

Vamos definir $\phi(v)$ o potencial de um nó e $\Phi$ o potencial da árvore:

$$ \phi(v) = \text{número de elementos distintos em } [L_v, R_v] $$
$$0 \leq \Phi = \sum_{} \phi(v) \leq \mathcal{O}(n \log n)$$

<div class="-mt-6 text-[0.7em] !leading-[1.2em] italic">

A desigualdade vale pois cada um dos $n$ elementos é contabilizado no pontecial de, no máximo, $\mathcal{O}(\log n)$ nós (os seus ancetrais).

</div>

Análise do Potencial ($\Delta \Phi$):

- Terminais: Mantém ($\Delta \Phi = 0$)
  - Mapeamento 1:1 (Ex: todos x→y).

::right::

- Não-Terminais: Diminui ($\Delta \Phi < 0$)
  - Fusão de valores distintos reduz a contagem.
- Simples: Varia ($\Delta \Phi = ?$)
  - Pode quebrar grupos iguais (aumenta) ou unir valores distintos (diminui).

Note que, no caso dos nós simples, o aumento total é de $\mathcal{O}(\log n)$ por update ou $\mathcal{O}(q \log n)$ no total.
Logo, $\Phi_+ \in \mathcal{O}(q \log n)$