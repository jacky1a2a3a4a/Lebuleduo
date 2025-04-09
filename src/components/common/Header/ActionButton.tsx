import styled from 'styled-components';
import { ReactNode } from 'react';

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button`
  background: none;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-base);
  font-weight: 500;

  &:hover {
    opacity: 0.8;
  }
`;

export function ActionButton({ children, onClick }: ActionButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default ActionButton;
