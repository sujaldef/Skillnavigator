import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion', 'animejs'],
          ui: ['react-icons', 'react-markdown', 'rehype-raw'],
        },
      },
    },
    // Production optimizations
    minify: 'esbuild', // Use default esbuild minifier
    sourcemap: false, // Reduce build size
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500, // Set higher limit
  },

  // Development optimizations
  server: {
    headers: {
      'Cache-Control': 'public, max-age=3600', // Cache static files
    },
  },
});
