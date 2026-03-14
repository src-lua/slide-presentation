import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { tikzPlugin } from './vite-plugin-tikz'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '~/': path.resolve(__dirname, './')
    }
  },
  server: {
    fs: {
      strict: false
    }
  },
  // Pacotes WASM/pesados ficam fora da otimização do esbuild
  optimizeDeps: {
    exclude: ['tikzjax', 'node-tikzjax', 'oniguruma-parser']
  },
  assetsInclude: ['**/*.wasm', '**/*.dump.gz'],
  plugins: [
    tikzPlugin()
  ]
})
