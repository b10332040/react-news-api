import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      contexts: '/src/contexts',
      components: '/src/components',
      data: '/src/data',
      hooks: '/src/hooks',
      images: '/src/assets/images',
      layouts: '/src/layouts',
      pages: '/src/pages',
      styles: '/src/styles',
      utils: '/src/utils',
    }
  }
})
