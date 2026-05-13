import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks.
        // On repeat visits the browser skips re-downloading these
        // because the filenames (with content hashes) won't change.
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-sanity': ['@sanity/client', '@sanity/image-url'],
        },
      },
    },
  },
})
