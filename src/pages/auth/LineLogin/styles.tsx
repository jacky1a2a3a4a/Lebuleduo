import styled from 'styled-components';

// 登入頁面 最外層容器
export const LoginSectionStyled = styled.div`
  background: var(--color-primary);
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
  width: 185px;
  height: 100%;
  margin-bottom: var(--spacing-12);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// 登入頁面 文字容器
export const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin-bottom: var(--spacing-2xl);
`;

// 登入頁面 歡迎文字 主要文字
export const LogoType = styled.img`
  color: var(--color-white);

  width: 100%;
  max-width: 160px;

  margin: var(--spacing-md) 0 var(--spacing-sm);
`;

// 登入頁面 歡迎文字 副文字
export const TextSub = styled.span`
  color: var(--color-white);
  width: 100%;
  text-align: center;
  font-size: var(--font-size-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
    text-align: center;
    flex: 1;
  }
`;

// 登入頁面 身分選擇
export const RoleSelection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  padding: var(--spacing-12) var(--spacing-xl);
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
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-md);
  letter-spacing: 0.1em;
  font-weight: var(--font-weight-medium);
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
    var(--color-green-line-light) 0%,
    var(--color-green-line-0) 100%
  );
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-md) var(--spacing-2xl);
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
  font-size: var(--font-size-xs);
`;

export const BackButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background-color: var(--color-white);
  color: var(--color-text-disabled);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-12) var(--spacing-2xl);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
