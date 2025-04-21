import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiMiniPlus } from 'react-icons/hi2';
import logo from '../../../assets/logotype/logotype-customer-white.png';

import CommonHeader, { ActionButton } from '../../common/Header';

// 客戶專用訂閱按鈕
const SubscribeButton = styled(ActionButton)`
  background-color: var(--color-tertiary);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-round);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  width: 100%;
  padding: var(--spacing-sm);

  transition: all 0.2s ease-in-out;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  &:hover {
    background-color: var(--color-tertiary-hover);
    transform: translateY(-1px);
  }
`;

// 客製化圖標
const StyledPlusIcon = styled(HiMiniPlus)`
  width: 1.2rem;
  height: 100%;

  font-size: var(--font-size-slg);
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
      titleImage={logo}
      actionButton={subscribeButtonComponent}
    />
  );
}

export default CustomerHeader;
