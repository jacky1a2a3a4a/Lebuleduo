// 使用者角色
export type UserRole = 'customer' | 'deliver' | 'admin';

// Line 登入狀態(臨時登入用，不持久化)
export type LineLoginState = {
  state: string | null;
  role: UserRole | null;
};

// 使用者資料
export type UserState = {
  userId: string | null;
  isAuthenticated: boolean;
  authToken: string | null;
  userRole: UserRole | null;
  userData: UserData | null;
  lineLogin: LineLoginState; // 臨時登入用state，不持久化
};

// line使用者資料
export type UserData = {
  displayName: string;
  userId: string;
  pictureUrl?: string;
};



