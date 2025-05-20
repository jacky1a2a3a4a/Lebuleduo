import styled from 'styled-components';
import { TaskStatus } from '../../../types/deliver/TaskStatus';

// 任務卡片外層容器
export const TaskCardWrapper = styled.div<{ $status: TaskStatus }>`
  position: relative;
  width: 100%;
  max-width: calc(${({ theme }) => theme.breakpoints.mobile} - 2rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 任務卡片主體
export const TaskCardItem = styled.div<{ $status: TaskStatus }>`
  background: ${({ $status, theme }) =>
    $status === 'ongoing'
      ? 'linear-gradient(to bottom, var(--color-white) 0%, #E8ECF7 100%)'
      : $status === 'completed'
        ? theme.colors.gray[100]
        : theme.colors.gray[0]};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ $status, theme }) => {
      switch ($status) {
        case 'ongoing':
          return theme.colors.primary.main;
        case 'completed':
          return theme.colors.gray[400];
        default:
          return theme.colors.gray[300];
      }
    }};
`;

// 任務卡片內容區
export const TaskCardContent = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: minmax(60px, 1fr) minmax(180px, 3fr);
  align-items: start;
  gap: ${({ theme }) => theme.spacing.md};
`;

// 任務圖片
export const TaskImg = styled.div<{ $photoUrl?: string }>`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  background-image: ${({ $photoUrl }) =>
    $photoUrl ? `url(${$photoUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

// 任務詳細資訊容器
export const TaskDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// 任務卡片標題區
export const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing['2xs']};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// 任務標題
export const TaskTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

// 任務狀態標籤
export const TaskTag = styled.div<{ $status: TaskStatus }>`
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'ongoing':
        return theme.colors.primary.main;
      case 'completed':
        return theme.colors.secondary.main;
      default:
        return theme.colors.tertiary.main;
    }
  }};
  color: ${({ $status, theme }) =>
    $status === 'ongoing' ? theme.colors.gray[0] : theme.colors.gray[600]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => `${theme.spacing['2xs']} ${theme.spacing.xs}`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

// 任務地址+姓名容器
export const TaskUserContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MainContent = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-decoration: underline;
`;

export const SubContent = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const TertiaryContent = styled.div`
  color: ${({ theme }) => theme.colors.text.disabled};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

// 任務卡片按鈕容器
export const TaskCardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

// 任務卡片按鈕
export const TaskCardButton = styled.button<{
  $styledType?: 'primary' | 'secondary';
  $disabled?: boolean;
}>`
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  // 訂單詳情按鈕
  &:first-child {
    background-color: ${({ theme }) => theme.colors.gray[0]};
    color: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    flex: 1;

    &:hover {
      background-color: ${({ $disabled, theme }) =>
        !$disabled && theme.colors.gray[100]};
    }
  }

  // 確認前往/取消前往 按鈕
  &:last-child {
    background-color: ${({ $styledType, theme }) =>
      $styledType === 'secondary'
        ? theme.colors.error.main
        : theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};
    flex: 1.5;
    border: ${({ $styledType, theme }) =>
      $styledType === 'secondary'
        ? `1px solid ${theme.colors.error.hover}`
        : 'none'};

    svg {
      color: ${({ $styledType, theme }) =>
        $styledType === 'secondary' ? theme.colors.error.hover : 'inherit'};
    }

    &:hover {
      background-color: ${({ $disabled, $styledType, theme }) =>
        !$disabled &&
        ($styledType === 'secondary'
          ? theme.colors.error.hover
          : theme.colors.primary.hover)};
    }
  }
`;
