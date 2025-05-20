import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  transition: border-color 0.2s ease;
  cursor: pointer;
`;

export const DateDisplay = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const IconStyled = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  padding: ${({ theme }) => theme.spacing.sm};
`;
