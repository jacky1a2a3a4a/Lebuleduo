// 登入頁面 切版
import styled from 'styled-components';
import { FaLine, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LineLogin = () => {
  const [selectedRole, setSelectedRole] = useState<
    'customer' | 'deliver' | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

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

  // 登入功能 (暫時移除實際登入功能)
  const handleLogin = () => {
    if (!selectedRole) return;

    // 移除實際登入功能，改為顯示提示
    const role = selectedRole;
    console.log(`模擬${role === 'customer' ? '顧客' : '外送員'}登入`);

    // 添加模擬登入功能
    const mockLogin = () => {
      // 創建模擬數據
      const mockToken = `mock_token_${Date.now()}`;
      const mockProfileData = {
        userId: `user_${Date.now()}`,
        displayName: `${role === 'customer' ? '測試顧客' : '測試外送員'}_${Math.floor(Math.random() * 1000)}`,
        pictureUrl: 'https://profile.line-scdn.net/placeholder-profile.png',
      };

      // 存儲到 sessionStorage
      sessionStorage.setItem('token', mockToken);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('profileData', JSON.stringify(mockProfileData));

      // 使用 React Router 導航而非直接修改 window.location
      navigate(role === 'customer' ? '/customer' : '/deliver');
    };

    // 顯示確認對話框
    if (
      confirm(
        `確定要以${role === 'customer' ? '顧客' : '外送員'}身份模擬登入嗎？`,
      )
    ) {
      mockLogin();
    }
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
            selected={selectedRole === 'customer'}
            onClick={() => handleRoleSelect('customer')}
            isAnimating={isAnimating}
            isExiting={isExiting}
          >
            我是顧客
          </RoleButton>
          <RoleButton
            selected={selectedRole === 'deliver'}
            onClick={() => handleRoleSelect('deliver')}
            isAnimating={isAnimating}
            isExiting={isExiting}
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
              onClick={handleLogin}
              isAnimating={isAnimating}
              isExiting={isExiting}
            >
              <IconStyled>
                <FaLine />
              </IconStyled>
              LINE 登入
            </LineButton>
            <BackButton
              onClick={handleBack}
              isAnimating={isAnimating}
              isExiting={isExiting}
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

// 登入頁面 最外層容器
const LoginSectionStyled = styled.div`
  background-color: var(--color-gray-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

// 登入頁面 圖片
const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: var(--spacing-4);
`;

// 登入頁面 歡迎文字
const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-4xl);
`;

// 登入頁面 歡迎文字 主要文字
const TextMain = styled.span`
  color: var(--color-gray-700);
  font-size: var(--font-size-2xl);
  font-weight: bold;
`;

// 登入頁面 歡迎文字 副文字
const TextSub = styled.span`
  color: var(--color-gray-700);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-14);
`;

// 登入頁面 歡迎文字 內容文字
const TextContent = styled.span`
  color: var(--color-gray-400);
  font-size: 1rem;
`;

// 登入頁面 身分選擇
const RoleSelection = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

// 登入頁面 身分選擇 按鈕
const RoleButton = styled.button<{
  selected: boolean;
  isAnimating: boolean;
  isExiting: boolean;
}>`
  background-color: ${({ selected }) =>
    selected ? 'var(--color-green-line-50)' : 'white'};
  color: ${({ selected }) =>
    selected ? 'var(--color-green-line-0)' : 'var(--color-gray-600)'};
  border: 2px solid
    ${({ selected }) =>
      selected ? 'var(--color-green-line-0)' : 'var(--color-gray-300)'};
  box-shadow: var(--btn-shadow);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isExiting }) =>
    isExiting ? 'scale(0.95) translateY(5px)' : 'scale(1) translateY(0)'};
  opacity: ${({ isExiting }) => (isExiting ? '0' : '1')};

  &:hover {
    border-color: var(--color-green-line-0);
    background-color: var(--color-green-line-50);
    color: var(--color-green-line-0);
  }
`;

// 登入頁面 選擇身分 容器
const SelectedRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
`;

// 登入頁面 選擇身分 文字
const SelectedRoleText = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
`;

// 登入頁面 使用 LINE 登入 按鈕
const LineButton = styled.button<{ isAnimating: boolean; isExiting: boolean }>`
  background-color: var(--color-green-line-0);
  color: white;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  padding: 12px 24px;
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-round);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isExiting }) =>
    isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ isExiting }) => (isExiting ? '0' : '1')};

  &:hover {
    background-color: var(--color-green-line-100);
  }
`;

const IconStyled = styled.div`
  margin-right: var(--spacing-12);
  font-size: var(--font-size-xl);
`;

const BackButton = styled.button<{ isAnimating: boolean; isExiting: boolean }>`
  background-color: var(--color-gray-50);
  color: var(--color-gray-300);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isExiting }) =>
    isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ isExiting }) => (isExiting ? '0' : '1')};

  &:hover {
    color: var(--color-gray-400);
    border-color: var(--color-gray-400);
  }
`;

export default LineLogin;
