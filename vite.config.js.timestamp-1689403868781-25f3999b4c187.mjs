// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///E:/%E4%BD%9C%E5%93%81/%E7%BD%91%E7%AB%99/page-vite/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/%E4%BD%9C%E5%93%81/%E7%BD%91%E7%AB%99/page-vite/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Inspect from "file:///E:/%E4%BD%9C%E5%93%81/%E7%BD%91%E7%AB%99/page-vite/node_modules/vite-plugin-inspect/dist/index.mjs";
import { visualizer } from "file:///E:/%E4%BD%9C%E5%93%81/%E7%BD%91%E7%AB%99/page-vite/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "E:\\\u4F5C\u54C1\\\u7F51\u7AD9\\page-vite";
var vite_config_default = defineConfig({
  plugins: [vue(), Inspect(), visualizer({
    gzipSize: true,
    brotliSize: true,
    emitFile: false,
    filename: "test.html",
    //分析图生成的文件名
    open: true
    //如果存在本地服务端口，将在打包后自动展示
  })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        feedback: resolve(__vite_injected_original_dirname, "feedback/index.html"),
        newFeedback: resolve(__vite_injected_original_dirname, "feedback/new/index.html"),
        dataFeedback: resolve(__vite_injected_original_dirname, "feedback/data/index.html"),
        login: resolve(__vite_injected_original_dirname, "login/index.html"),
        signup: resolve(__vite_injected_original_dirname, "signup/index.html"),
        resetPassworld: resolve(__vite_injected_original_dirname, "login/reset/index.html"),
        user: resolve(__vite_injected_original_dirname, "user/index.html"),
        changepassowrd: resolve(__vite_injected_original_dirname, "user/changepassword/index.html"),
        changeemail: resolve(__vite_injected_original_dirname, "user/changeemail/index.html"),
        blogs: resolve(__vite_injected_original_dirname, "blogs/index.html"),
        docs: resolve(__vite_injected_original_dirname, "docs/index.html"),
        docsPage: resolve(__vite_injected_original_dirname, "docs/docsPage/index.html"),
        chat: resolve(__vite_injected_original_dirname, "chat/index.html")
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    minify: "terser",
    target: "es2015"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxcdTRGNUNcdTU0QzFcXFxcXHU3RjUxXHU3QUQ5XFxcXHBhZ2Utdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcXHU0RjVDXHU1NEMxXFxcXFx1N0Y1MVx1N0FEOVxcXFxwYWdlLXZpdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6LyVFNCVCRCU5QyVFNSU5MyU4MS8lRTclQkQlOTElRTclQUIlOTkvcGFnZS12aXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuLyoqIEB0eXBlIHtpbXBvcnQoJ3ZpdGUnKS5Vc2VyQ29uZmlnfSAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLEluc3BlY3QoKSx2aXN1YWxpemVyKHtcbiAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICBicm90bGlTaXplOiB0cnVlLFxuICAgIGVtaXRGaWxlOiBmYWxzZSxcbiAgICBmaWxlbmFtZTogXCJ0ZXN0Lmh0bWxcIiwgLy9cdTUyMDZcdTY3OTBcdTU2RkVcdTc1MUZcdTYyMTBcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcbiAgICBvcGVuOnRydWUgLy9cdTU5ODJcdTY3OUNcdTVCNThcdTU3MjhcdTY3MkNcdTU3MzBcdTY3MERcdTUyQTFcdTdBRUZcdTUzRTNcdUZGMENcdTVDMDZcdTU3MjhcdTYyNTNcdTUzMDVcdTU0MEVcdTgxRUFcdTUyQThcdTVDNTVcdTc5M0FcbiAgfSldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBmZWVkYmFjazogcmVzb2x2ZShfX2Rpcm5hbWUsICdmZWVkYmFjay9pbmRleC5odG1sJyksXG4gICAgICAgIG5ld0ZlZWRiYWNrOiByZXNvbHZlKF9fZGlybmFtZSwgJ2ZlZWRiYWNrL25ldy9pbmRleC5odG1sJyksXG4gICAgICAgIGRhdGFGZWVkYmFjazogcmVzb2x2ZShfX2Rpcm5hbWUsICdmZWVkYmFjay9kYXRhL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgbG9naW46IHJlc29sdmUoX19kaXJuYW1lLCAnbG9naW4vaW5kZXguaHRtbCcpLFxuICAgICAgICBzaWdudXA6IHJlc29sdmUoX19kaXJuYW1lLCAnc2lnbnVwL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgcmVzZXRQYXNzd29ybGQ6IHJlc29sdmUoX19kaXJuYW1lLCAnbG9naW4vcmVzZXQvaW5kZXguaHRtbCcpLFxuICAgICAgICB1c2VyOiByZXNvbHZlKF9fZGlybmFtZSwgJ3VzZXIvaW5kZXguaHRtbCcpLFxuICAgICAgICBjaGFuZ2VwYXNzb3dyZDogcmVzb2x2ZShfX2Rpcm5hbWUsICd1c2VyL2NoYW5nZXBhc3N3b3JkL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgY2hhbmdlZW1haWw6IHJlc29sdmUoX19kaXJuYW1lLCAndXNlci9jaGFuZ2VlbWFpbC9pbmRleC5odG1sJyksXG4gICAgICAgIGJsb2dzOiByZXNvbHZlKF9fZGlybmFtZSwgJ2Jsb2dzL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgZG9jczogcmVzb2x2ZShfX2Rpcm5hbWUsICdkb2NzL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgZG9jc1BhZ2U6IHJlc29sdmUoX19kaXJuYW1lLCAnZG9jcy9kb2NzUGFnZS9pbmRleC5odG1sJyksXG4gICAgICAgIGNoYXQ6IHJlc29sdmUoX19kaXJuYW1lLCAnY2hhdC9pbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcbiAgICB0YXJnZXQ6IFwiZXMyMDE1XCJcbiAgfSxcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUixTQUFTLGVBQWU7QUFDeFMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGtCQUFrQjtBQUozQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFFLFFBQVEsR0FBRSxXQUFXO0FBQUEsSUFDbkMsVUFBVTtBQUFBLElBQ1YsWUFBWTtBQUFBLElBQ1osVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBO0FBQUEsSUFDVixNQUFLO0FBQUE7QUFBQSxFQUNQLENBQUMsQ0FBQztBQUFBLEVBQ0YsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUNyQyxVQUFVLFFBQVEsa0NBQVcscUJBQXFCO0FBQUEsUUFDbEQsYUFBYSxRQUFRLGtDQUFXLHlCQUF5QjtBQUFBLFFBQ3pELGNBQWMsUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxRQUMzRCxPQUFPLFFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsUUFDNUMsUUFBUSxRQUFRLGtDQUFXLG1CQUFtQjtBQUFBLFFBQzlDLGdCQUFnQixRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLFFBQzNELE1BQU0sUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxRQUMxQyxnQkFBZ0IsUUFBUSxrQ0FBVyxnQ0FBZ0M7QUFBQSxRQUNuRSxhQUFhLFFBQVEsa0NBQVcsNkJBQTZCO0FBQUEsUUFDN0QsT0FBTyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQzVDLE1BQU0sUUFBUSxrQ0FBVyxpQkFBaUI7QUFBQSxRQUMxQyxVQUFVLFFBQVEsa0NBQVcsMEJBQTBCO0FBQUEsUUFDdkQsTUFBTSxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
