import path from 'path';
import process from 'process';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from "rollup-plugin-visualizer";
import sitemapPlugin from 'vite-plugin-sitemap';

import ViteCustom404PagePlugin from './plugins/ViteCustom404PagePlugin';
import { dfsSearch } from "./assist/findFiles"


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
  },base:"/new-index/",
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
      outDir:"builded/dist"
    }
    ), ViteCustom404PagePlugin()],
  build: {
    outDir:"builded/dist",
    rollupOptions: {
      input: dfsSearch(path.resolve("./"), str => str.endsWith(".html") || str.endsWith(".htm")),
      output: {
        manualChunks: {
          markdown: ["showdown", "showdown-katex", "xss", "katex", "highlight.js"],
          connections: [path.resolve(__dirname, "./src/common/script/connection.js")],
          normal: [path.resolve(__dirname,"./src/common/script/normal.js")],
          infomations : [path.resolve(__dirname,"./src/common/script/infomations.js")],
          initEnv:[
            path.resolve(__dirname, "./src/common/script/all.js"),
            path.resolve(__dirname, "./src/common/script/arraySort.js"),
            path.resolve(__dirname, "./src/common/script/arrayBufferJsonSport.js"),
            path.resolve(__dirname, "./src/common/script/storageEvent.js"),
            path.resolve(__dirname, "./src/common/script/stringPoint.js"),
            path.resolve(__dirname, "./src/common/script/browerInfo.js"),
            path.resolve(__dirname, "./src/common/script/copy.js"),
            "buffer","process"
          ]
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
  }
})