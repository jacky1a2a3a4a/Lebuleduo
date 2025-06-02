import { store } from '../store';
import { 
  setUserId, 
  setAuthToken, 
  setUserRole, 
  setUserData, 
  setLineLoginState,
  clearLineLoginState,
  setAuthData,
  logout,
  clearUserId
} from '../store/slices/userSlice';
import type { UserRole, UserData } from '../store/types';

// ===== 認證狀態管理 =====

// 獲取認證狀態
export const getAuthState = () => {
  const state = store.getState().user;
  return {
    userId: state.userId,
    isAuthenticated: state.isAuthenticated,
    authToken: state.authToken,
    userRole: state.userRole,
    userData: state.userData,
  };
};

// 檢查是否已認證
export const isAuthenticated = (): boolean => {
  return store.getState().user.isAuthenticated;
};

// ===== UsersID 管理（ =====

// 獲取 UsersID（返回 number 類型以保持向後兼容）
export const getUsersID = (): number | null => {
  const usersID = store.getState().user.userId;
  const result = usersID ? Number(usersID) : null;
  return result;
};

// 設置 UsersID
export const setUsersID = (usersID: string): void => {
  store.dispatch(setUserId(usersID));
};

// 移除 UsersID
export const removeUsersID = (): void => {
  store.dispatch(clearUserId());
};

// ===== 認證令牌管理 =====

// 獲取認證令牌
export const getAuthToken = (): string | null => {
  return store.getState().user.authToken;
};

// 設置認證令牌
export const setAuthTokenUtil = (token: string): void => {
  store.dispatch(setAuthToken(token));
};

// ===== 用戶角色管理 =====

// 獲取用戶角色
export const getUserRole = (): UserRole | null => {
  return store.getState().user.userRole;
};

// 設置用戶角色
export const setUserRoleUtil = (role: UserRole): void => {
  store.dispatch(setUserRole(role));
};

// ===== 用戶資料管理 =====

// 獲取用戶資料
export const getUserData = (): UserData | null => {
  return store.getState().user.userData;
};

// 設置用戶資料
export const setUserDataUtil = (userData: UserData): void => {
  store.dispatch(setUserData(userData));
};

// 獲取用戶名稱（從 getUserLocalData.ts 整合，並增強為支援 Redux）
export const getUserName = (): string | null => {
  // 優先從 Redux 獲取
  const reduxUserData = store.getState().user.userData;
  if (reduxUserData?.displayName) {
    return reduxUserData.displayName;
  }
  
  // 向後兼容：從 localStorage 獲取
  try {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    return userData.displayName || null;
  } catch (error) {
    console.error('解析 localStorage user_data 失敗:', error);
    return null;
  }
};

// 獲取用戶頭像
export const getUserAvatar = (): string | null => {
  const userData = store.getState().user.userData;
  return userData?.pictureUrl || null;
};

// ===== LINE 登入狀態管理 =====

// 獲取 LINE 登入狀態
export const getLineLoginState = () => {
  return store.getState().user.lineLogin;
};

// 設置 LINE 登入狀態
export const setLineLoginStateUtil = (state: string, role: UserRole): void => {
  store.dispatch(setLineLoginState({ state, role }));
};

// 清除 LINE 登入狀態
export const clearLineLoginStateUtil = (): void => {
  store.dispatch(clearLineLoginState());
};

// ===== 完整認證管理 =====

// 完整設置認證資料
export const setCompleteAuthData = (data: {
  userId?: string;
  authToken: string;
  userRole: UserRole;
  userData: UserData;
}): void => {
  store.dispatch(setAuthData(data));
};

// 登出
export const logoutUser = (): void => {
  store.dispatch(logout());
  
  // 清除 localStorage 中的認證資料（向後兼容）
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_data');
};

// ===== 向後兼容函數 =====

// 向後兼容的認證檢查
export const isAuthenticatedLegacy = (): boolean => {
  // 檢查 Redux 狀態，如果沒有則檢查 localStorage
  const reduxAuth = store.getState().user.isAuthenticated;
  if (reduxAuth) return true;
  
  const token = localStorage.getItem('auth_token');
  return !!token;
};

// 向後兼容的角色獲取
export const getUserRoleLegacy = (): UserRole | null => {
  // 優先從 Redux 獲取，如果沒有則從 localStorage 獲取
  const reduxRole = store.getState().user.userRole;
  if (reduxRole) return reduxRole;
  
  const role = localStorage.getItem('user_role') as UserRole | null;
  return role;
};

// 向後兼容的用戶資料獲取
export const getUserDataLegacy = (): UserData | null => {
  // 優先從 Redux 獲取
  const reduxUserData = store.getState().user.userData;
  if (reduxUserData) return reduxUserData;
  
  // 從 localStorage 獲取
  try {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.error('解析 localStorage user_data 失敗:', error);
  }
  
  return null;
}; 