<template>
  <div class="annotation-box">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Annotation Box component for red callouts
// Usage in slides: <AnnotationBox>Your text here</AnnotationBox>
</script>

<style scoped>
.annotation-box {
  background: #DB1E2F;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: 400;
}

.dark .annotation-box {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>
