import React from 'react';
import { Button } from './styles';

interface SubscribeNextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  $active?: boolean;
}

const SubscribeNextButton = ({
  onClick,
  disabled = false,
  children,
  $active = false,
}: SubscribeNextButtonProps) => {
  return (
    <Button onClick={onClick} disabled={disabled} $active={$active}>
      {children}
    </Button>
  );
};

export default SubscribeNextButton;
