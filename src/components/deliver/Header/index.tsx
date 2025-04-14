import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiBell } from 'react-icons/hi2';

import CommonHeader from '../../common/Header';

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
      actionButton={notificationButton}
    />
  );
}

export default DeliverHeader;
