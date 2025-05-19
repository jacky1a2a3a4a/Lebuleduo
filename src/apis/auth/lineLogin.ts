import { getLineConfig, saveLineState } from '../../configs/lineConfig';

export interface LineLoginParams {
  role: 'customer' | 'deliver';
}

export const lineLogin = ({ role }: LineLoginParams) => {
  console.log('=== 開始 LINE 登入流程 ===');
  console.log('選擇的角色:', role);

  // 從 URL 中提取 UsersID
  const urlParams = new URLSearchParams(window.location.search);
  const usersId = urlParams.get('UsersID');
  console.log('從 URL 提取的 UsersID:', usersId);

  // 保存 UsersID 到 localStorage
  if (usersId) {
    localStorage.setItem('UsersID', usersId);
  }

  // 獲取 LINE 配置
  const lineConfig = getLineConfig(role);

  // 將 UsersID 加入到 state 參數中
  const stateWithUsersId = usersId
    ? `${lineConfig.STATE}_${usersId}`
    : lineConfig.STATE;

  // 保存 state、角色和 UsersID 到 localStorage
  saveLineState(role);
  localStorage.setItem('line_login_state', stateWithUsersId);

  console.log('已保存到 localStorage:', {
    line_login_role: localStorage.getItem('line_login_role'),
    line_login_state: localStorage.getItem('line_login_state'),
    UsersID: localStorage.getItem('UsersID'),
  });

  console.log('LINE 配置:', {
    clientId: lineConfig.CLIENT_ID,
    redirectUri: lineConfig.REDIRECT_URI,
    state: stateWithUsersId,
  });

  // 構建 LINE 登入 URL，使用包含 UsersID 的 state
  const lineAuthUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineConfig.CLIENT_ID}&redirect_uri=${encodeURIComponent(lineConfig.REDIRECT_URI)}&state=${stateWithUsersId}&scope=${lineConfig.SCOPE}`;
  console.log('即將跳轉到 LINE 登入頁面:', lineAuthUrl);

  // 跳轉到 LINE 登入頁面
  window.location.href = lineAuthUrl;
};
