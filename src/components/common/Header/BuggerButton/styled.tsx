import styled from 'styled-components';

export const Button = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  z-index: 100;

  &:focus {
    outline: none;
  }

  div {
    background: ${({ $isOpen, theme }) =>
      $isOpen ? theme.colors.primary.main : theme.colors.white};
    width: 1.5rem;
    height: 0.25rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`; 