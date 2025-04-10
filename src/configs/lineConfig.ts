// src/configs/lineConfig.ts
interface LineConfig {
  CLIENT_ID: string;
  REDIRECT_URI: string;
  STATE: string;
  SCOPE: string;
}

// 顧客配置
const CUSTOMER_CONFIG: LineConfig = {
  CLIENT_ID: import.meta.env.VITE_LINE_CHANNEL_ID || '2007121127',
  REDIRECT_URI: import.meta.env.DEV
    ? 'http://localhost:5173/auth/line-callback'
    : 'http://4.240.61.223/auth/line-callback',
  STATE: 'customer_state_' + Math.random().toString(36).substring(2, 15),
  SCOPE: 'profile openid email',
};

// 汪汪員配置
const DELIVER_CONFIG: LineConfig = {
  CLIENT_ID: import.meta.env.VITE_LINE_CHANNEL_ID || '2007121127',
  REDIRECT_URI: import.meta.env.DEV
    ? 'http://localhost:5173/auth/line-callback'
    : 'http://4.240.61.223/auth/line-callback',
  STATE: 'deliver_state_' + Math.random().toString(36).substring(2, 15),
  SCOPE: 'profile openid email',
};

// 根據角色獲取配置
export const getLineConfig = (role: 'customer' | 'deliver'): LineConfig => {
  return role === 'customer' ? CUSTOMER_CONFIG : DELIVER_CONFIG;
};

// 保存 state 至 localStorage，用於防止 CSRF 攻擊
export const saveLineState = (role: 'customer' | 'deliver'): void => {
  const config = getLineConfig(role);
  localStorage.setItem('line_login_state', config.STATE);
  localStorage.setItem('line_login_role', role);
};

// 驗證 state
export const validateLineState = (state: string): boolean => {
  const savedState = localStorage.getItem('line_login_state');
  return state === savedState;
};

// 取得登入角色
export const getLoginRole = (): 'customer' | 'deliver' | null => {
  const role = localStorage.getItem('line_login_role');
  if (role === 'customer' || role === 'deliver') {
    return role;
  }
  return null;
};
