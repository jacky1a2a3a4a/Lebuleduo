// CommonHeader 通用Header
import styled from 'styled-components';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import BurgerButton from './BuggerButton';

// 定義Header可自定義的屬性
export interface HeaderProps {
  title: string;
  titlePath?: string;
  actionButton?: ReactNode;
}

// Header 容器
const HeaderContainer = styled.header`
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
  padding: 1.2rem 1.5rem;
  display: grid;
  grid-template-columns: auto 1.75fr 1fr;
  align-items: center;
  justify-content: space-between;
`;

// Header 標題
const HeaderTitle = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: var(--font-size-2xl);
  font-weight: 600;

  &:hover {
    color: var(--color-gray-600);
  }
`;

// 通用按鈕樣式
export const ActionButton = styled.button`
  padding: 0.8rem 0.8rem;
  border-radius: var(--border-radius-round);
  box-shadow: var(--btn-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--btn-shadow-hover);
  }

  &:active {
    transform: translateY(0);
  }
`;

function CommonHeader({ title, titlePath = '/', actionButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <BurgerButton />
        <HeaderTitle onClick={() => navigate(titlePath)}>{title}</HeaderTitle>
        {actionButton}
      </HeaderContainer>
    </>
  );
}

export default CommonHeader;
