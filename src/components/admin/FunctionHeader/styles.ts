import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: var(--spacing-xs);
  
  .date-picker {
    input {
      padding: var(--spacing-sm);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--border-radius-sm);
      outline: none;

      font-size: var(--font-size-2xs);
    }
  }
`;
