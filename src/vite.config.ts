import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Force all three imports to resolve to the same instance
      'three': path.resolve(__dirname, './node_modules/three'),
      // Alias our lib to ensure consistency
      '@lib': path.resolve(__dirname, './lib'),
      '@components': path.resolve(__dirname, './components'),
      '@store': path.resolve(__dirname, './store')
    },
    // Deduplicate three.js to prevent multiple instances
    dedupe: ['three', '@react-three/fiber', '@react-three/drei']
  },
  optimizeDeps: {
    // Pre-bundle and force single instance
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
      'zustand'
    ],
    esbuildOptions: {
      target: 'esnext'
    },
    // Force re-optimization on startup to clear stale cache
    force: false
  },
  server: {
    port: 3000,
    open: true,
    // Increase hmr timeout
    hmr: {
      overlay: true
    }
  },
  build: {
    target: 'esnext',
    // Improve tree-shaking
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // Group three.js and its ecosystem together
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom'],
          'utils': ['gsap', 'zustand']
        }
      }
    }
  }
});