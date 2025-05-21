import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../common/Header';
import logo from '../../../assets/logos/logo-deliver-white.png';
import { BellContainer, BellIcon } from './styled';

//外送員專用頁首 包含鈴鐺通知圖標
function DeliverHeader() {
  const navigate = useNavigate();

  // 通知按鈕
  const notificationButton = (
    <BellContainer>
      <BellIcon onClick={() => navigate('notifications')} />
    </BellContainer>
  );

  return (
    <CommonHeader
      title="Lebu-Dog"
      titlePath="/deliver"
      titleImage={logo}
      actionButton={notificationButton}
      imageHeight="27px"
    />
  );
}

export default DeliverHeader;
