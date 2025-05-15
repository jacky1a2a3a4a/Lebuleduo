// 引入 ESLint 核心功能
import js from '@eslint/js'
// 引入全域變數定義
import globals from 'globals'
// 引入 React Hooks 的規則檢查插件
import reactHooks from 'eslint-plugin-react-hooks'
// 引入 React 熱重載相關規則插件
import reactRefresh from 'eslint-plugin-react-refresh'
// 引入 TypeScript ESLint 相關功能
import tseslint from 'typescript-eslint'
// 引入 Airbnb 的 JavaScript 風格指南
import airbnb from 'eslint-config-airbnb'
// 引入 Airbnb 的 TypeScript 風格指南
import airbnbTypescript from 'eslint-config-airbnb-typescript'
// 引入 Prettier 整合配置
import prettier from 'eslint-config-prettier'

export default tseslint.config(
  // 忽略 dist 目錄的檢查
  { ignores: ['dist'] },
  {
    // 繼承多個配置
    extends: [
      js.configs.recommended, // ESLint 推薦配置
      ...tseslint.configs.recommended, // TypeScript ESLint 推薦配置
      airbnb, // Airbnb JavaScript 風格指南
      airbnbTypescript, // Airbnb TypeScript 風格指南
      prettier, // Prettier 配置
    ],
    // 適用於所有 .ts 和 .tsx 檔案
    files: ['**/*.{ts,tsx}'],
    // 語言相關配置
    languageOptions: {
      ecmaVersion: 2020, // 使用 ECMAScript 2020 版本
      globals: {
        ...globals.browser, // 啟用瀏覽器全域變數
        ...globals.es2020, // 啟用 ES2020 全域變數
      },
      parserOptions: {
        project: './tsconfig.json', // TypeScript 配置文件路徑
      },
    },
    // 啟用的插件
    plugins: {
      'react-hooks': reactHooks, // React Hooks 規則
      'react-refresh': reactRefresh, // React 熱重載規則
    },
    // 自定義規則
    rules: {
      ...reactHooks.configs.recommended.rules, // 啟用 React Hooks 推薦規則
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // 允許常數導出
      ],
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }], // 限制 JSX 檔案擴展名為 .tsx
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never', // 忽略 .ts 擴展名
          tsx: 'never', // 忽略 .tsx 擴展名
        },
      ],
    },
  },
)