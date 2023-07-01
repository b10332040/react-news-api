import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/api': '/src/api',
      '/assets': '/src/assets',
      '/components': '/src/components',
      '/contexts': '/src/contexts',
      '/data': '/src/data',
      '/hooks': '/src/hooks',
      '/layouts': '/src/layouts',
      '/pages': '/src/pages',
      '/styles': '/src/styles',
      '/utils': '/src/utils'
    }
  }
})
