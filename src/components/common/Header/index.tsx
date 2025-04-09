// CommonHeader 通用Header
import styled from 'styled-components';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import BurgerButton from './BuggerButton';

/**
 * 通用頁首屬性接口
 */
export interface HeaderProps {
  /** 頁首標題文字 */
  title: string;
  /** 點擊標題跳轉的路徑 */
  titlePath?: string;
  /** 右側自定義操作按鈕 */
  actionButton?: ReactNode;
}

const minWidthMobilePlus = 403;

// Header 外層容器，用於延伸背景色
const HeaderWrapper = styled.div`
  background-color: var(--color-primary);
  width: 100%;
  z-index: 999;
`;

// Header 容器
const HeaderContainer = styled.header`
  background-color: var(--color-primary);
  padding: 1.2rem 1.5rem;
  display: grid;
  grid-template-columns: auto 1.75fr 1fr;
  align-items: center;
  justify-content: space-between;

  /* 最大寬度限制 */
  width: 100%;
  max-width: ${minWidthMobilePlus}px;
  margin: 0 auto;
`;

// Header 標題
const HeaderTitle = styled.button`
  color: var(--color-white);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  height: 100%;

  font-size: var(--font-size-2xl);
  font-weight: 700;
  line-height: 1;
  padding: 0;
  margin: 0;

  &:hover {
    /* color: var(--color-gray-100); */
  }
`;

/**
 * 通用頁首組件
 * 包含漢堡按鈕、標題和可選的右側操作按鈕
 */
function CommonHeader({ title, titlePath = '/', actionButton }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <BurgerButton />
        <HeaderTitle onClick={() => navigate(titlePath)}>{title}</HeaderTitle>
        {actionButton}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default CommonHeader;
