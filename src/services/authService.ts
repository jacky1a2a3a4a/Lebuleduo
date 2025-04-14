// src/services/authService.ts
//專注於用戶認證和資料管理

import axios from 'axios';

// API 基礎路徑
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 使用者資料介面
export interface UserData {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  email?: string;
  statusMessage?: string;
  // 其他可能的用戶資訊
}

// 身分類型
export type UserRole = 'customer' | 'deliver';

// 驗證服務大組件
const authService = {
  // LINE 登入回調
  lineCallback: async (code: string, role: UserRole) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/line/callback`, {
        code,
        role,
      });
      return response.data;
    } catch (error) {
      console.error('LINE 登入處理失敗:', error);
      throw error;
    }
  },

  // 獲取用戶資訊
  getUserInfo: async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      throw new Error('未登入狀態');
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('獲取用戶資訊失敗:', error);
      throw error;
    }
  },

  // 登出功能(目前沒有)
  // logout: () => {
  //   localStorage.removeItem('auth_token');
  //   localStorage.removeItem('user_role');
  //   localStorage.removeItem('user_data');

  //   // 返回登入頁面
  //   window.location.href = '/#/auth/line-login';
  // },

  // 檢查用戶是否已登入
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // 獲取當前用戶角色
  getUserRole: (): UserRole | null => {
    const role = localStorage.getItem('user_role') as UserRole | null;
    return role;
  },

  // 獲取儲存的用戶資訊
  getCachedUserData: (): UserData | null => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('解析用戶資料失敗:', error);
        return null;
      }
    }
    return null;
  },
};

export default authService;
