import styled from 'styled-components';

// ===最外層容器===
export const OrderTaskStatusCardContainer = styled.div<{
  $status: string;
  $isOverweight?: boolean;
}>`
  background-color: ${(props) =>
    props.$isOverweight
      ? 'var(--color-background-error)'
      : 'var(--color-white)'};
  border: ${(props) =>
    props.$isOverweight
      ? '1px solid var(--color-error)'
      : '1px solid var(--color-neutral-200)'};
  border-radius: var(--border-radius-xl);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
`;

// ===卡片內容區塊===
export const CardItem = styled.div`
  display: flex;
  align-items: center;
`;

// ===卡片內容區塊===
export const IconStyledLarge = styled.div`
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-md);

  font-size: var(--font-size-lg);
`;

// ===日期區塊===
export const Date = styled.div`
  color: var(--color-text-primary);

  display: flex;
  flex-direction: column;
`;

// 日期
export const DateDisplay = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//時間範圍
export const TimeRange = styled.span`
  font-size: var(--font-size-sm);
`;
