// line API
//state=1 customer 使用者
//https:access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007121127&redirect_uri=http://4.240.61.223/auth/line-login&state=1&scope=profile%20openid%20email

//state=2 deliver 汪汪員
//https:access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007121127&redirect_uri=http://4.240.61.223/auth/line-login&state=2&scope=profile%20openid%20email

//4.240.61.223/auth/line-login //虛擬機 環境
//localhost:44388/auth/line-login //後端 本機

// LINE 登入相關設定
const LINE_CLIENT_ID = '2007121127'; //line channel id
const LINE_AUTH_URL = 'https://access.line.me/oauth2/v2.1/authorize'; //line 登入 url

// 根據環境選擇已註冊的 redirect_uri
// 使用與 LINE 開發者控制台中註冊的完全一致的 URL
const REDIRECT_URI = import.meta.env.DEV
  ? 'http://localhost:5173/auth/line-callback' // 已在 LINE 開發者控制台註冊的本地開發 URL
  : 'http://4.240.61.223/auth/line-login'; // 生產環境 URL

// 用戶登入後的最終目標頁面
export const FINAL_REDIRECT = {
  customer: '/customer',
  deliver: '/deliver',
};

// 生成 LINE 登入 URL
export const getLineLoginUrl = (role: 'customer' | 'deliver') => {
  // 清除所有之前的登入相關標記
  sessionStorage.removeItem('is_redirecting');
  sessionStorage.removeItem('line_login_role');

  // 儲存角色信息到 sessionStorage，以便回調頁面使用
  sessionStorage.setItem('line_login_role', role);

  // 構建 LINE 登入 URL 的必要參數
  const params = new URLSearchParams({
    response_type: 'code', //指定授權類型為授權碼流程（Authorization Code Flow）
    client_id: LINE_CLIENT_ID, //line channel id
    redirect_uri: REDIRECT_URI, //line 登入後的回調 url
    state: role === 'customer' ? '1' : '2', // 簡單使用1表示客戶，2表示汪汪員
    scope: 'profile openid email', //指定授權範圍
  });

  return `${LINE_AUTH_URL}?${params.toString()}`;
};

// 從 state 中提取角色
export const extractRoleFromState = (
  state: string | null,
): 'customer' | 'deliver' | null => {
  if (!state) return null;

  return state === '1' ? 'customer' : state === '2' ? 'deliver' : null;
};

// 處理 LINE 登入結果
export const handleLoginResult = async (data: {
  state?: string;
  status?: boolean;
  message?: string;
  profileData?: unknown;
  userProfile?: unknown;
  token?: string;
  role?: string;
  roleName?: 'customer' | 'deliver';
  redirectUrl?: string;
}) => {
  // 1. 保存 token
  if (data.token) {
    sessionStorage.setItem('token', data.token);
  }

  // 2. 保存用戶角色
  // 從回傳的JSON 確定用戶角色
  let role = data.roleName;

  // 如果沒有從JSON拿到角色，嘗試從 state 獲取角色
  if (!role) {
    // 嘗試從 state 獲取角色
    if (data.state) {
      role = extractRoleFromState(data.state);
    }

    // 如果還是沒有，嘗試從之前保存的角色獲取
    if (!role) {
      const savedRole = sessionStorage.getItem('line_login_role');
      role =
        savedRole === 'customer' || savedRole === 'deliver'
          ? savedRole
          : 'customer';
    }
  }
  sessionStorage.setItem('userRole', role);

  // 3. 保存用戶資料
  const profileData = data.profileData || data.userProfile;
  if (profileData) {
    sessionStorage.setItem(
      'profileData',
      typeof profileData === 'string'
        ? profileData
        : JSON.stringify(profileData),
    );
  }

  // 4. 設置重定向標記以防止重複重定向
  sessionStorage.setItem('is_redirecting', 'true');

  // 回傳結果
  return {
    success: true,
    role,
    redirectUrl:
      data.redirectUrl || FINAL_REDIRECT[role as keyof typeof FINAL_REDIRECT],
  };
};
