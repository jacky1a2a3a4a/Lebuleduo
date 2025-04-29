import styled from 'styled-components';

export const ErrorReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: var(--spacing-sm) 0;

  font-size: var(--font-size-xs);
`;

export const ErrorTitle = styled.div`
  color: var(--color-error);
  margin-right: var(--spacing-sm);
`;

export const ErrorMessage = styled.div`
  color: var(--color-error);
`;
