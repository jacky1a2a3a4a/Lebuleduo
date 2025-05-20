import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  max-width: 200px;
`;

export const RoleText = styled.div`
  color: ${({ theme }) => theme.colors.secondary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  letter-spacing: 0.1em;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const IconStyled = styled.div`
  margin-right: ${({ theme }) => theme.spacing[12]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const LineButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.greenLine.light} 0%,
    ${({ theme }) => theme.colors.greenLine[0]} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $isExiting }) =>
    $isExiting ? 'translateY(-10px)' : 'translateY(0)'};
  opacity: ${({ $isExiting }) => ($isExiting ? '0' : '1')};
  box-shadow: 0 4px 6px rgba(0, 200, 83, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 200, 83, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;
