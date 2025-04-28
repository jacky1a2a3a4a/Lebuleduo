import styled from 'styled-components';

export const StatCardContainer = styled.div`
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-neutral-200);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);

  width: 100%;
  height: 100%;

  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
`;

export const Icon = styled.div`
  background-color: var(--color-secondary);
  color: var(--color-white);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  aspect-ratio: 1/1;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-3xs);
  font-weight: var(--font-weight-medium);
`;

export const Numbers = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Value = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
`;

export const Subtitle = styled.div`
  font-size: var(--font-size-3xs);
  color: var(--color-neutral-500);
`;
