import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: var(--spacing-lg) auto;
  padding: var(--spacing-lg);
  margin: auto var(--spacing-md);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background-primary);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const Input = styled.input`
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-neutral-300);
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: -1px;
  }

  &::placeholder {
    color: var(--color-text-disabled);
  }
`;

export const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
`;
