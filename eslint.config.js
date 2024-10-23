// 导入全局变量配置
import globals from 'globals'
// 导入 JavaScript 插件
import pluginJs from '@eslint/js'
// 导入 TypeScript ESLint 插件
import tseslint from 'typescript-eslint'
// 导入 Vue 插件
import pluginVue from 'eslint-plugin-vue'
// 导入自动导入配置
import autoImport from './typings/.eslintrc-auto-import.js'
// 导入 Vue TypeScript ESLint 配置
import vueTsEslintConfig from '@vue/eslint-config-typescript'
// 导入跳过格式化配置
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 使用 JavaScript 插件的推荐配置
  pluginJs.configs.recommended,
  // 使用 TypeScript ESLint 的推荐配置
  ...tseslint.configs.recommended,
  // 使用 Vue 插件的基本配置
  ...pluginVue.configs['flat/essential'],
  // 使用 Vue TypeScript ESLint 配置
  ...vueTsEslintConfig(),
  // 跳过格式化配置
  skipFormatting,
  {
    // 定义需要 lint 的文件，限定在 src 目录下
    files: ['**/src/**/*.{js,mjs,cjs,ts,vue}'],
    // 设置语言选项，包括全局变量
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...autoImport.globals },
    },
  },
  {
    // 定义需要忽略的文件
    ignores: ['**/typings/**', '*.*'],
  },
  {
    // 自定义规则
    rules: {
      // 关闭 Vue 多单词组件名称规则
      'vue/multi-word-component-names': 'off',
    },
  },
]
// satisfies Linter.Config[]