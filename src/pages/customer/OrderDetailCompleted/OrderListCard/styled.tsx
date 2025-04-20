import styled from 'styled-components';

type StatusType =
  | 'normal'
  | 'active'
  | 'ongoing'
  | 'arrived'
  | 'abnormal'
  | 'finished';

// === 卡片容器 ===
export const OrderListCardContainer = styled.div<{
  $status: StatusType;
}>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'abnormal':
        return 'var(--color-background-error)';
      case 'active':
      case 'ongoing':
      case 'arrived':
        return 'var(--color-white)';
      case 'finished':
        return 'var(--color-neutral-200)';
      default:
        return 'var(--color-white)';
    }
  }};
  border: ${({ $status }) => {
    switch ($status) {
      case 'abnormal':
        return '1px solid var(--color-error)';
      case 'active':
      case 'ongoing':
      case 'arrived':
        return '1px solid var(--color-primary)';
      case 'normal':
        return '1px solid var(--color-secondary)';
      default:
        return 'none';
    }
  }};
  border-radius: var(--border-radius-lg);
  box-shadow: ${({ $status }) =>
    $status === 'abnormal' ||
    $status === 'active' ||
    $status === 'ongoing' ||
    $status === 'arrived' ||
    $status === 'normal'
      ? 'var(--card-shadow)'
      : 'none'};
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
`;

export const CardItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const DateDisplay = styled.div`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

export const TimeRange = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

export const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
`;

// 訂單狀態文字
export const StatusText = styled.div<{
  $status: StatusType;
}>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'abnormal':
        return 'var(--color-error)';
      case 'active':
        return 'var(--color-tertiary)';
      case 'ongoing':
        return '#1976D2';
      case 'arrived':
        return '#9DDACE';
      case 'finished':
        return 'var(--color-neutral-200)';
      case 'normal':
        return 'var(--color-white)';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'abnormal':
        return 'var(--color-white)';
      case 'active':
        return 'var(--color-text-primary)';
      case 'ongoing':
        return 'var(--color-white)';
      case 'arrived':
        return 'var(--color-text-primary)';
      case 'finished':
        return 'var(--color-neutral-500)';
      case 'normal':
        return 'var(--color-secondary)';
    }
  }};
  border: ${({ $status }) => {
    switch ($status) {
      case 'abnormal':
        return '1px solid none';
      case 'finished':
        return '1px solid var(--color-neutral-500)';
      case 'normal':
        return '1px solid var(--color-secondary)';
      default:
        return 'none';
    }
  }};
  border-radius: var(--border-radius-round);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
`;

// === 修改預約,查看紀錄,查看狀態按鈕 ===
export const ActionButton = styled.button<{
  $status: StatusType;
  $disabled: boolean;
}>`
  background-color: ${({ $status, $disabled }) => {
    if ($disabled) return 'var(--color-neutral-200)';
    switch ($status) {
      case 'finished':
        return 'var(--color-white)';
      case 'abnormal':
        return 'var(--color-white)';
      case 'active':
      case 'ongoing':
      case 'arrived':
        return 'var(--color-white)';
      case 'normal':
        return 'var(--color-primary)';
    }
  }};
  color: ${({ $status, $disabled }) => {
    if ($disabled) return 'var(--color-neutral-500)';
    switch ($status) {
      case 'finished':
        return 'var(--color-neutral-600)';
      case 'abnormal':
        return 'var(--color-error)';
      case 'active':
      case 'ongoing':
      case 'arrived':
        return 'var(--color-primary)';
      case 'normal':
        return 'var(--color-white)';
    }
  }};
  border: ${({ $status, $disabled }) => {
    if ($disabled) return '1px solid var(--color-neutral-400)';
    switch ($status) {
      case 'finished':
        return '1px solid var(--color-neutral-400)';
      case 'abnormal':
        return '1px solid var(--color-error)';
      case 'active':
      case 'ongoing':
      case 'arrived':
        return '1px solid var(--color-primary)';
      case 'normal':
        return 'none';
    }
  }};
  border-radius: var(--border-radius-round);
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  white-space: nowrap;

  pointer-events: ${({ $disabled }) => ($disabled ? 'auto' : 'none')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  transition: all 0.2s ease;
  svg {
    font-size: var(--font-size-md);
  }
`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: var(--spacing-xs);

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const IconStyledLarge = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: var(--spacing-xs);

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ErrorText = styled.div`
  color: var(--color-neutral-500);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-sm);
  padding: 0 var(--spacing-md);
`;
