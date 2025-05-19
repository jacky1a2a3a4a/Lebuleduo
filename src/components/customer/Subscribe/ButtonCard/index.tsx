import { StyledProps } from '../../../../pages/customer/Subscribe/types';
import {
  ButtonCardContainer,
  ButtonCardContent,
  ButtonCardTitle,
  ButtonCardSubtitle,
  ButtonCardRadio,
} from './styled';

interface ButtonCardProps extends StyledProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  $active?: boolean;
}

const ButtonCard = ({
  title,
  subtitle,
  $active = false,
  onClick,
  children,
}: ButtonCardProps) => {
  return (
    <ButtonCardContainer $active={$active} onClick={onClick}>
      <ButtonCardRadio $active={$active} />
      <ButtonCardContent>
        <ButtonCardTitle>{title}</ButtonCardTitle>
        <ButtonCardSubtitle>{subtitle}</ButtonCardSubtitle>
      </ButtonCardContent>
      {children}
    </ButtonCardContainer>
  );
};

export default ButtonCard;
