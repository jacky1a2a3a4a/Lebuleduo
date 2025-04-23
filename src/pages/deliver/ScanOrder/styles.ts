import styled from 'styled-components';

// 最外層 大容器
export const ScanOrderSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  min-height: 100vh;
  background-color: var(--color-background);
`;

// 掃描器容器
export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: var(--spacing-lg);
  position: relative;
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
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--color-error);
  font-size: var(--font-size-sm);
`;

// 訂單資訊容器
export const OrderInfoContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: var(--spacing-lg);
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--box-shadow-md);
`;

// 訂單資訊標題
export const OrderInfoTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  text-align: center;
`;

// 訂單資訊項目
export const OrderInfoItem = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 訂單資訊標籤
export const OrderInfoLabel = styled.span`
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

// 訂單資訊值
export const OrderInfoValue = styled.span`
  display: block;
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
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
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;
