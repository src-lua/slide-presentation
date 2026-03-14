---
layout: center
class: text-center
---

<LogoBar variant="black" position="header" />

<style>
.questions-title {
  @apply text-8xl font-black uppercase tracking-tighter;
  color: #cc0000; /* Vermelho forte */
  text-shadow: 0 0 20px rgba(204, 0, 0, 0.3);
  font-family: 'JetBrains Mono', monospace;
}

.sub-glow {
  @apply text-gray-400 opacity-50 italic mt-4;
}

.decoration-line {
  @apply w-24 h-1 bg-red-600 mx-auto mt-6 rounded-full;
}

/* Background sutil com caracteres de código */
.bg-code-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15rem;
  font-family: 'JetBrains Mono';
  color: rgba(204, 0, 0, 0.03);
  z-index: -1;
  user-select: none;
}
</style>

<div class="bg-code-overlay">
  { st[node].data }
</div>

<h1 class="questions-title animate-bounce-in">
  Dúvidas?
</h1>

<div class="decoration-line"></div>

<p class="sub-glow">
  lgf-cpLib :: persistent_segtree.cpp
</p>

<div class="mt-20 flex justify-center gap-8 text-red-800 opacity-80">
  <span>github.com/lgf-fernandes</span>
  <span>•</span>
  <span>@lgf.fernandes</span>
</div>