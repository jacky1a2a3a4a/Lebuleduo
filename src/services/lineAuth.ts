// line API
//state=1 customer 使用者
//https:access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007121127&redirect_uri=http://4.240.61.223/auth/line-login&state=1&scope=profile%20openid%20email

//state=2 deliver 汪汪員
//https:access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007121127&redirect_uri=http://4.240.61.223/auth/line-login&state=2&scope=profile%20openid%20email

//4.240.61.223/auth/line-login
//localhost:44388/auth/line-login

// LINE 登入相關設定
const LINE_CLIENT_ID = '2007121127';
const LINE_AUTH_URL = 'https://access.line.me/oauth2/v2.1/authorize';

// 使用固定的 redirect_uri，與 LINE 開發者後台設定一致
// 開發環境使用 localhost URL
const REDIRECT_URI = import.meta.env.DEV
  ? 'http://localhost:5173/auth/line-callback'
  : 'http://4.240.61.223/auth/line-login';

// 用戶登入後的最終目標頁面
export const FINAL_REDIRECT = {
  customer: '/customer/my-order',
  deliver: '/deliver',
};

export const getLineLoginUrl = (role: 'customer' | 'deliver') => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: LINE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: role === 'customer' ? '1' : '2', // 簡單使用1表示客戶，2表示汪汪員
    scope: 'profile openid email',
  });

  return `${LINE_AUTH_URL}?${params.toString()}`;
};

export const isLineCallback = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.has('code') && params.has('state');
  } catch (error) {
    console.error('URL解析錯誤:', error);
    return false;
  }
};

/**
 * 從頁面內容中提取JSON數據
 * 用於處理後端返回的JSON響應
 * @returns 提取到的JSON對象或null
 */
export const extractJsonFromPage = () => {
  try {
    // 尋找前後有大括號的JSON字符串
    const bodyText = document.body.textContent || '';
    const jsonRegex = /\{.*\}/s; // s標誌允許匹配多行
    const match = bodyText.match(jsonRegex);

    if (match && match[0]) {
      return JSON.parse(match[0]);
    }

    return null;
  } catch (error) {
    console.error('從頁面提取JSON時出錯:', error);
    return null;
  }
};
