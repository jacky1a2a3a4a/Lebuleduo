import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// 檢查根元素是否存在
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('找不到根元素 #root，請確認 HTML 結構正確');
} else {
  // 創建根節點並渲染應用
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log('應用成功渲染');
  } catch (error) {
    console.error('渲染應用時發生錯誤:', error);
  }
}
