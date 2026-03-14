import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { tikzPlugin } from '../../shared/vite-plugin-tikz'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Serve shared/public/ so /logos/... paths in components resolve correctly
  publicDir: path.resolve(__dirname, '../../shared/public'),
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
    },
  },
  server: { fs: { strict: false } },
  optimizeDeps: { exclude: ['oniguruma-parser'] },
  assetsInclude: ['**/*.wasm', '**/*.dump.gz'],
  plugins: [tikzPlugin()],
})
