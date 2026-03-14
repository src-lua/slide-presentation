<template>
  <div class="logo-bar" :class="[variant, position, align]">
    <div v-if="align !== 'right'" class="logos-left">
      <!-- CIn + UFPE -->
      <img
        :src="`/logos/cin-ufpe-${variant}.png`"
        alt="CIn UFPE"
        class="logo-institucional"
      >
    </div>

    <div class="logos-right">
      <!-- CIn + UFPE (quando align=right) -->
      <img
        v-if="align === 'right'"
        :src="`/logos/cin-ufpe-${variant}.png`"
        alt="CIn UFPE"
        class="logo-institucional"
      >
      <!-- Maratona -->
      <img
        :src="`/logos/maratonacin-${variant}.png`"
        alt="Maratona"
        class="logo-maratona"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// Barra com logos institucionais (pode ficar no topo ou rodapé)
// Uso: <LogoBar /> - rodapé com logos pretos (padrão)
// Uso: <LogoBar position="header" /> - topo
// Uso: <LogoBar variant="white" /> - logos brancos (para fundos escuros)
// Uso: <LogoBar variant="black" /> - logos pretos (para fundos claros)
// Uso: <LogoBar variant="pb" /> - logos preto e branco
// Uso: <LogoBar align="right" /> - todas as logos à direita

interface Props {
  variant?: 'white' | 'black' | 'pb'
  position?: 'footer' | 'header'
  align?: 'default' | 'right'
}

withDefaults(defineProps<Props>(), {
  variant: 'black',
  position: 'footer',
  align: 'default'
})
</script>

<style scoped>
.logo-bar {
  position: fixed;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

/* Posicionamento: Footer (padrão) */
.logo-bar.footer {
  bottom: 1rem;
  align-items: flex-end;
}

/* Posicionamento: Header */
.logo-bar.header {
  top: 1rem;
  align-items: flex-start;
}

.logos-left,
.logos-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-institucional {
  position: relative;
  top: -0.4rem;
  height: 3.5rem;
  width: auto;
  object-fit: contain;
}

.logo-maratona {
  height: 2.5rem;
  width: auto;
  object-fit: contain;
}

/* Alinhamento à direita */
.logo-bar.right {
  justify-content: flex-end;
}

/* Mantém ajuste de posição para logo da Maratona quando à direita */
.logo-bar.right .logo-maratona {
  position: relative;
  top: -0.5rem;
}

/* Variants - as imagens já vêm nas cores corretas */

/* Responsivo */
@media (max-width: 768px) {
  .logo-bar {
    left: 0.5rem;
    right: 0.5rem;
  }

  .logo-bar.footer {
    bottom: 0.5rem;
  }

  .logo-bar.header {
    top: 0.5rem;
  }

  .logo-institucional {
    height: 2rem;
  }

  .logo-maratona {
    height: 1.5rem;
  }
}
</style>
