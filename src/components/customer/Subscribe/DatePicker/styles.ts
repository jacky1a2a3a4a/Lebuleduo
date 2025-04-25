import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-lg);

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);

  transition: border-color 0.2s ease;
  cursor: pointer;
`;

export const DateDisplay = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm);
`;

export const IconStyled = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-lg);
  padding: var(--spacing-sm);
`;
