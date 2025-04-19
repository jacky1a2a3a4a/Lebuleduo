import styled from 'styled-components';

export const Container = styled.div`
  border-top: 1px solid var(--color-neutral-300);
  margin-top: var(--spacing-md);
  padding: var(--spacing-md) 0 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

export const Amount = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
`;
