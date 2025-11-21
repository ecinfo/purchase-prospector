import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    open: true,
    // Wildcard for any ngrok host
    allowedHosts: ['.ngrok-free.app'],
  },

  build: {
    outDir: 'dist',
    sourcemap: true,

    // ⚡ Code splitting to reduce bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],          // If using Recharts charts
          ui: ['lucide-react'],          // Icons
          vendor: ['axios'],             // API libs
        },
      },
    },

    // Optional: suppress warning OR increase limit
    chunkSizeWarningLimit: 1000,
  },
})
