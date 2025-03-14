// CommonHeader 通用Header
import styled from 'styled-components';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// 定義Header可自定義的屬性
export interface HeaderProps {
  title: string;
  titlePath?: string;
  rightAction?: ReactNode;
  sideBar?: ReactNode;
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

// 漢堡按鈕
export const BurgerButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: var(--spacing-md);
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.25rem;
    background: var(--color-gray-700);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }

  &:hover div {
    background: var(--color-gray-500);
  }
`;

// 通用按鈕樣式
export const ActionButton = styled.button`
  padding: 0.8rem 0.8rem;
  border-radius: var(--border-radius-round);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`;

function CommonHeader({
  title,
  titlePath = '/',
  rightAction,
  sideBar,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      {sideBar}
      <HeaderTitle onClick={() => navigate(titlePath)}>{title}</HeaderTitle>
      {rightAction}
    </HeaderContainer>
  );
}

export default CommonHeader;
