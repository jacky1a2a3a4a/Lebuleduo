// 測試
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'customer' | 'deliver';
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // 檢查用戶是否已登入（檢查 token 是否存在）
  const token = localStorage.getItem('token');
  // 檢查用戶角色是否與路由要求的角色匹配
  const userRole = localStorage.getItem('userRole');

  // 用戶未登入，跳轉到登入頁面
  if (!token) {
    return <Navigate to="/auth/line-login" replace />;
  }

  // 用戶角色與路由要求的角色不匹配，跳轉到對應頁面
  if (role === 'customer' && userRole !== 'customer') {
    return <Navigate to="/deliver" replace />;
  } else if (role === 'deliver' && userRole !== 'deliver') {
    return <Navigate to="/customer/my-order" replace />;
  }

  // 一切正常，渲染子組件
  return <>{children}</>;
}

export default ProtectedRoute;
