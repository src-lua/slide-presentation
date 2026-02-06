<script setup>
import { ref, onMounted, useSlots } from 'vue'

const props = defineProps({
  scale: { default: 1.5 },
  clicks: { default: 0 }
})

const slots = useSlots()
const ready = ref(false)

onMounted(() => {
  setTimeout(() => { ready.value = true }, 500)
})

// Determinar o número máximo de clicks baseado nos slots disponíveis
const maxClicks = Object.keys(slots).reduce((max, slotName) => {
  const match = slotName.match(/^click-(\d+)$/)
  if (match) {
    return Math.max(max, parseInt(match[1]))
  }
  return max
}, 0)
</script>

<template>
  <div class="relative h-100 flex justify-center items-center">
    <!-- Base slot (click 0) -->
    <div
      v-if="$slots.base"
      class="absolute transition-opacity duration-500"
      :class="clicks === 0 ? 'opacity-100' : 'opacity-0'"
    >
      <slot name="base" />
    </div>

    <!-- Slots numerados (click-1, click-2, etc) -->
    <template v-for="i in maxClicks" :key="i">
      <div
        v-if="ready && $slots[`click-${i}`]"
        class="absolute transition-opacity duration-500"
        :class="clicks === i ? 'opacity-100' : 'opacity-0'"
      >
        <slot :name="`click-${i}`" />
      </div>
    </template>

    <!-- Fallback: highlight slot para compatibilidade -->
    <div
      v-if="ready && $slots.highlight && !$slots['click-1']"
      class="absolute transition-opacity duration-500"
      :class="clicks >= 1 ? 'opacity-100' : 'opacity-0'"
    >
      <slot name="highlight" />
    </div>
  </div>
</template>