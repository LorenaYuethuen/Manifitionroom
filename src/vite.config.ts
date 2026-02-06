import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force single instance of Three.js across all dependencies
    dedupe: ['three', '@react-three/fiber', '@react-three/drei']
  },
  optimizeDeps: {
    // Pre-bundle these packages and ensure they share dependencies
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap'
    ]
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'three-react': ['@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
});
