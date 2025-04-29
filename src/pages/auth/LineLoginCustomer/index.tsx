// 登入頁面 切版
import { useState } from 'react';
import LineLoginButton from '../../../components/auth/LineLoginButton';
import AuthLogo from '../../../components/auth/Logo';
import Section from '../../../components/auth/Section';
import { lineLogin } from '../../../apis/auth/lineLogin';

const LineLogin = () => {
  const [isAnimating] = useState(false);
  const [isExiting] = useState(false);

  // Line 登入處理
  const handleLineLogin = () => {
    lineLogin({ role: 'customer' });
  };

  return (
    <Section>
      <AuthLogo type="customer" />
      <LineLoginButton
        onClick={handleLineLogin}
        isAnimating={isAnimating}
        isExiting={isExiting}
        role="customer"
      />
    </Section>
  );
};

export default LineLogin;
