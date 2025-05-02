import styled from 'styled-components';

// Panel Container
export const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
`;

// Panel Header
export const PanelHeader = styled.div`
  border-bottom: 1px solid var(--color-neutral-300);
  padding-bottom: var(--spacing-sm);
  h2 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
  }
`;

// 代收員列表標題
export const DeliverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
  }

  p {
    font-size: var(--font-size-3xs);
    color: var(--color-text-tertiary);
  }
`;

// Panel Content
export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

// Deliver List Container
export const DeliverListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// Deliver Item
export const DeliverItem = styled.div`
  background-color: var(--color-neutral-200);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-xl);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

// 代收員卡片資訊
export const DeliverInfo = styled.div`
  p {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
  }

  span {
    font-size: var(--font-size-2xs);
    color: var(--color-text-tertiary);
  }

  .task-count {
    color: var(--color-text-primary);
  }
`;

// 輸入框
interface InputProps {
  error?: boolean;
}

// 輸入框
export const StyledInput = styled.input<InputProps>`
  width: 50px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid
    ${(props) => (props.error ? 'var(--color-error)' : 'var(--color-border)')};
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  transition: all 0.2s;
  background-color: var(--color-background-primary);
  text-align: center;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

export const DeliverControls = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
`;

// 加減號按鈕容器
export const QuantityControls = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
`;

// 加減號按鈕
export const QuantityButton = styled.button`
  background-color: var(--color-neutral-200);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-text-secondary);
  border-radius: var(--border-radius-round);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-neutral-300);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 已選取任務提示
export const PanelText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  p {
    font-size: var(--font-size-xs);
  }
`;

export const Warning = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-2xs);
`;

// 平均分配按鈕
export const DistributeButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-2xs);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Panel Footer
export const PanelFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
`;

// 底部按鈕
export const FooterButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  background-color: ${({ $variant }) =>
    $variant === 'outline'
      ? 'var(--color-neutral-200)'
      : 'var(--color-primary)'};
  color: ${({ $variant }) =>
    $variant === 'outline'
      ? 'var(--color-text-secondary)'
      : 'var(--color-white)'};
  border: ${({ $variant }) =>
    $variant === 'outline' ? '1px solid var(--color-text-tertiary)' : 'none'};
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-2xs);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === 'outline'
        ? 'var(--color-neutral-300)'
        : 'var(--color-primary-hover)'};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
