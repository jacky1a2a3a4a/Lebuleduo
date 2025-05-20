import styled from 'styled-components';

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const OrderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral[400]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[300]};
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-4px);
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transform: translateY(-2px) scale(0.98);
  }
`; 