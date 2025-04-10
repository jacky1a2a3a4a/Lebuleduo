import styled from 'styled-components';

// 登入頁面 最外層容器
export const LoginSectionStyled = styled.div`
  background-color: var(--color-gray-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

// 登入頁面 圖片
export const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: var(--spacing-4);
`;

// 登入頁面 歡迎文字
export const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-4xl);
`;

// 登入頁面 歡迎文字 主要文字
export const TextMain = styled.span`
  color: var(--color-gray-700);
  font-size: var(--font-size-2xl);
  font-weight: bold;
`;

// 登入頁面 歡迎文字 副文字
export const TextSub = styled.span`
  color: var(--color-gray-700);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-14);
`;

// 登入頁面 歡迎文字 內容文字
export const TextContent = styled.span`
  color: var(--color-gray-400);
  font-size: 1rem;
`;

// 登入頁面 身分選擇
export const RoleSelection = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

// 登入頁面 身分選擇 按鈕
export const RoleButton = styled.button<{
  $selected: boolean;
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background-color: ${({ $selected }) =>
    $selected ? 'var(--color-green-line-50)' : 'white'};
  color: ${({ $selected }) =>
    $selected ? 'var(--color-green-line-0)' : 'var(--color-gray-600)'};
  border: 2px solid
    ${({ $selected }) =>
      $selected ? 'var(--color-green-line-0)' : 'var(--color-gray-300)'};
  box-shadow: var(--btn-shadow);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;

  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExiting }) =>
    $isExiting ? 'scale(0.95) translateY(5px)' : 'scale(1) translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};

  &:hover {
    border-color: var(--color-green-line-0);
    background-color: var(--color-green-line-50);
    color: var(--color-green-line-0);
  }
`;

// 登入頁面 選擇身分 容器
export const SelectedRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
`;

// 登入頁面 選擇身分 文字
export const SelectedRoleText = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
`;

// 登入頁面 使用 LINE 登入 按鈕
export const LineButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
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
  transform: ${({ $isExiting }) =>
    $isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};

  &:hover {
    background-color: var(--color-green-line-100);
  }
`;

export const IconStyled = styled.div`
  margin-right: var(--spacing-12);
  font-size: var(--font-size-xl);
`;

export const BackButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
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
  transform: ${({ $isExiting }) =>
    $isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};

  &:hover {
    color: var(--color-gray-400);
    border-color: var(--color-gray-400);
  }
`;

export const LineLoginButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background-color: #06c755;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 12px;

  &:hover {
    background-color: #05b54a;
  }

  ${({ $isAnimating }) =>
    $isAnimating &&
    `
    animation: fadeIn 0.2s ease-in-out;
  `}

  ${({ $isExiting }) =>
    $isExiting &&
    `
    animation: fadeOut 0.2s ease-in-out;
  `}
`;
