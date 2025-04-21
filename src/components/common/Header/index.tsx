// CommonHeader 通用Header
import styled from 'styled-components';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import BurgerButton from './BuggerButton';

// 通用操作按鈕樣式
export const ActionButton = styled.button`
  background-color: transparent;
`;

// 通用頁首屬性接口
export interface HeaderProps {
  title: string; //頁首標題文字
  titlePath?: string; //點擊標題跳轉的路徑
  actionButton?: ReactNode; //右側自定義操作按鈕
  titleImage?: string; //標題圖片
  imageHeight?: string; // 標題圖片高度
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
  padding: var(--spacing-12) var(--spacing-md);
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
const HeaderTitle = styled.button<{ imageHeight?: string }>`
  color: var(--color-white);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  height: 100%;

  cursor: pointer;

  img {
    height: ${(props) => props.imageHeight || '20px'};
    width: auto;
  }
`;

/**
 * 通用頁首組件
 * 包含漢堡按鈕、標題和可選的右側操作按鈕
 */
function CommonHeader({
  title,
  titlePath = '/',
  actionButton,
  titleImage,
  imageHeight,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <BurgerButton />
        <HeaderTitle
          onClick={() => navigate(titlePath)}
          imageHeight={imageHeight}
        >
          {titleImage ? <img src={titleImage} alt={title} /> : title}
        </HeaderTitle>
        {actionButton}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default CommonHeader;
