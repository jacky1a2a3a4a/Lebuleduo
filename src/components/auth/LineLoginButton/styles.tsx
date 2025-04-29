import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  width: 100%;
  max-width: 200px;
`;

export const RoleText = styled.div`
  color: var(--color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-md);
  letter-spacing: 0.1em;
  font-weight: var(--font-weight-medium);
`;

export const IconStyled = styled.div`
  margin-right: var(--spacing-12);
  font-size: var(--font-size-xs);
`;

export const LineButton = styled.button<{
  $isAnimating: boolean;
  $isExiting: boolean;
}>`
  background: linear-gradient(
    135deg,
    var(--color-green-line-light) 0%,
    var(--color-green-line-0) 100%
  );
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-md) var(--spacing-2xl);
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-round);
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
