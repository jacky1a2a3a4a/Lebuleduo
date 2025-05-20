import styled from 'styled-components';
import { StyledProps } from './types';

//最外層容器
export const MyOrderSectionStyled = styled.section`
  background-color: ${({ theme }) => theme.colors.primary.main};
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};

  overflow: hidden;
`;

// 訂單列表容器（包含標籤和列表）
export const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

// 標籤容器
export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  z-index: 1;
`;

// 標籤項目
export const TabItem = styled.div<StyledProps>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background.secondary : theme.colors.secondary.main};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.main : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : 'none'};

  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: 0.2em;
  writing-mode: vertical-rl; /* 垂直文字，從右到左 */
  text-orientation: upright; /* 讓單個字符直立顯示 */
  min-height: 160px; /* 確保有足夠的高度顯示垂直文字 */

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};
  margin-bottom: -20px; /* 讓標籤重疊 */
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing[12]};
  cursor: pointer;
  transition:
    all 0.3s ease,
    z-index 0s;

  /* 斜角效果 - 左右翻轉 */
  clip-path: polygon(
    100% 0%,
    /* 右上角 */ 0% 0%,
    /* 左上角 */ 0% 90%,
    /* 左側中間點開始斜角 */ 60% 100%,
    /* 底部左側結束斜角 */ 100% 100% /* 右下角 */
  );
`;

// 訂單列表 區塊
export const OrderListSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[12]};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
