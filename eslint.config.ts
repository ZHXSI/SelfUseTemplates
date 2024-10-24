// 导入 ESLint 类型
import type { Linter } from 'eslint'
// 导入全局变量配置
import globals from 'globals'
// 导入 JavaScript 插件
import jsPlugin from '@eslint/js'
// 导入 TypeScript ESLint 插件
import tsPlugin from 'typescript-eslint'
// 导入 Vue 插件
import vuePlugin from 'eslint-plugin-vue'
// 导入自动导入配置
import autoImportConfig from './typings/.eslintrc-auto-import.js'
// 导入 Vue TypeScript ESLint 配置
import vueTsConfig from '@vue/eslint-config-typescript'
// 导入跳过格式化配置
import skipFormattingConfig from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 使用 JavaScript 插件的推荐配置
  jsPlugin.configs.recommended,
  // 使用 TypeScript ESLint 的推荐配置
  ...tsPlugin.configs.recommended,
  // 使用 Vue 插件的基本配置
  ...vuePlugin.configs['flat/essential'],
  // 使用 Vue TypeScript ESLint 配置
  ...vueTsConfig(),
  // 跳过格式化配置
  skipFormattingConfig,
  {
    // 定义需要 lint 的文件，限定在 src 目录下
    files: ['**/src/**/*.{js,mjs,cjs,ts,vue}'],
    // 设置语言选项，包括全局变量
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...autoImportConfig.globals,
      },
    },
  },
  {
    // 定义需要忽略的文件
    ignores: ['**/typings/**', '*.*', '**/dist/**', '**/node_modules/**'],
  },
  {
    // 自定义规则
    rules: {
      // 关闭 Vue 多单词组件名称规则
      'vue/multi-word-component-names': 'off',
    },
  },
] satisfies Linter.Config[]
