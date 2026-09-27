import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  base: './', // важливо для коректних шляхів на GitHub Pages
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 9000,
    open: true,
  },
});