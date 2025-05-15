import styled from 'styled-components';

export const ErrorReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) 0;
  margin: auto;

  font-size: var(--font-size-xs);
`;

export const ErrorTitle = styled.div<{ color?: string }>`
  color: ${(props) => props.color || 'var(--color-error)'};
  margin-right: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export const ErrorMessage = styled.div<{ color?: string }>`
  color: ${(props) => props.color || 'var(--color-error)'};
`;

export const ErrorImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: var(--spacing-sm);
`;
