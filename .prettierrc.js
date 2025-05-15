module.exports = {
  // 使用單引號而不是雙引號
  singleQuote: true,
  // 在 ES5 中有效的多行結構末尾添加逗號
  trailingComma: 'es5',
  // 設置縮進的空格數
  tabWidth: 2,
  // 在語句末尾添加分號
  semi: true,
  // 設置每行代碼的最大長度
  printWidth: 100,
  // 在對象字面量的括號內添加空格
  bracketSpacing: true,
  // 當箭頭函數只有一個參數時，省略括號
  arrowParens: 'avoid',
  // 總是對 markdown 文件進行換行處理
  proseWrap: 'always',
  // 根據 CSS display 屬性的默認值來處理 HTML 空白符
  htmlWhitespaceSensitivity: 'css',
  // 自動檢測並使用適合當前操作系統的行尾符號
  endOfLine: 'auto',
  // 自動格式化嵌入的代碼塊
  embeddedLanguageFormatting: 'auto',
  // 不強制要求每個 HTML/JSX 屬性單獨一行
  singleAttributePerLine: false,
  // 將多行 HTML/JSX 元素的結束標籤放在新行
  bracketSameLine: false,
  // 只在必要時為對象屬性添加引號
  quoteProps: 'as-needed',
  // 在 JSX 中使用雙引號
  jsxSingleQuote: false,
  // 在 JSX 中將結束標籤放在新行
  jsxBracketSameLine: false,
  // 不要求文件頂部有特殊註釋才進行格式化
  requirePragma: false,
  // 不在格式化後的文件頂部插入特殊註釋
  insertPragma: false,
  // 使用空格而不是 tab 進行縮進
  useTabs: false,
  // 不縮進 Vue 文件中的 script 和 style 標籤
  vueIndentScriptAndStyle: false,
  // 為特定文件類型設置特殊的格式化規則
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.vue'],
      options: {
        commentFormat: {
          style: 'space',
        },
      },
    },
  ],
}; 