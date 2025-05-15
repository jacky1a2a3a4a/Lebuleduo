import styled from 'styled-components';

export const Container = styled.div`
  padding: var(--spacing-md) var(--spacing-sm);
`;

export const Title = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

export const Section = styled.div`
  margin-bottom: var(--spacing-lg);
`;

export const Divider = styled.div`
  background-color: var(--color-secondary);
  opacity: 0.5;

  width: 100%;
  height: 2px;

  margin: var(--spacing-md) 0;
`;

export const MethodTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`;

export const Description = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
`;

export const Note = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-text-disabled);
  margin-top: var(--spacing-xs);
`;
