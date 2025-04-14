import { useState } from 'react';
import styled from 'styled-components';

import SideBar from '../SideBar';

const Button = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: var(--spacing-md);
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    background: ${({ $isOpen }) =>
      $isOpen ? 'var(--color-text-primary)' : 'var(--color-white)'};
    width: 1.5rem;
    height: 0.25rem;
    border-radius: 10px;
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

function BurgerButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </Button>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default BurgerButton;
