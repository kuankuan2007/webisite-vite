import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        feedback: resolve(__dirname, 'feedback/index.html'),
        newFeedback: resolve(__dirname, 'feedback/new/index.html'),
        dataFeedback: resolve(__dirname, 'feedback/data/index.html'),
        login: resolve(__dirname, 'login/index.html'),
        signup: resolve(__dirname, 'signup/index.html'),
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    minify: "terser"
  },
})