import styled from 'styled-components';

export const NavHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0 auto;
`;

export const BackButton = styled.button`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  svg {
    margin-top: 2px;
  }
`;

export const PageTitle = styled.div``;

export const OrderID = styled.div`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;
