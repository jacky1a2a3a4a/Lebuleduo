import { UserRole, UserData } from '../types/auth';

const MOCK_USER_DATA = {
  customer: {
    id: 'mock-customer-id',
    name: '測試顧客',
    email: 'customer@test.com',
    role: 'customer' as UserRole,
    avatar: 'https://via.placeholder.com/150',
  },
  deliver: {
    id: 'mock-deliver-id',
    name: '測試外送員',
    email: 'deliver@test.com',
    role: 'deliver' as UserRole,
    avatar: 'https://via.placeholder.com/150',
  },
};

const mockAuthService = {
  // 模擬登入
  login: (role: UserRole) => {
    const mockToken = `mock-token-${role}-${Date.now()}`;
    const userData = MOCK_USER_DATA[role];

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_data', JSON.stringify(userData));

    return Promise.resolve({ token: mockToken, userData });
  },

  // 登出
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  },

  // 檢查是否已登入
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // 獲取用戶角色
  getUserRole: (): UserRole | null => {
    const role = localStorage.getItem('user_role') as UserRole | null;
    return role;
  },

  // 獲取用戶資料
  getUserData: (): UserData | null => {
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

export default mockAuthService;
