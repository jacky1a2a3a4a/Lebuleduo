import styled from 'styled-components';

// ===詳細列表===
export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// 詳細列表項目
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 標籤
export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// 值
export const Value = styled.span<{ $isOverweight?: boolean }>`
  color: ${({ $isOverweight, theme }) =>
    $isOverweight ? theme.colors.error : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// ===超重警告 容器===
export const OverweightWarning = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
`;

// ===超重警告 標題===
export const WarningTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  display: flex;
  align-items: center;
`;

// 超重警告 標題 圖示
export const IconStyled = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-right: ${({ theme }) => theme.spacing.xs};

  display: flex;
  align-items: center;
`;

// 超重警告 描述
export const WarningDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;
