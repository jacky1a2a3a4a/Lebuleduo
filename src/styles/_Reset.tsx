// 參考用重置樣式表
import { createGlobalStyle } from 'styled-components';

// 全局样式重置
const GlobalStyle = createGlobalStyle`
  /* 基础重置 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  /* 文档重置 */
  html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* 表单元素重置 */
  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  
  /* 列表重置 */
  ol, ul {
    list-style: none;
  }
  
  /* 链接重置 */
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* 图片重置 */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* 表格重置 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  /* 移除表单元素默认外观 */
  input, textarea, select {
    appearance: none;
    outline: none;
  }
  
  /* 移除默认滚动条样式 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyle;
