import styled from 'styled-components';

// 載入中、錯誤訊息
export const StatusMessage = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  line-height: 1.5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 修改日期modal 遮罩
export const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

// ===修改日期modal 大容器===
export const ModalContainer = styled.div<{ $isClosing?: boolean }>`
  background-color: var(--color-white);
  width: 100%;
  max-height: 90vh;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: var(--spacing-md);
  animation: ${({ $isClosing }) => ($isClosing ? 'slideDown' : 'slideUp')} 0.3s
    ease;
  box-shadow: var(--card-shadow);

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

// ===修改日期modal 標題容器===
export const ModalHeader = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 修改日期modal 標題
export const ModalTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-align: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const DateInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-neutral-200);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
`;

export const DateLabel = styled.span`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
`;

export const DateValue = styled.span`
  color: var(--color-tertiary-hover);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// ===日曆===
export const CalendarContainer = styled.div`
  background-color: var(--color-neutral-200);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);

  // 日曆整體圓角
  .react-calendar {
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
  }

  // 選中日期
  .react-calendar__tile--active {
    background-color: var(--color-tertiary);
    color: var(--color-white);
    border-radius: var(--border-radius-lg);
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: var(--color-tertiary-hover);
  }

  // 今天日期
  .react-calendar__tile--now {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--border-radius-lg);
    border: 3px solid var(--color-primary);
  }

  // 原始日期
  .react-calendar__tile.original-date {
    background-color: var(--color-neutral-100);
    border: 3px solid var(--color-tertiary);
    border-radius: var(--border-radius-lg);
    color: var(--color-text-primary);
  }

  // 已預約日期
  .react-calendar__tile.booked-date {
    background-color: var(--color-error);
    color: var(--color-white);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// 注意事項文字
export const NoticeText = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  padding: var(--spacing-md);
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-md);
`;

// 按鈕容器
export const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

export const Button = styled.button`
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const CancelButton = styled(Button)`
  background-color: var(--color-neutral-200);
  color: var(--color-gray-700);

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--color-secondary);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-secondary-hover);
  }

  &:disabled {
    background-color: var(--color-neutral-300);
    color: var(--color-gray-500);
    cursor: not-allowed;
  }
`;
