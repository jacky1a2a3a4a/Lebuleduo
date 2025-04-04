// CustomerHeader.tsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiMiniPlus } from 'react-icons/hi2';

import CommonHeader, { ActionButton } from '../../../common/Header';

// 客戶專用訂閱按鈕
const SubscribeButton = styled(ActionButton)`
  background-color: var(--color-gray-800);
  color: var(--color-gray-0);

  &:hover {
    background-color: var(--color-gray-600);
  }
`;

// 客製化圖標
const StyledPlusIcon = styled(HiMiniPlus)`
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
`;

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
      actionButton={subscribeButtonComponent}
    />
  );
}

export default CustomerHeader;
