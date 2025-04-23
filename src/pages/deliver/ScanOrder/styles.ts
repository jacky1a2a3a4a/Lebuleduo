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
