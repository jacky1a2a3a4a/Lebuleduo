import styled from 'styled-components';

// 收運任務列表
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
  width: 100%;
  padding: 0 var(--spacing-xs);
`;

// 收運列表標題區塊
export const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
`;

// 收運列表標題
export const OrderListTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

// 收運次數
export const OrderListCal = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 收運列表 任務內容大容器
export const TabContent = styled.div`
  background-color: transparent;
  overflow-y: auto;
  flex: 1;
  height: 100%;
  padding-bottom: var(--spacing-md);

  &::-webkit-scrollbar {
    display: none;
  }
`;
