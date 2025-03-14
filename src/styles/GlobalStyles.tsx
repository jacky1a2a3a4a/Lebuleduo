import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Gray */
  --color-gray-0: #fff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  /* 陰影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  /* border-radius */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  --border-radius-round: 9999px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

   /* 字體大小 */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */

  /* 間距 */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
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
  font-family: "Poppins", "Noto Sans", sans-serif;
  color: var(--color-gray-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 16px;
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
  line-height: 1.15;
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
