<template>
  <div class="diagram-layout">
    <h1 v-if="$slidev.nav.currentSlideRoute.meta.slide.frontmatter.title">
      {{ $slidev.nav.currentSlideRoute.meta.slide.frontmatter.title }}
    </h1>

    <div class="diagram-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.diagram-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.diagram-layout h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.diagram-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.diagram-content :deep(img) {
  max-width: 90%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
