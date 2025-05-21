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
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg} 0 0 ${({ theme }) => theme.borderRadius.lg};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
`;

// Panel Header
export const PanelHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

// 代收員列表標題
export const DeliverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
    color: ${({ theme }) => theme.colors.text.tertiary};
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
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 代收員卡片資訊
export const DeliverInfo = styled.div`
  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  .task-count {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// 輸入框
interface InputProps {
  error?: boolean;
}

// 輸入框
export const StyledInput = styled.input<InputProps>`
  width: 50px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error.main : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.background.primary};
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const DeliverControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
`;

// 加減號按鈕容器
export const QuantityControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

// 加減號按鈕
export const QuantityButton = styled.button`
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[300]};
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
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`;

export const Warning = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
`;

// 平均分配按鈕
export const DistributeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
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
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// 底部按鈕
export const FooterButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  background-color: ${({ theme, $variant }) =>
    $variant === 'outline'
      ? theme.colors.neutral[200]
      : theme.colors.primary.main};
  color: ${({ theme, $variant }) =>
    $variant === 'outline'
      ? theme.colors.text.secondary
      : theme.colors.white};
  border: ${({ theme, $variant }) =>
    $variant === 'outline' ? `1px solid ${theme.colors.text.tertiary}` : 'none'};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === 'outline'
        ? theme.colors.neutral[300]
        : theme.colors.primary.hover};
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
