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

  --color-green-line-0: #06c755;
   --color-green-line-100: #05b54c;

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
  --color-red-500: #dc2626;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  /* 垃不垃多配色 */
  --color-white: #FFFFFF;

  --color-background-primary: #FFFFFF;
  --color-background-secondary: #F8FAFF;

  --color-background-secondary-hover: #F0F4FF;

  --color-primary: #445DB3;
  --color-secondary: #A2AED9;
  --color-tertiary: #F7DD97;

  --color-primary-hover: #334D99;
  --color-secondary-hover: #8090B2;
  --color-tertiary-hover: #E6C26D;
  

  --color-text-primary: #1F2A52;
  --color-text-secondary: #323232;
  --color-text-tertiary: #7B7B7B;
  --color-text-disabled: #BDBDBD; 

  --color-neutral-600: #757575;
  --color-neutral-500: #9E9E9E;
  --color-neutral-400: #BDBDBD;
  --color-neutral-300: #E0E0E0;
  --color-neutral-200: #EEEEEE;

  --color-error: #D99292;
  --color-background-error: #FFF4EB;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

  /* 陰影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --btn-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  --btn-shadow-hover: 0 7px 14px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

   /* 字體大小 */
  --font-size-xxs: 0.625rem;   /* 10px */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-md: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */

  /* 字體粗細 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-extra-bold: 900;

  /* 間距 */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-12: 0.75rem;  /* 12px */
  --spacing-14: 0.875rem; /* 14px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-20: 1.25rem;  /* 20px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  --spacing-2xl: 3rem;    /* 48px */
  --spacing-3xl: 4rem;    /* 64px */
  --spacing-4xl: 5rem;    /* 80px */

  /* border-radius */
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  --border-radius-xl: 12px;
  --border-radius-round: 9999px;  

  /* RWD */
  --mobile-min-width: 402px;  /* iphone 16 pro */
  --mobile-min-width-plus: 403px;
}

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
