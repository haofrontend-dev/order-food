import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
declare const __dirname: string;
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  }
})
