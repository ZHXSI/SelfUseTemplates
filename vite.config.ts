import { defineConfig, loadEnv } from 'vite' // Vite 配置
import vue from '@vitejs/plugin-vue' // Vue 插件
import vueJsx from '@vitejs/plugin-vue-jsx' // Vue JSX 插件
import { fileURLToPath, URL } from 'node:url' // Node.js URL 模块
import viteEslint from 'vite-plugin-eslint' // ESLint 插件
import AutoImport from 'unplugin-auto-import/vite' // 自动导入插件
import Components from 'unplugin-vue-components/vite' // 组件自动导入插件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // Element Plus 解析器
import legacy from '@vitejs/plugin-legacy' // 旧版浏览器支持插件
import viteCompression from 'vite-plugin-compression' // 压缩插件
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const { VITE_APP_HOST, VITE_APP_PORT } = loadEnv(
    mode,
    fileURLToPath(new URL('./src/env', import.meta.url)),
  )

  return {
    plugins: [
      vue(), // Vue 插件
      vueJsx(), // Vue JSX 插件
      AutoImport({
        dts: 'typings/auto-imports.d.ts', // 自动导入类型声明文件
        resolvers: [ElementPlusResolver()], // 解析器
        eslintrc: {
          enabled: true, // 启用 ESLint 配置
          filepath: './typings/.eslintrc-auto-import.js', // ESLint 配置文件路径
        },
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'], // 自动导入的模块
        dirs: ['src/stores/modules/**'], // 自动导入的目录
      }),
      Components({
        dts: 'typings/components.d.ts', // 组件类型声明文件
        dirs: ['src/components'], // 组件目录
        resolvers: [ElementPlusResolver()], // 解析器
      }),
      legacy({
        targets: ['defaults', 'not IE 11'], // 旧版浏览器支持
      }),
      viteCompression({
        deleteOriginFile: true, // 删除原始文件
      }),
      viteEslint({}), // ESLint 插件
    ],
    server: {
      host: VITE_APP_HOST, // 服务器主机
      port: Number(VITE_APP_PORT), // 服务器端口
      cors: true, // 启用 CORS
      open: false, // 自动打开浏览器
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[hash].js', // 分块文件名
          entryFileNames: 'static/js/[hash].js', // 入口文件名
          assetFileNames: assetInfo => {
            // 资源文件名
            const fileTypes = {
              'favicon.ico': '[name].[ext]',
              'favicon.png': '[name].[ext]',
              'favicon.svg': '[name].[ext]',
              '\\.(woff2?|eot|ttf|otf)(\\?.*)?$': 'static/fonts/[hash].[ext]',
              '\\.(png|jpe?g|gif|svg)(\\?.*)?$': 'static/images/[hash].[ext]',
              '\\.css$': 'static/css/[hash].[ext]',
              '\\.(mp4|webm|ogg|mp3|wav|flac|aac)(\\?.*)?$':
                'static/videos/[hash].[ext]',
            }

            for (const fileType in fileTypes) {
              if (assetInfo.name && new RegExp(fileType).test(assetInfo.name)) {
                return fileTypes[fileType]
              }
            }

            // 默认返回值
            return 'static/[name]-[hash].[ext]'
          },
          manualChunks(id) {
            // 手动分块
            if (id.includes('node_modules')) {
              const moduleName = id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()

              const usedModules = [
                '@floating-ui',
                'async-validator',
                'lodash-unified',
                'memoize-one',
                'normalize-wheel-es',
                'vue',
              ]
              if (!usedModules.includes(moduleName)) {
                return moduleName
              }
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true, // 删除 console
          drop_debugger: true, // 删除 debugger
        },
      },
      sourcemap: false, // 禁用 sourcemap
      assetsInlineLimit: 1024 * 10, // 资源内联限制
    },

    envDir: fileURLToPath(new URL('./src/env', import.meta.url)), // 环境变量目录
    publicDir: 'static', // 公共目录
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // 路径别名
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ``, // 全局scss
          api: 'modern-compiler', // 或 'modern'
        },
      },
    },
  }
})
