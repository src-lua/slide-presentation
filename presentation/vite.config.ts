import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { handleTikzRequest } from './server/tikz-api'

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
    },
    middlewareMode: false
  },
  optimizeDeps: {
    exclude: ['tikzjax', 'node-tikzjax']
  },
  assetsInclude: ['**/*.wasm', '**/*.dump.gz'],
  plugins: [
    {
      name: 'tikz-api',
      configureServer(server) {
        server.middlewares.use('/api/tikz', handleTikzRequest as any)
      }
    }
  ]
})
