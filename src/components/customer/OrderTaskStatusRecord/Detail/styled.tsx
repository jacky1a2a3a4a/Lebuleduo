import styled from 'styled-components';

// ===詳細列表===
export const DetailList = styled.div`
  border-bottom: 1px solid var(--color-neutral-300);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md);
`;

// 詳細列表項目
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
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
