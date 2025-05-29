import styled from 'styled-components';

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const ResultContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const ResultTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ResultSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ResultIcon = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StyledButton = styled.button<{ $isPrimary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, $isPrimary }) => 
    $isPrimary ? theme.colors.primary.main : theme.colors.gray[300]};
  
  background-color: ${({ theme, $isPrimary }) => 
    $isPrimary ? theme.colors.primary.main : theme.colors.white};
  color: ${({ theme, $isPrimary }) => 
    $isPrimary ? theme.colors.white : theme.colors.text.primary};
  
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme, $isPrimary }) => 
      $isPrimary ? theme.colors.primary.hover : theme.colors.gray[100]};
    border-color: ${({ theme, $isPrimary }) => 
      $isPrimary ? theme.colors.primary.hover : theme.colors.gray[400]};
  }

  &:active {
    transform: scale(0.98);
  }
`; 