import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from "rollup-plugin-visualizer";
import sitemapPlugin from 'vite-plugin-sitemap';
import ViteCustom404PagePlugin from './plugins/ViteCustom404PagePlugin';
import findHtmls from "./assist/findHtml"
/** @type {import('vite').UserConfig} */
export default defineConfig({
  server:{
    port:81,
    host:"0.0.0.0"
  },base:"/vditor/",
  plugins: [vue(),Inspect(),visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: "./temp/test.html", //分析图生成的文件名
    open:true //如果存在本地服务端口，将在打包后自动展示
  }),sitemapPlugin(
    {
      hostname: 'http://kuankuan2007.gitee.io/',
      changefreq: 'weekly',
    }
    ), ViteCustom404PagePlugin()],
  build: {
    rollupOptions: {
      input: findHtmls(),
      output:{
        manualChunks:{
          markdown:["showdown","showdown-katex","xss","katex","highlight.js"],
        },dir:"dist/vditor"
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    minify: "terser",
    target: "es2015"
  },
})