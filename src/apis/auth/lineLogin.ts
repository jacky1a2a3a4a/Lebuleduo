import { getLineConfig, saveLineState } from '@/configs/lineConfig';
import { store } from '@/store';
import { setLineLoginState } from '@/store/slices/userSlice';
import type { UserRole } from '@/store/types';

export interface LineLoginParams {
  role: 'customer' | 'deliver';
}

export const lineLogin = ({ role }: LineLoginParams) => {
  console.log('=== 開始 LINE 登入流程 ===');
  console.log('選擇的角色:', role);

  // 獲取 LINE 配置
  const lineConfig = getLineConfig(role);

  // 使用 Redux 保存 LINE 登入狀態
  store.dispatch(setLineLoginState({
    state: lineConfig.STATE,
    role: role as UserRole,
  }));

  console.log('已保存到 Redux:', {
    lineLoginState: store.getState().user.lineLogin,
  });

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
