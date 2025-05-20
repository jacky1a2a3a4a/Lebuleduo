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
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'abnormal':
        return theme.colors.error.background;
      case 'active':
      case 'ongoing':
      case 'arrived':
        return theme.colors.white;
      case 'finished':
        return theme.colors.neutral[200];
      default:
        return theme.colors.white;
    }
  }};
  border: ${({ $status, theme }) => {
    switch ($status) {
      case 'abnormal':
        return `1px solid ${theme.colors.error.main}`;
      case 'active':
      case 'ongoing':
      case 'arrived':
        return `1px solid ${theme.colors.primary.main}`;
      case 'normal':
        return `1px solid ${theme.colors.secondary.main}`;
      default:
        return 'none';
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ $status, theme }) =>
    $status === 'abnormal' ||
    $status === 'active' ||
    $status === 'ongoing' ||
    $status === 'arrived' ||
    $status === 'normal'
      ? theme.shadows.card
      : 'none'};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CardItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DateDisplay = styled.div`
  color: ${({ theme }) => theme.colors.gray[800]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const TimeRange = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

export const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

// 訂單狀態文字
export const StatusText = styled.div<{
  $status: StatusType;
}>`
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'abnormal':
        return theme.colors.error.main;
      case 'active':
        return theme.colors.tertiary.main;
      case 'ongoing':
        return '#1976D2';
      case 'arrived':
        return '#9DDACE';
      case 'finished':
        return theme.colors.neutral[200];
      case 'normal':
        return theme.colors.white;
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'abnormal':
        return theme.colors.white;
      case 'active':
        return theme.colors.text.primary;
      case 'ongoing':
        return theme.colors.white;
      case 'arrived':
        return theme.colors.text.primary;
      case 'finished':
        return theme.colors.neutral[500];
      case 'normal':
        return theme.colors.secondary.main;
    }
  }};
  border: ${({ $status, theme }) => {
    switch ($status) {
      case 'abnormal':
        return '1px solid none';
      case 'finished':
        return `1px solid ${theme.colors.neutral[500]}`;
      case 'normal':
        return `1px solid ${theme.colors.secondary.main}`;
      default:
        return 'none';
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

// === 修改預約,查看紀錄,查看狀態按鈕 ===
export const ActionButton = styled.button<{
  $status: StatusType;
  $disabled: boolean;
}>`
  background-color: ${({ $status, $disabled, theme }) => {
    if ($disabled) return theme.colors.neutral[200];
    switch ($status) {
      case 'finished':
        return theme.colors.white;
      case 'abnormal':
        return theme.colors.white;
      case 'active':
      case 'ongoing':
      case 'arrived':
        return theme.colors.white;
      case 'normal':
        return theme.colors.primary.main;
    }
  }};
  color: ${({ $status, $disabled, theme }) => {
    if ($disabled) return theme.colors.neutral[500];
    switch ($status) {
      case 'finished':
        return theme.colors.neutral[600];
      case 'abnormal':
        return theme.colors.error.main;
      case 'active':
      case 'ongoing':
      case 'arrived':
        return theme.colors.primary.main;
      case 'normal':
        return theme.colors.white;
    }
  }};
  border: ${({ $status, $disabled, theme }) => {
    if ($disabled) return `1px solid ${theme.colors.neutral[400]}`;
    switch ($status) {
      case 'finished':
        return `1px solid ${theme.colors.neutral[400]}`;
      case 'abnormal':
        return `1px solid ${theme.colors.error.main}`;
      case 'active':
      case 'ongoing':
      case 'arrived':
        return `1px solid ${theme.colors.primary.main}`;
      case 'normal':
        return 'none';
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  svg {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
  }
`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: ${({ theme }) => theme.spacing.xs};

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const IconStyledLarge = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: ${({ theme }) => theme.spacing.xs};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
`; 