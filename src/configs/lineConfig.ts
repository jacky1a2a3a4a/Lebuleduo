// src/configs/lineConfig.ts
//專注於 LINE 登入的配置和安全性

import { 
  setLineLoginStateUtil, 
  getLineLoginState 
} from '../utils/authUtils';
import type { UserRole } from '../store/types';

// LINE 登入配置
interface LineConfig {
  CLIENT_ID: string;
  REDIRECT_URI: string;
  STATE: string;
  SCOPE: string;
}

// 獲取基礎 URL
const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:5173'
  : import.meta.env.VITE_APP_URL || 'https://lebuleduo.vercel.app';
// const BASE_URL = 'https://lebuleduo.vercel.app';
// const BASE_URL = 'http://localhost:5173';

console.log('環境變數檢查:', {
  VITE_APP_URL: import.meta.env.VITE_APP_URL,
  BASE_URL: BASE_URL,
  VITE_LINE_CHANNEL_ID: import.meta.env.VITE_LINE_CHANNEL_ID,
});

// 顧客配置
const CUSTOMER_CONFIG: LineConfig = {
  CLIENT_ID: import.meta.env.VITE_LINE_CHANNEL_ID || '2007121127',
  REDIRECT_URI: `${BASE_URL}/#/auth/line/callback`,
  STATE: 'customer_state_' + Math.random().toString(36).substring(2, 15),
  SCOPE: 'profile openid email',
};

// 汪汪員配置
const DELIVER_CONFIG: LineConfig = {
  CLIENT_ID: import.meta.env.VITE_LINE_CHANNEL_ID || '2007121127',
  REDIRECT_URI: `${BASE_URL}/#/auth/line/callback`,
  STATE: 'deliver_state_' + Math.random().toString(36).substring(2, 15),
  SCOPE: 'profile openid email',
};

// config 通常都是靜態資料 function的部分可以拆分到utils
// 根據角色獲取配置
export const getLineConfig = (role: 'customer' | 'deliver'): LineConfig => {
  return role === 'customer' ? CUSTOMER_CONFIG : DELIVER_CONFIG;
};

// 保存 state 至 Redux，用於防止 CSRF 攻擊
export const saveLineState = (role: 'customer' | 'deliver'): void => {
  const config = getLineConfig(role);
  
  // 使用 Redux 保存
  setLineLoginStateUtil(config.STATE, role as UserRole);
};

// 驗證 state（從 Redux 獲取）
export const validateLineState = (state: string): boolean => {
  const reduxState = getLineLoginState();
  return reduxState.state === state;
};

// 取得 LINE 登入流程中的角色（從 Redux 獲取）
export const getLoginRole = (): 'customer' | 'deliver' | null => {
  const lineLoginState = getLineLoginState();
  if (lineLoginState.role && (lineLoginState.role === 'customer' || lineLoginState.role === 'deliver')) {
    return lineLoginState.role;
  }
  
  return null;
};
