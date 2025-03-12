import styled from 'styled-components';
import { useState } from 'react';

const HeaderStyled = styled.header`
  background-color: var(--color-grey-200);
  color: var(--color-grey-700);
  padding: 1.2rem 1.5rem;

  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  justify-content: space-between;
`;

const BurgerButton = styled.button`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: var(--color-grey-700);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) =>
        isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderStyled>
      <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </BurgerButton>
      <h1>Header</h1>
    </HeaderStyled>
  );
}

export default Header;
