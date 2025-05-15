import LoginTruck from '../../../assets/images/img-Lebuledou-truck-login-border.png';
import LogotypeCustomer from '../../../assets/logos/logo-customer-white.png';
import LogotypeDeliver from '../../../assets/logos/logo-deliver-white.png';

import { Logo, WelcomeText, LogoType, TextSub } from './styles';

interface LogoProps {
  type?: 'customer' | 'deliver';
}

const AuthLogo = ({ type = 'customer' }: LogoProps) => {
  const getLogotype = () => {
    switch (type) {
      case 'customer':
        return LogotypeCustomer;
      case 'deliver':
        return LogotypeDeliver;
      default:
        return LogotypeCustomer;
    }
  };

  return (
    <>
      <Logo src={LoginTruck} />
      <WelcomeText>
        <LogoType src={getLogotype()} alt="Lebu-ledou" />
        <TextSub>
          <span>垃</span>
          <span>不</span>
          <span>垃</span>
          <span>多</span>
        </TextSub>
      </WelcomeText>
    </>
  );
};

export default AuthLogo;
