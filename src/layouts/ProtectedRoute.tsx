// 測試
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  // 這裡之後可以添加認證和授權邏輯
  // 暫時返回子元素，不做任何保護
  return children;

  // 完整邏輯大概會像這樣：
  // const isAuthenticated = true; // 之後改為實際檢查
  // const userRole = 'customer'; // 之後改為從認證系統獲取

  // if (!isAuthenticated) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  // if (role && role !== userRole) {
  //   return <Navigate to="/" replace />;
  // }

  // return children;
}

export default ProtectedRoute;
