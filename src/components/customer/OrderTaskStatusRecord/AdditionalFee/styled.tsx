import styled from 'styled-components';

// ===最外層容器===
export const Container = styled.div`
  border-top: 1px solid var(--color-neutral-300);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  padding-top: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

// ===計數區塊===
export const CountSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 標題
export const Title = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin: 0;
`;

// 金額
export const Amount = styled.span`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-error);
`;

// ===按鈕區塊===
export const ButtonsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
`;

// 按鈕
export const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    background-color: var(--color-neutral-200);
    color: var(--color-text-tertiary);
    border: 1px solid var(--color-neutral-300);
  }

  &:last-child {
    background-color: var(--color-error);
    color: var(--color-white);
    border: none;
  }
`;
