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
export const Value = styled.span`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;
