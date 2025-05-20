import styled from 'styled-components';

export const StatusHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const StatusText = styled.span`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;
