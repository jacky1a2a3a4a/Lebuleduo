import styled from 'styled-components';

// 最外層 大容器
export const ScanOrderSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
`;

// 掃描器容器
export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: var(--spacing-lg);
`;

// 掃描按鈕
export const ScanButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;
  margin-bottom: var(--spacing-md);

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

// 測試按鈕
export const TestButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

// 狀態訊息
export const StatusMessage = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-align: center;
  margin-top: var(--spacing-md);
`;

// 訂單資訊容器
export const OrderInfoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

// 訂單資訊標題
export const OrderInfoTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--color-gray-700);
`;

// 訂單資訊項目
export const OrderInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訂單資訊標籤
export const OrderInfoLabel = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
`;

// 訂單資訊值
export const OrderInfoValue = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
`;

// 分隔線
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-300);
  margin: var(--spacing-md) 0;
`;

// 處理訂單按鈕
export const ProcessOrderButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md);
  width: 100%;
  font-size: var(--font-size-md);
  cursor: pointer;
  margin-top: var(--spacing-lg);

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

export const TestQRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--color-background-light);
  border-radius: var(--border-radius-md);
`;
