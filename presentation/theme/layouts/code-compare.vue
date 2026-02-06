<template>
  <div class="code-compare-layout">
    <h1 v-if="$slidev.nav.currentSlideRoute.meta.slide.frontmatter.title">
      {{ $slidev.nav.currentSlideRoute.meta.slide.frontmatter.title }}
    </h1>

    <div class="code-grid">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-compare-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.code-compare-layout h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.code-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  flex: 1;
  align-items: start;
}

.code-grid :deep(pre) {
  margin: 0;
  height: 100%;
  font-size: 0.8rem;
  line-height: 1.5;
}
</style>
