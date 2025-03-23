import styled from 'styled-components';
import { TaskStatus } from './index';

// 任務卡片外層容器
export const TaskCardWrapper = styled.div<{
  status: TaskStatus;
  disabled?: boolean;
}>`
  opacity: ${({ status, disabled }) =>
    status === 'waiting' && disabled ? 0.6 : 1};

  position: relative;

  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-bottom: 1rem;
`;

// 任務卡片主體
export const TaskCardItem = styled.div<{ status: TaskStatus }>`
  background-color: ${(props) =>
    props.status === 'completed'
      ? 'var(--color-gray-100)'
      : 'var(--color-gray-0)'};

  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  border: 1.5px solid
    ${(props) => {
      switch (props.status) {
        case 'ongoing':
          return 'var(--color-gray-700)';
        case 'completed':
          return 'var(--color-gray-400)';
        default:
          return 'var(--color-gray-300)';
      }
    }};
  border-radius: var(--border-radius-lg);
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
export const TaskImg = styled.div`
  background-color: var(--color-gray-200);

  width: 100%;
  aspect-ratio: 1/1;

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
  gap: 0.25rem;
`;

// 任務標題
export const TaskTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

// 任務狀態標籤
export const TaskTag = styled.div<{ status: TaskStatus }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'ongoing':
        return 'var(--color-gray-700)';
      case 'completed':
        return 'var(--color-gray-400)';
      default:
        return 'var(--color-gray-200)';
    }
  }};
  color: ${({ status }) =>
    status === 'ongoing' ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};

  padding: 0.25rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius-round);
`;

// 任務地址
export const TaskAddress = styled.div`
  margin-top: 0.25rem;

  font-size: 0.875rem;
  font-weight: 400;
`;

// 任務用戶
export const TaskUser = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

// 任務卡片按鈕容器
export const TaskCardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

// 任務卡片按鈕
export const TaskCardButton = styled.button<{
  styledType?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  padding: 0.75rem 1rem;

  border: none;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);

    flex: 1;

    &:hover {
      background-color: ${({ disabled }) =>
        !disabled && 'var(--color-gray-300)'};
    }
  }

  &:last-child {
    background-color: ${({ styledType }) =>
      styledType === 'primary'
        ? 'var(--color-gray-700)'
        : 'var(--color-gray-200)'};
    color: ${({ styledType }) =>
      styledType === 'primary'
        ? 'var(--color-gray-0)'
        : 'var(--color-gray-600)'};

    flex: 2;

    &:hover {
      background-color: ${({ disabled, styledType }) =>
        !disabled &&
        (styledType === 'primary'
          ? 'var(--color-gray-800)'
          : 'var(--color-gray-300)')};
    }
  }
`;
