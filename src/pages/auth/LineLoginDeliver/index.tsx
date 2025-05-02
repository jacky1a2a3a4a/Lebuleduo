// 登入頁面 切版
import { useState } from 'react';
import { lineLogin } from '../../../apis/auth/lineLogin';
import Section from '../../../components/auth/Section';
import AuthLogo from '../../../components/auth/Logo';
import LineLoginButton from '../../../components/auth/LineLoginButton';

const LineLogin = () => {
  const [isAnimating] = useState(false);
  const [isExiting] = useState(false);

  // Line 登入處理
  const handleLineLogin = () => {
    lineLogin({ role: 'deliver' });
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
