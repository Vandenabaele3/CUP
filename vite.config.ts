import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const API_BASE = env.VITE_API_BASE_URL || ''
  const API_PREFIX = env.VITE_API_PREFIX || '/api'

  return {
    plugins: [react()],
      server: {
        port: 5173,
        strictPort: true,
        proxy: {
          '/api': {
            target: 'http://192.168.0.215:3001',
            changeOrigin: true,
            secure: false,
          },
        },
      },

    build: {
      sourcemap: true,
    },
  }
})
