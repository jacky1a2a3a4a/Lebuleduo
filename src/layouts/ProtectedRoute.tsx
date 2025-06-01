// src/layouts/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import type { UserRole } from '@/store/types';

interface ProtectedRouteProps {
  children: ReactNode;
  role: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const userRole = useAppSelector((state) => state.user.userRole);

  console.log('ProtectedRoute 檢查:', {
    isAuthenticated,
    userRole,
    requiredRole: role,
  });

  // 如果未登入，重定向到登入頁面
  if (!isAuthenticated) {
    console.log('未登入，重定向到登入頁面');
    return <Navigate to="/auth/line-login-customer" replace />;
  }

  // 如果角色不符，重定向到對應角色的首頁
  if (userRole !== role) {
    console.log('角色不符，重定向:', { userRole, requiredRole: role });
    if (userRole === 'customer') {
      return <Navigate to="/customer" replace />;
    } else if (userRole === 'deliver') {
      return <Navigate to="/deliver" replace />;
    } else {
      // 角色未知，重定向至登入頁面
      console.log('角色未知，重定向到登入頁面');
      return <Navigate to="/auth/line-login-customer" replace />;
    }
  }

  console.log('認證通過，渲染子元件');
  // 如果已登入且角色符合，渲染子元件
  return <>{children}</>;
};

export default ProtectedRoute;
