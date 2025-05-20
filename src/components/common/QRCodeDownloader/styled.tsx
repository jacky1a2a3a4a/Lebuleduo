import styled from 'styled-components';

export const DownloadButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  max-width: 150px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xs} auto;

  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;
