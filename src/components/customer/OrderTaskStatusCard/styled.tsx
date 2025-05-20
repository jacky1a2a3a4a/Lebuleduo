import styled from 'styled-components';

// ===最外層容器===
export const OrderTaskStatusCardContainer = styled.div<{
  $status: string;
  $isOverweight?: boolean;
}>`
  background-color: ${({ $isOverweight, theme }) =>
    $isOverweight
      ? theme.colors.error.background
      : theme.colors.white};
  border: ${({ $isOverweight, theme }) =>
    $isOverweight
      ? `1px solid ${theme.colors.error.main}`
      : `1px solid ${theme.colors.neutral[200]}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

// ===卡片內容區塊===
export const CardItem = styled.div`
  display: flex;
  align-items: center;
`;

// ===卡片內容區塊===
export const IconStyledLarge = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};

  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

// ===日期區塊===
export const Date = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};

  display: flex;
  flex-direction: column;
`;

// 日期
export const DateDisplay = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

//時間範圍
export const TimeRange = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;
