// LINE 登入 URL
//https:access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=2007121127&redirect_uri=http://4.240.61.223/GET/auth/line-login&state=1&scope=profile%20openid%20email

export const LINE_CONFIG = {
  channelId: '2007121127', // LINE 官方帳號 ID
  callbackUrl: 'http://4.240.61.223/GET/auth/line-login', // LINE 登入後的回調 URL
};

//LINE 的授權端點 URL，用於發起 OAuth 2.0 授權流程。
const LINE_LOGIN_URL = 'https://access.line.me/oauth2/v2.1/authorize';

// 生成識別用的隨機狀態碼
// 防止 CSRF（跨站請求偽造）攻擊
// 每個登入請求都會生成唯一的 state 值
const generateRandomState = () => {
  return Math.random().toString(36).substring(2);
};

// 生成 LINE 登入 URL
// 將是附加到 state 中
export const getLineLoginUrl = (role: 'customer' | 'deliver') => {
  const params = new URLSearchParams({
    response_type: 'code', // 授權類型
    client_id: LINE_CONFIG.channelId,
    redirect_uri: LINE_CONFIG.callbackUrl,
    state: `role_${role}_${generateRandomState()}`,
    scope: 'profile openid email',
  });
  
  return `${LINE_LOGIN_URL}?${params.toString()}`;
};
