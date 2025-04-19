import styled from 'styled-components';

// ===最外層大容器===
export const StatusContainer = styled.div`
  border-top: 1px solid var(--color-neutral-300);
  padding: var(--spacing-md) var(--spacing-md) 0;
  margin-top: var(--spacing-md);
  width: 100%;
`;

// ===步驟列表===
export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const StatusItem = styled.div`
  display: flex;
  position: relative;
`;

// ===進度條容器===
export const StatusProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

// 圓點
export const StatusDot = styled.div<{ $isCompleted: boolean }>`
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? 'var(--color-primary)' : 'var(--color-white)'};
  color: var(--color-white);
  border: 2px solid
    ${({ $isCompleted }) =>
      $isCompleted ? 'var(--color-primary)' : 'var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xs);
  flex-shrink: 0;
`;

// 線條
export const StatusLine = styled.div<{ $isCompleted: boolean }>`
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? 'var(--color-primary)' : 'var(--color-neutral-300)'};

  width: 2px;
  height: 30px;
`;

export const StatusContent = styled.div`
  margin-left: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
`;

// 步驟標題
export const StatusTitle = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 步驟時間
export const StatusTime = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
`;
