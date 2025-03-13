import styled from 'styled-components';
import { HiMiniPlus } from 'react-icons/hi2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomerSideBar from './CustomerSideBar';

const HeaderStyled = styled.header`
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);
  padding: 1.2rem 1.5rem;

  display: grid;
  grid-template-columns: auto 1.75fr 1fr;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;

  font-size: var(--font-size-2xl);
  font-weight: 600;

  &:hover {
    color: var(--color-gray-600);
  }
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
    background: var(--color-gray-700);
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

  &:hover div {
    background: var(--color-gray-500);
  }
`;

const StyledIcon = styled(HiMiniPlus)`
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
`;

const SubscribeButton = styled.button`
  background-color: var(--color-gray-800);
  color: var(--color-gray-0);
  font-size: var(--font-size-sm);
  font-weight: 600;

  padding: 0.8rem 0.8rem;
  border-radius: var(--border-radius-round);
  box-shadow:
    var(--shadow-sm),
    inset 0 0.5px 0 0 rgba(255, 255, 255, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;
  transform: translateY(0);
  position: relative;

  &:hover {
    background-color: var(--color-gray-600);
    transform: translateY(-2px);
    box-shadow:
      var(--shadow-sm),
      inset 0 0.5px 0 0 rgba(255, 255, 255, 0.1),
      0 5px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: var(--color-gray-900);
    transform: translateY(2px);
    box-shadow:
      var(--shadow-sm),
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

function CustomerHeader() {
  const navigate = useNavigate();
  // 側邊欄是否開啟(預設不開啟)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderStyled>
      <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </BurgerButton>
      <HeaderTitle onClick={() => navigate('/')}>Lebu-leduo</HeaderTitle>
      <SubscribeButton onClick={() => navigate('/subscribe')}>
        <StyledIcon />
        立即預訂
      </SubscribeButton>
      <CustomerSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </HeaderStyled>
  );
}

export default CustomerHeader;
