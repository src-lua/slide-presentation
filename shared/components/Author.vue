<template>
  <div class="author-container">
    <!-- Autores -->
    <div class="authors">
      <div v-for="(author, index) in authors" :key="index" class="author">
        {{ author }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente de informações de autoria
// Uso: <Author :authors="['Nome 1 <user1>', 'Nome 2 <user2>']" />

interface Props {
  authors: string[]
}

defineProps<Props>()
</script>

<style scoped>
.author-container {
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  pointer-events: none;
  z-index: 5;
}

.authors {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  text-align: right;
}

.author {
  font-size: 1rem;
  opacity: 0.9;
}

/* Responsivo */
@media (max-width: 768px) {
  .author-container {
    bottom: 0.5rem;
    right: 0.5rem;
  }

  .author {
    font-size: 0.75rem;
  }
}
</style>
