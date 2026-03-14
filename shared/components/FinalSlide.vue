<template>
  <div class="final-slide">
    <div class="final-text">
      That's <span class="all-wrapper">all<img src="/outros/maratona-baloes.png" class="balao-all" /></span>, Folks!
    </div>

    <img src="/outros/gatinho.gif" class="gatinho-corner">

    <LogoBar variant="pb" position="header" />
  </div>
</template>

<script setup lang="ts">
// Slide final com gatinho no cantinho e balão
</script>

<style scoped>
.final-slide {
  background: #3b3942 !important;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.final-text {
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  z-index: 2;
  font-family: 'JetBrains Mono', monospace;
}

.all-wrapper {
  position: relative;
  display: inline-block;
}

.gatinho-corner {
  position: absolute;
  bottom: 0;
  left: 2.5rem;
  height: 12rem;
  transform: scale(1.3) rotate(3deg);
  z-index: 1;
}

.balao-all {
  position: absolute;
  transform: scale(1.0);
  top: -4.8rem;
  right: 4.65rem;
}
</style>
