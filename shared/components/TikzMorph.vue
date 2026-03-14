<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{
  scale?: number | string
}>()

const { $clicks: clicks } = useSlideContext()
const slots = useSlots()

// Coleta e ordena os slots numéricos: #0, #1, #2, ...
const states = computed(() =>
  Object.keys(slots)
    .filter(k => /^\d+$/.test(k))
    .map(Number)
    .sort((a, b) => a - b)
)
</script>

<template>
  <div
    class="tikz-morph relative h-100 flex justify-center items-center"
    :style="scale ? { transform: `scale(${scale})`, transformOrigin: 'top center' } : {}"
  >
    <div
      v-for="n in states"
      :key="n"
      class="absolute w-full flex justify-center transition-opacity duration-500"
      :style="{
        opacity: clicks === n ? 1 : 0,
        pointerEvents: clicks === n ? 'auto' : 'none'
      }"
    >
      <slot :name="String(n)" />
    </div>
  </div>
</template>
