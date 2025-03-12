import styled from 'styled-components';
import { useState } from 'react';

import Sidebar from './Sidebar';

const HeaderStyled = styled.header`
  background-color: var(--color-grey-200);
  color: var(--color-grey-700);
  padding: 1.2rem 1.5rem;

  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

const BurgerButton = styled.button`
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
    width: 1.5rem;
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
      
    }

    &:nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

function Header() {
  // 側邊欄是否開啟(預設不開啟)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderStyled>
      <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </BurgerButton>
      <HeaderTitle>Lebu-leduo</HeaderTitle>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </HeaderStyled>
  );
}

export default Header;
