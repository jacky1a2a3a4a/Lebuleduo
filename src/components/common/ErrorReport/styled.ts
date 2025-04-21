import styled from 'styled-components';

export const ErrorReportContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
`;

export const ErrorTitle = styled.div`
  color: var(--color-error);
  margin-right: var(--spacing-sm);
`;

export const ErrorMessage = styled.div`
  color: var(--color-text-secondary);
`;
