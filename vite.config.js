import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from "rollup-plugin-visualizer";
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue(),Inspect(),visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: "test.html", //分析图生成的文件名
    open:true //如果存在本地服务端口，将在打包后自动展示
  })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        feedback: resolve(__dirname, 'feedback/index.html'),
        newFeedback: resolve(__dirname, 'feedback/new/index.html'),
        dataFeedback: resolve(__dirname, 'feedback/data/index.html'),
        login: resolve(__dirname, 'login/index.html'),
        signup: resolve(__dirname, 'signup/index.html'),
        resetPassworld: resolve(__dirname, 'login/reset/index.html'),
        user: resolve(__dirname, 'user/index.html'),
        changepassowrd: resolve(__dirname, 'user/changepassword/index.html'),
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    minify: "terser",
    // target: "es2015"
  },
})