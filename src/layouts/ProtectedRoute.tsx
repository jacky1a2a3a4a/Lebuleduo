// src/layouts/ProtectedRoute.tsx
import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authService, { UserRole } from '../services/authService';

interface ProtectedRouteProps {
  children: ReactNode;
  role: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  useEffect(() => {
    // 如果使用者已登入但localStorage中沒有用戶資料，則嘗試獲取
    if (isAuthenticated && !authService.getCachedUserData()) {
      authService
        .getUserInfo()
        .then((userData) => {
          localStorage.setItem('user_data', JSON.stringify(userData));
        })
        .catch((err) => {
          console.error('獲取用戶資料失敗:', err);
          // 如果獲取失敗，清除登入狀態，強制用戶重新登入
          authService.logout();
        });
    }
  }, [isAuthenticated]);

  // 如果未登入，重定向到登入頁面
  if (!isAuthenticated) {
    return <Navigate to="/auth/line-login" replace />;
  }

  // 如果角色不符，重定向到對應角色的首頁
  if (userRole !== role) {
    if (userRole === 'customer') {
      return <Navigate to="/customer/my-order" replace />;
    } else if (userRole === 'deliver') {
      return <Navigate to="/deliver" replace />;
    } else {
      // 角色未知，登出並重定向至登入頁面
      authService.logout();
      return <Navigate to="/auth/line-login" replace />;
    }
  }

  // 如果已登入且角色符合，渲染子元件
  return <>{children}</>;
};

export default ProtectedRoute;
