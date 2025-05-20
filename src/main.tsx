import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles.ts';

// 直接創建根節點並渲染應用
const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
);