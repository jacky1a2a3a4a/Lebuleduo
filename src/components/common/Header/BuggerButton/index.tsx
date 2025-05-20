import { useState } from 'react';
import SideBar from '../SideBar';
import { Button } from './styled';

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
