import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 型別安全的 hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// user 相關 hooks
// 取得完整 user 狀態
export const useUser = () => {
  return useAppSelector((state) => state.user);
};

// 取得 user id（轉換為數字）
export const useUserId = (): number | null => {
  return useAppSelector((state) => {
    const userId = state.user.userId;
    return userId ? Number(userId) : null;
  });
};

// 取得 user 是否已驗證
export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.user.isAuthenticated);
};

// 取得認證令牌
export const useAuthToken = () => {
  return useAppSelector((state) => state.user.authToken);
};

// 取得用戶角色
export const useUserRole = () => {
  return useAppSelector((state) => state.user.userRole);
};

// 取得 LINE 用戶資料
export const useUserData = () => {
  return useAppSelector((state) => state.user.userData);
};

// 取得 LINE 登入狀態
export const useLineLoginState = () => {
  return useAppSelector((state) => state.user.lineLogin);
}; 