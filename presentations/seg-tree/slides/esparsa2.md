---
layout: two-cols
---
<LogoBar variant="black" position="header" align="right" />

# SegTree Esparsa

Por vezes, queremos fazer queries sob intervalos grande, como $[0, 10^9]$, mas o número de updates ($Q$) é pequeno (ex: $10^5$). Como lidamos com isso se o espaço da Seg é $\mathcal{O}(4 \times N)$ ?

- **Limitação:** Um array de $4 \times 10^9$ é impossível de alocar.



::right::

**Soluções:**

- **Compressão de Coordenadas:** Ótima se você tiver todos os updates offline.

- **SegTree Dinâmica:** Necessária se os updates forem online. (Ou se você não quiser lidar com compressão)
