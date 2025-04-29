// 登入頁面 切版
import { useState } from 'react';
import { getLineConfig, saveLineState } from '../../../configs/lineConfig';
import Section from '../../../components/auth/Section';
import AuthLogo from '../../../components/auth/Logo';
import LineLoginButton from '../../../components/auth/LineLoginButton';

const LineLogin = () => {
  const [isAnimating] = useState(false);
  const [isExiting] = useState(false);

  // Line 登入處理
  const handleLineLogin = () => {
    console.log('=== 開始 LINE 登入流程 ===');
    console.log('選擇的角色: deliver');

    // 保存 state 和角色到 localStorage
    saveLineState('deliver');
    console.log('已保存到 localStorage:', {
      line_login_role: localStorage.getItem('line_login_role'),
      line_login_state: localStorage.getItem('line_login_state'),
    });

    // 獲取 LINE 配置
    const lineConfig = getLineConfig('deliver');
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

  return (
    <Section>
      <AuthLogo type="deliver" />
      <LineLoginButton
        onClick={handleLineLogin}
        isAnimating={isAnimating}
        isExiting={isExiting}
        role="deliver"
      />
    </Section>
  );
};

export default LineLogin;
