// 登入頁面 切版
import { FaLine, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { getLineConfig, saveLineState } from '../../../configs/lineConfig';
import {
  LoginSectionStyled,
  Logo,
  WelcomeText,
  TextMain,
  TextSub,
  TextContent,
  RoleSelection,
  RoleButton,
  SelectedRoleContainer,
  SelectedRoleText,
  ButtonGroup,
  LineButton,
  IconStyled,
  BackButton,
} from './styles';

const LineLogin = () => {
  const [selectedRole, setSelectedRole] = useState<
    'customer' | 'deliver' | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // 選擇身分
  const handleRoleSelect = (role: 'customer' | 'deliver') => {
    if (selectedRole === role) return;

    setIsExiting(true);

    setTimeout(() => {
      setIsExiting(false);
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(role);
        setIsAnimating(false);
      }, 200);
    }, 200);
  };

  // 返回功能
  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(null);
        setIsAnimating(false);
      }, 200);
    }, 200);
  };

  // Line 登入處理
  const handleLineLogin = () => {
    if (!selectedRole) return;

    console.log('=== 開始 LINE 登入流程 ===');
    console.log('選擇的角色:', selectedRole);

    // 保存 state 和角色到 localStorage
    saveLineState(selectedRole);
    console.log('已保存到 localStorage:', {
      line_login_role: localStorage.getItem('line_login_role'),
      line_login_state: localStorage.getItem('line_login_state'),
    });

    // 獲取對應角色的 LINE 配置
    const lineConfig = getLineConfig(selectedRole);
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
    <LoginSectionStyled>
      <Logo src={'/Lebuledou.png'} />
      <WelcomeText>
        <TextMain>Lebuledou</TextMain>
        <TextSub>垃不垃多</TextSub>
        <TextContent>歡迎使用最省事的垃圾代收服務</TextContent>
      </WelcomeText>

      {/* 身分選擇 */}
      {!selectedRole ? (
        <RoleSelection>
          <RoleButton
            $selected={selectedRole === 'customer'}
            onClick={() => handleRoleSelect('customer')}
            $isAnimating={isAnimating}
            $isExiting={isExiting}
          >
            我是顧客
          </RoleButton>
          <RoleButton
            $selected={selectedRole === 'deliver'}
            onClick={() => handleRoleSelect('deliver')}
            $isAnimating={isAnimating}
            $isExiting={isExiting}
          >
            我是汪汪員
          </RoleButton>
        </RoleSelection>
      ) : (
        <SelectedRoleContainer>
          <SelectedRoleText>
            {selectedRole === 'customer' ? '客戶' : '代收員'}登入
          </SelectedRoleText>
          <ButtonGroup>
            <LineButton
              onClick={handleLineLogin}
              $isAnimating={isAnimating}
              $isExiting={isExiting}
            >
              <IconStyled>
                <FaLine />
              </IconStyled>
              LINE 登入
            </LineButton>
            <BackButton
              onClick={handleBack}
              $isAnimating={isAnimating}
              $isExiting={isExiting}
            >
              <IconStyled>
                <FaArrowLeft />
              </IconStyled>
              返回
            </BackButton>
          </ButtonGroup>
        </SelectedRoleContainer>
      )}
    </LoginSectionStyled>
  );
};

export default LineLogin;
