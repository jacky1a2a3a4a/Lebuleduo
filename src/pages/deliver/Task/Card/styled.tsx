import styled from 'styled-components';
import { TaskStatus } from '../../../../types/deliver';

// 任務卡片外層容器
export const TaskCardWrapper = styled.div<{ $status: TaskStatus }>`
  position: relative;

  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-bottom: 1rem;
`;

// 任務卡片主體
export const TaskCardItem = styled.div<{ $status: TaskStatus }>`
  background: ${(props) =>
    props.$status === 'ongoing'
      ? 'linear-gradient(to bottom, var(--color-white) 0%, #E8ECF7 100%)'
      : props.$status === 'completed'
        ? 'var(--color-gray-100)'
        : 'var(--color-gray-0)'};
  box-shadow: var(--card-shadow);
  border-radius: var(--border-radius-lg);

  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  border: 1px solid
    ${(props) => {
      switch (props.$status) {
        case 'ongoing':
          return 'var(--color-primary)';
        case 'completed':
          return 'var(--color-gray-400)';
        default:
          return 'var(--color-gray-300)';
      }
    }};
`;

// 任務卡片內容區
export const TaskCardContent = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: minmax(60px, 1fr) minmax(180px, 3fr);
  align-items: start;
  gap: 1rem;
`;

// 任務圖片
export const TaskImg = styled.div<{ $photoUrl?: string }>`
  background-color: var(--color-gray-200);
  background-image: ${({ $photoUrl }) =>
    $photoUrl ? `url(${$photoUrl})` : 'none'};
  background-size: cover;
  background-position: center;

  width: 100%;
  aspect-ratio: 3/4;

  border-radius: var(--border-radius-lg);
`;

// 任務詳細資訊容器
export const TaskDetailContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// 任務卡片標題區
export const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.25rem;

  margin-bottom: var(--spacing-xs);
`;

// 任務標題
export const TaskTitle = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: 600;
`;

// 任務狀態標籤
export const TaskTag = styled.div<{ $status: TaskStatus }>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'ongoing':
        return 'var(--color-primary)';
      case 'completed':
        return 'var(--color-secondary)';
      default:
        return 'var(--color-tertiary)';
    }
  }};
  color: ${({ $status }) =>
    $status === 'ongoing' ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};
  border-radius: var(--border-radius-round);

  padding: 0.25rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
`;

// 任務地址+姓名容器
export const TaskUserContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const MainContent = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
  text-decoration: underline;
`;

export const SubContent = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
`;

export const TertiaryContent = styled.div`
  color: var(--color-text-disabled);
  font-size: var(--font-size-xs);
`;

// 任務卡片按鈕容器
export const TaskCardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

// 任務卡片按鈕
export const TaskCardButton = styled.button<{
  $styledType?: 'primary' | 'secondary';
  $disabled?: boolean;
}>`
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-round);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xs);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  // 訂單詳情按鈕
  &:first-child {
    background-color: var(--color-gray-0);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    flex: 1;

    &:hover {
      background-color: ${({ $disabled }) =>
        !$disabled && 'var(--color-gray-100)'};
    }
  }

  // 確認前往/取消前往 按鈕
  &:last-child {
    background-color: ${({ $styledType }) =>
      $styledType === 'secondary'
        ? 'var(--color-error)'
        : 'var(--color-primary)'};
    color: ${({ $styledType }) =>
      $styledType === 'secondary'
        ? 'var(--color-white)'
        : 'var(--color-white)'};
    flex: 1.5;
    border: ${({ $styledType }) =>
      $styledType === 'secondary'
        ? '1px solid var(--color-error-hover)'
        : 'none'};

    svg {
      color: ${({ $styledType }) =>
        $styledType === 'secondary' ? 'var(--color-error-hover)' : 'inherit'};
    }

    &:hover {
      background-color: ${({ $disabled, $styledType }) =>
        !$disabled &&
        ($styledType === 'secondary'
          ? 'var(--color-error-hover)'
          : 'var(--color-primary-hover)')};
    }
  }
`;
