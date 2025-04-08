// 測試
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'customer' | 'deliver';
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // 檢查用戶是否已登入（檢查 token 是否存在）
  const token = sessionStorage.getItem('token');
  // 檢查用戶角色是否與路由要求的角色匹配
  const userRole = sessionStorage.getItem('userRole');

  console.log('ProtectedRoute - 檢查用戶權限', {
    token: !!token,
    userRole,
    requiredRole: role,
  });

  // 用戶未登入，跳轉到登入頁面
  if (!token) {
    console.log('用戶未登入，重定向到登入頁面');
    return <Navigate to="/auth/line-login" replace />;
  }

  // 用戶角色與路由要求的角色不匹配，跳轉到對應頁面
  if (role === 'customer' && userRole !== 'customer') {
    console.log('用戶角色不是客戶，重定向到汪汪員頁面');
    return <Navigate to="/deliver" replace />;
  } else if (role === 'deliver' && userRole !== 'deliver') {
    console.log('用戶角色不是汪汪員，重定向到客戶頁面');
    return <Navigate to="/customer/my-order" replace />;
  }

  // 一切正常，渲染子組件
  console.log('用戶權限驗證通過，顯示受保護內容');
  // 清除重定向標記
  sessionStorage.removeItem('is_redirecting');
  return <>{children}</>;
}

export default ProtectedRoute;
