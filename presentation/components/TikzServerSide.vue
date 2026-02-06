<script setup lang="ts">
/**
 * Componente TikZ com compilação server-side usando node-tikzjax
 * Mais confiável que a abordagem client-side
 */
import { ref, onMounted } from 'vue'

const props = defineProps<{
  scale?: number | string
  libraries?: string  // Ex: "arrows.meta,calc,positioning"
  delay?: number  // Delay em ms antes de compilar (para evitar sobrecarga)
}>()

const svgContent = ref('')
const loading = ref(true)
const errorMsg = ref('')
const source = ref<HTMLElement | null>(null)

onMounted(async () => {
  // Aguarda o delay se especificado (para evitar compilações simultâneas)
  if (props.delay) {
    await new Promise(resolve => setTimeout(resolve, props.delay))
  }

  if (!source.value) {
    errorMsg.value = 'Slot vazio'
    loading.value = false
    return
  }

  // Pega o código do slot, removendo espaços extras mas preservando o conteúdo
  let rawCode = (source.value.textContent || source.value.innerText || '').trim()

  // Remove espaços extras entre linhas, mas mantém a estrutura
  rawCode = rawCode.replace(/\s+\n/g, '\n').replace(/\n\s+/g, '\n')

  console.log('[TikzServerSide] Código capturado:', rawCode.substring(0, 100) + '...')

  if (!rawCode) {
    errorMsg.value = 'Código TikZ vazio'
    loading.value = false
    return
  }

  try {
    const payload = {
      code: rawCode,
      libraries: props.libraries?.split(',').map(l => l.trim()) || []
    }

    console.log('[TikzServerSide] Enviando para API:', JSON.stringify(payload).substring(0, 200))

    // Chama API server-side para compilar
    const response = await fetch('/api/tikz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error)
    }

    svgContent.value = data.svg
    loading.value = false
  } catch (err: any) {
    console.error('Erro ao compilar TikZ:', err)
    errorMsg.value = err.message
    loading.value = false
  }
})
</script>

<template>
  <div class="tikz-wrapper my-6 flex flex-col items-center">
    <div ref="source" style="display: none;"><slot /></div>

    <div class="relative w-full flex justify-center min-h-[50px]">
      <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 rounded z-10 p-4">
        <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="mt-2 text-[10px] font-mono text-blue-500 uppercase tracking-widest">Compilando TeX...</span>
      </div>

      <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 border border-red-100 rounded text-xs font-mono whitespace-pre-wrap">
        🛑 {{ errorMsg }}
      </div>

      <div
        v-if="!loading && !errorMsg && svgContent"
        class="tikz-output-container"
        :style="{ transform: `scale(${scale || 1})`, transformOrigin: 'top center' }"
        v-html="svgContent"
      ></div>
    </div>
  </div>
</template>

<style>
.tikz-output-container svg {
  width: auto !important;
  height: auto !important;
  max-width: 100% !important;
  display: block;
  overflow: visible !important;
}

.tikz-output-container {
  font-family: 'Computer Modern', serif;
}
</style>
