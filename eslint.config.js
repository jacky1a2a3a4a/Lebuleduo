//TS JS 檢查工具
// 這些是用於檢查不同類型代碼的 ESLint 插件，如 JavaScript、TypeScript 和 React
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 忽略 dist 目錄中的文件，這通常是存放建構後的文件
  { ignores: ['dist'] },
  {
    //extends：使用推薦的 JavaScript 和 TypeScript 規則
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    //files：只檢查 .ts 和 .tsx 文件（TypeScript 和 TypeScript React 文件）。
    files: ['**/*.{ts,tsx}'],
    //languageOptions：設定 ECMAScript 版本和全域變數。
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    //plugins：啟用 React 和 React Refresh 的鉤子。
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
