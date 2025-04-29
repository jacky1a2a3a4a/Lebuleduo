import Loginlogo from '../../../assets/images/Lebuledou_truck_login_border.png';
import LogotypeCustomer from '../../../assets/logos/logotype-customer-white.png';
import { Logo, WelcomeText, LogoType, TextSub } from './styles';

interface LogoProps {
  type?: 'customer' | 'deliver';
}

const AuthLogo = ({ type = 'customer' }: LogoProps) => {
  return (
    <>
      <Logo src={Loginlogo} />
      <WelcomeText>
        <LogoType src={LogotypeCustomer} alt="Lebu-ledou" />
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
