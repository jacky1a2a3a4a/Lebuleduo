import styled from 'styled-components';

// ===詳細列表===
export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

// 詳細列表項目
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 標籤
export const Label = styled.span`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
`;

// 值
export const Value = styled.span<{ $isOverweight?: boolean }>`
  color: ${(props) =>
    props.$isOverweight ? 'var(--color-error)' : 'var(--color-text-primary)'};
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// ===超重警告 容器===
export const OverweightWarning = styled.div`
  color: var(--color-error);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
`;

// ===超重警告 標題===
export const WarningTitle = styled.span`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  display: flex;
  align-items: center;
`;

// 超重警告 標題 圖示
export const IconStyled = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-right: var(--spacing-xs);

  display: flex;
  align-items: center;
`;

// 超重警告 描述
// 超重警告 描述
export const WarningDescription = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
`;
