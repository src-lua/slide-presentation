<template>
  <div class="annotation-box" :class="{ small: size === 'small' }">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Annotation Box component - Caixa vermelha para anotações
// Uso: <AnnotationBox>Seu texto aqui</AnnotationBox>
// Uso: <AnnotationBox size="small">Texto pequeno</AnnotationBox>

interface Props {
  size?: 'normal' | 'small'
}

withDefaults(defineProps<Props>(), {
  size: 'normal'
})
</script>

<style scoped>
.annotation-box {
  background: #DB1E2F;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(219, 30, 47, 0.3);
  font-weight: 400;
}

.annotation-box.small {
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  display: inline-block;
  margin: 0.5rem;
}

.annotation-box :deep(code) {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'JetBrains Mono', monospace;
}

.annotation-box :deep(strong) {
  font-weight: 700;
}

.dark .annotation-box {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
</style>
