import { getLineConfig, saveLineState } from '../../configs/lineConfig';

export interface LineLoginParams {
  role: 'customer' | 'deliver';
}

export const lineLogin = ({ role }: LineLoginParams) => {
  console.log('=== 開始 LINE 登入流程 ===');
  console.log('選擇的角色:', role);

  // 保存 state 和角色到 localStorage
  saveLineState(role);
  console.log('已保存到 localStorage:', {
    line_login_role: localStorage.getItem('line_login_role'),
    line_login_state: localStorage.getItem('line_login_state'),
  });

  // 獲取 LINE 配置
  const lineConfig = getLineConfig(role);
  console.log('LINE 配置:', {
    clientId: lineConfig.CLIENT_ID,
    redirectUri: lineConfig.REDIRECT_URI,
    state: lineConfig.STATE,
  });

  // 構建 LINE 登入 URL
  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineConfig.CLIENT_ID}&redirect_uri=${encodeURIComponent(lineConfig.REDIRECT_URI)}&state=${lineConfig.STATE}&scope=${lineConfig.SCOPE}`;
  console.log('即將跳轉到 LINE 登入頁面:', lineAuthUrl);

  // 跳轉到 LINE 登入頁面
  window.location.href = lineAuthUrl;
};
