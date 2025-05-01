import LoginTruck from '../../../assets/images/Lebuledou_truck_login_border.png';
import LogotypeCustomer from '../../../assets/logos/logotype-customer-white.png';
import LogotypeDeliver from '../../../assets/logos/logotype-deliver-white.png';

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
