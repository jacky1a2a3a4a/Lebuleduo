import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
html {
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
  max-width: 100%;
}

/* 全局 */
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */ 
  transition: background-color 0.3s, border 0.3s;
}

/* 全局 */
html,body {
  font-family: 'Noto Sans TC',"Poppins", "Noto Sans", sans-serif;
  color: var(--color-gray-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 16px;
  font-weight: var(--font-weight-normal);
}

/* 連接 */
a {
  color: inherit;
  text-decoration: none;
}

/* 列表 */
ol, ul, li {
  list-style: none;
}

/* 表格 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* 段落 */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

/* 圖片 */
img {
  max-width: 100%;
  height: auto;
  display: block;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* 輸入框 */
input,
button,
textarea,
select {
  color: inherit;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.2;
  margin: 0;
}

/* 按鈕 */
button {
  border: none;
  background: none;
  cursor: pointer;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

/* 聚焦 */  
input:focus,
textarea:focus,
select:focus {
  appearance: none;
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

button:focus {
  outline: none;
}

/* 禁用 */
*:disabled {
  cursor: not-allowed;
}

/* 禁用 */
select:disabled,
input:disabled {
  background-color: var(--color-gray-200);
  color: var(--color-gray-500);
}

/* 滾動條 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-gray-100);
}

::-webkit-scrollbar-thumb {
  background: var(--color-gray-300);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-400);
}
`;

export default GlobalStyles;