import styled from 'styled-components';

// ===最外層大容器===
export const StatusContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} 0;
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

// ===步驟列表===
export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
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
  background-color: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.primary.main : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid
    ${({ $isCompleted, theme }) =>
      $isCompleted ? theme.colors.primary.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  width: 25px;
  height: 25px;
  min-width: 25px;
  min-height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

// 線條
export const StatusLine = styled.div<{ $isCompleted: boolean }>`
  background-color: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.primary.main : theme.colors.neutral[300]};

  width: 2px;
  height: 30px;
`;

export const StatusContent = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

// 步驟標題
export const StatusTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 步驟時間
export const StatusTime = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;
