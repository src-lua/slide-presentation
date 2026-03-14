<template>
  <div class="copyright-info">
    <!-- Versão e CC BY -->
    <div class="version-text" v-if="version">{{ version }}</div>
    <img src="/images/image1.png" alt="CC BY-NC-SA" class="cc-icon">
  </div>
</template>

<script setup lang="ts">
// Componente de copyright e versão
// Uso: <Copyright version="rev. 1.0" />

interface Props {
  version?: string
}

withDefaults(defineProps<Props>(), {
  version: ''
})
</script>

<style scoped>
.copyright-info {
  position: fixed;
  bottom: 1rem;
  left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.05rem;
  pointer-events: none;
  z-index: 5;
}

.cc-icon {
  height: 2.5rem;
  width: auto;
  opacity: 0.8;
}

.version-text {
  font-size: 0.875rem;
  opacity: 0.7;
  font-weight: 500;
}

/* Responsivo */
@media (max-width: 768px) {
  .copyright-info {
    bottom: 0.5rem;
    left: 0.5rem;
  }

  .cc-icon {
    height: 2rem;
  }

  .version-text {
    font-size: 0.75rem;
  }
}
</style>
