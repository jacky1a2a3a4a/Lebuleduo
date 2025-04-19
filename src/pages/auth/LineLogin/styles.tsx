import styled from 'styled-components';

// 登入頁面 最外層容器
export const LoginSectionStyled = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 20% 20%,
        rgba(68, 93, 179, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(247, 221, 151, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

// 登入頁面 圖片
export const Logo = styled.img`
  width: 140px;
  height: 100%;
  margin-bottom: var(--spacing-12);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// 登入頁面 歡迎文字
export const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--spacing-4xl);
  text-align: center;
`;

// 登入頁面 歡迎文字 主要文字
export const TextMain = styled.span`
  color: var(--color-primary);
  font-size: var(--font-size-4xl);
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-2);
`;

// 登入頁面 歡迎文字 副文字
export const TextSub = styled.span`
  color: var(--color-tertiary);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-14);
  letter-spacing: 1px;
`;

// 登入頁面 歡迎文字 內容文字
export const TextContent = styled.span`
  color: var(--color-text-tertiary);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 400px;
  text-align: center;
`;

// 登入頁面 身分選擇
export const RoleSelection = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin: var(--spacing-4) 0;
`;

// 登入頁面 身分選擇 按鈕
export const RoleButton = styled.button<{
  $selected: boolean;
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background-color: ${({ $selected }) =>
    $selected ? 'var(--color-primary)' : 'white'};
  color: ${({ $selected }) => ($selected ? 'white' : 'var(--color-primary)')};
  border: 2px solid
    ${({ $selected }) =>
      $selected ? 'var(--color-primary)' : 'var(--color-secondary)'};
  box-shadow: ${({ $selected }) =>
    $selected
      ? '0 4px 6px rgba(68, 93, 179, 0.2)'
      : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExiting }) =>
    $isExiting ? 'scale(0.95) translateY(5px)' : 'scale(1) translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};

  &:hover {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(68, 93, 179, 0.2);
  }

  &:active {
    transform: translateY(1px);
  }
`;

// 登入頁面 選擇身分 容器
export const SelectedRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
`;

// 登入頁面 選擇身分 文字
export const SelectedRoleText = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
  max-width: 300px;
`;

// 登入頁面 使用 LINE 登入 按鈕
export const LineButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background: linear-gradient(
    135deg,
    var(--color-green-line-0) 0%,
    #05b54a 100%
  );
  color: white;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  padding: 14px 28px;
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-round);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExiting }) =>
    $isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};
  box-shadow: 0 4px 6px rgba(0, 200, 83, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 200, 83, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const IconStyled = styled.div`
  margin-right: var(--spacing-12);
  font-size: var(--font-size-xl);
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
`;

export const BackButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background-color: var(--color-gray-50);
  color: var(--color-gray-600);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  padding: 14px 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExiting }) =>
    $isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    color: var(--color-gray-700);
    border-color: var(--color-gray-400);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LineButtonTest = styled.button`
  margin-top: var(--spacing-2xl);
  padding: 12px 24px;
  background: var(--color-tertiary);
  color: var(--color-neutral-600);
  border-radius: var(--border-radius-round);
  font-weight: var(--font-weight-medium);
`;
