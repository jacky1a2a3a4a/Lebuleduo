import styled from 'styled-components';

export const minWidthMobilePlus = 403;

// 通用操作按鈕樣式
export const ActionButton = styled.button`
  background-color: transparent;
`;

// Header 外層容器，用於延伸背景色
export const HeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  width: 100%;
  z-index: 999;
`;

// Header 容器
export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing.md};
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
export const HeaderTitle = styled.button<{ $imageHeight?: string }>`
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  height: 100%;

  cursor: pointer;

  img {
    height: ${(props) => props.$imageHeight || '20px'};
    width: auto;
  }
`; 