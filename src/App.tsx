import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { routes } from './routes';

// 自定義 Hook 用於處理 LINE 授權檢查
const useLineAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查 URL 是否包含 LINE 授權碼
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      // 直接重定向到回調處理路由
      navigate('/auth/line/callback', { replace: true });
    }
  }, [navigate]);
};

// 路由渲染組件
const RouteRenderer = ({ routes }) => {
  const renderRoutes = (routes) => {
    return routes.map((route) => (
      <Route
        key={route.path || 'index'}
        path={route.path}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

// 當獲取官方提供的參數後，重定向到我們指定的line callback頁面
const AppContent = () => {
  useLineAuthCheck();
  return <RouteRenderer routes={routes} />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
