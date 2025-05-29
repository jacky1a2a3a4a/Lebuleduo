import styled from 'styled-components';

// 收運任務列表
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

// 收運列表標題區塊
export const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

// 收運列表標題
export const OrderListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

// 收運次數
export const OrderListCal = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 收運列表 任務內容大容器
export const TabContent = styled.div`
  background-color: transparent;
  overflow-y: auto;
  flex: 1;
  height: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }
`;
