import styled from 'styled-components';

export const Button = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  color: var(--color-white);
  border-radius: var(--border-radius-round);

  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  text-align: center;
  cursor: ${(props) => (props.$active ? 'pointer' : 'not-allowed')};
  
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-primary-hover)' : 'var(--color-gray-400)'};
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;
