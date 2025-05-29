import styled from 'styled-components';

export const ErrorReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  margin: auto;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const ErrorTitle = styled.div<{ color?: string }>`
  color: ${({ color, theme }) => color || theme.colors.error.main};
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const ErrorMessage = styled.div<{ color?: string }>`
  color: ${({ color, theme }) => color || theme.colors.error.main};
`;

export const ErrorImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
