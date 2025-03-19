import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiBell } from 'react-icons/hi2';

import CommonHeader, { ActionButton } from '../../../common/Header';

// 送貨員專用通知按鈕
const NotificationButton = styled(ActionButton)`
  color: var(--color-gray-800);

  &:hover {
    background-color: var(--color-gray-600);
    color: var(--color-gray-0);
  }
`;

// 客製化圖標
const StyledBellIcon = styled(HiBell)`
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
`;

function DeliverHeader() {
  const navigate = useNavigate();

  // 通知按鈕
  const notificationButtonComponent = (
    <NotificationButton onClick={() => navigate('notifications')}>
      <StyledBellIcon />
    </NotificationButton>
  );

  return (
    <CommonHeader
      title="Lebu-Dog"
      titlePath="/deliver"
      actionButton={notificationButtonComponent}
    />
  );
}

export default DeliverHeader;
