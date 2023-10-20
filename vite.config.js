import path from 'path';
import process from 'process';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from "rollup-plugin-visualizer";
import sitemapPlugin from 'vite-plugin-sitemap';

import ViteCustom404PagePlugin from './plugins/ViteCustom404PagePlugin';
import findHtmls from "./assist/findHtml"


/** @type {import('vite').UserConfig} */
export default defineConfig({
  resolve:{
    alias:{
      "particles.js":"modifiedPackage/particles.js/particles.js",
      "process":"modifiedPackage/node-process/browser.js",
    }
  },
  server: {
    port: 81,
    host: "0.0.0.0"
  },
  appType:"mpa",
  plugins: [vue(), Inspect(), visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: "./temp/test.html", //分析图生成的文件名
    open: true //如果存在本地服务端口，将在打包后自动展示
  }), sitemapPlugin(
    {
      hostname: 'http://kuankuan2007.gitee.io/',
      changefreq: 'weekly',
    }
    ), ViteCustom404PagePlugin()],
  build: {
    rollupOptions: {
      input: findHtmls(),
      output: {
        manualChunks: {
          markdown: ["showdown", "showdown-katex", "xss", "katex", "highlight.js"],
        }, entryFileNames: function (chunkInfo) {
          let pathName = (path.dirname(chunkInfo.facadeModuleId).slice((__dirname.replace(/\\/g, "/")).length) + "/script/[name]-[hash].js").slice(1);
          return pathName
        },
        chunkFileNames: function (chunkInfo) { 
          return "script/[name]-[hash].js" 
        },
        assetFileNames: function (chunkInfo) {
          if (chunkInfo.source === '/* vite internal call, ignore */'){
            return chunkInfo.name
          }
          const extToDir={
            'script':['.js'],
            'style':['.css'],
            'font':['.ttf','.woff','.woff2','.eot','.otf'],
            'image':['.png','.jpg','.svg','.gif'],
          }

          for (const i in extToDir){
            if (extToDir[i].some(ext=>chunkInfo.name.endsWith(ext))){
              return `${i}/[name]-[hash].[ext]`
            }
          }
          return "assets/[name]-[hash].[ext]"
        }
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