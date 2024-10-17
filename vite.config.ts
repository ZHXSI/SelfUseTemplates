import { defineConfig, loadEnv } from "vite"; // vite
import vue from "@vitejs/plugin-vue"; // vue
import { fileURLToPath, URL } from "node:url"; // nodejs
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'// 组件自动导入
import Components from 'unplugin-vue-components/vite'// 组件自动导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'// element-plus
export default defineConfig(({ mode }) => {
  const { VITE_APP_HOST, VITE_APP_PORT } = loadEnv(
    mode,
    fileURLToPath(new URL("./src/env", import.meta.url)),
  );
  return {
    plugins: [
      vue(),
      AutoImport({
        dts: "typings/auto-imports.d.ts",
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: "./typings/.eslintrc-auto-import.js",
        },
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "vue-i18n",
          "@vueuse/core",
        ],
        dirs: ["src/stores/modules/**"]
      }),
      Components({
        dts: "typings/components.d.ts",
        dirs: ["src/components"],
        resolvers: [
          ElementPlusResolver(),
        ],
      }),
      eslint()
    ],
    server: {
      host: VITE_APP_HOST,
      port: Number(VITE_APP_PORT),
      cors: true,
      open: true,
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[hash].js",
          entryFileNames: "static/js/[hash].js",
          assetFileNames: (assetInfo) => {
            const fileTypes = {
              "favicon.ico": "[name].[ext]",
              "favicon.png": "[name].[ext]",
              "favicon.svg": "[name].[ext]",
              "\\.(woff2?|eot|ttf|otf)(\\?.*)?$":
                "static/fonts/[hash].[ext]",
              "\\.(png|jpe?g|gif|svg)(\\?.*)?$":
                "static/images/[hash].[ext]",
              "\\.css$": "static/css/[hash].[ext]",
              "\\.(mp4|webm|ogg|mp3|wav|flac|aac)(\\?.*)?$":
                "static/videos/[hash].[ext]",
            };

            for (const fileType in fileTypes) {
              if (assetInfo.name && new RegExp(fileType).test(assetInfo.name)) {
                return fileTypes[fileType];
              }
            }

            // Default return value
            return "static/[name]-[hash].[ext]";
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const moduleName = id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();

              const usedModules = ["vue"];
              if (usedModules.includes(moduleName)) {
                return moduleName;
              }
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false,
      assetsInlineLimit: 1024 * 10,
    },
    envDir: fileURLToPath(new URL("./src/env", import.meta.url)),
    publicDir: false,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: ``, // 全局scss
          api: 'modern-compiler', // or 'modern'
        },
      },
    },
  };
});
