import { FaLine } from 'react-icons/fa';
import { IconStyled, LineButton, ButtonContainer, RoleText } from './styles';

interface LineLoginButtonProps {
  onClick: () => void;
  isAnimating?: boolean;
  isExiting?: boolean;
  text?: string;
  role: 'customer' | 'deliver';
}

const LineLoginButton = ({
  onClick,
  isAnimating = false,
  isExiting = false,
  text = 'LINE 登入',
  role,
}: LineLoginButtonProps) => {
  const roleText = role === 'customer' ? '顧客登入' : '汪汪員登入';

  return (
    <ButtonContainer>
      <RoleText>{roleText}</RoleText>
      <LineButton
        onClick={onClick}
        $isAnimating={isAnimating}
        $isExiting={isExiting}
      >
        <IconStyled>
          <FaLine />
        </IconStyled>
        {text}
      </LineButton>
    </ButtonContainer>
  );
};

export default LineLoginButton;
