import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState, UserRole, UserData } from '../types';

const initialState: UserState = {
  userId: null, // 用戶ID
  isAuthenticated: false, // 是否已認證
  authToken: null, // 認證令牌
  userRole: null, // 用戶角色
  userData: null, // 用戶資料
  lineLogin: {
    state: null, // 登入狀態
    role: null, // 用戶角色
  }, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // UsersID 相關
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    clearUserId: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
    },
    
    // 認證令牌相關
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthToken: (state) => {
      state.authToken = null;
    },
    
    // 用戶角色相關
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    clearUserRole: (state) => {
      state.userRole = null;
    },
    
    // 用戶資料相關
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    
    // LINE 登入狀態相關（臨時狀態）
    setLineLoginState: (state, action: PayloadAction<{ state: string; role: UserRole }>) => {
      state.lineLogin.state = action.payload.state;
      state.lineLogin.role = action.payload.role;
    },
    clearLineLoginState: (state) => {
      state.lineLogin.state = null;
      state.lineLogin.role = null;
    },
    
    // 完整登入設置（一次性設置所有認證資料）
    setAuthData: (state, action: PayloadAction<{
      userId?: string;
      authToken: string;
      userRole: UserRole;
      userData: UserData;
    }>) => {
      const { userId, authToken, userRole, userData } = action.payload;
      
      if (userId) {
        state.userId = userId;
      }
      state.authToken = authToken;
      state.userRole = userRole;
      state.userData = userData;
      state.isAuthenticated = true;
    },
    
    // 完整登出（清除所有資料）
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
      state.authToken = null;
      state.userRole = null;
      state.userData = null;
      // 保留 lineLogin 狀態，因為它可能在登入流程中需要
    },
  },
});

// 導出所有 actions
export const {
  setUserId,
  clearUserId,
  setAuthToken,
  clearAuthToken,
  setUserRole,
  clearUserRole,
  setUserData,
  clearUserData,
  setLineLoginState,
  clearLineLoginState,
  setAuthData,
  logout,
} = userSlice.actions;

// 導出 reducer
export default userSlice.reducer; 