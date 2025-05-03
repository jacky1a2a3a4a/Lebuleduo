import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiBell } from 'react-icons/hi2';

import CommonHeader from '../../common/Header';
import logo from '../../../assets/logos/logotype-deliver-white.png';

// 鈴鐺容器，控制位置
const BellContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

// 鈴鐺圖標按鈕
const BellIcon = styled(HiBell)`
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-tertiary);
  cursor: pointer;
  pointer-events: none;

  &:hover {
    color: var(--color-tertiary-hover);
  }
`;

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
