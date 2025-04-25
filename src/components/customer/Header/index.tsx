import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logos/logotype-customer-white.png';
import CommonHeader from '../../common/Header';
import { SubscribeButton, StyledPlusIcon } from './styles';

function CustomerHeader() {
  const navigate = useNavigate();

  // 訂閱按鈕
  const subscribeButtonComponent = (
    <SubscribeButton onClick={() => navigate('subscribe')}>
      <StyledPlusIcon />
      立即預訂
    </SubscribeButton>
  );

  return (
    <CommonHeader
      title="Lebu-leduo"
      titlePath="/customer"
      titleImage={logo}
      actionButton={subscribeButtonComponent}
    />
  );
}

export default CustomerHeader;
