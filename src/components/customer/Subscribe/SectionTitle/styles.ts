import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
`;

export const SectionMainTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`;

export const SectionSubtitle = styled.p`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
`;
