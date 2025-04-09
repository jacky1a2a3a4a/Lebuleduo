// CustomerHeader.tsx
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiMiniPlus } from 'react-icons/hi2';

import CommonHeader from '../../../common/Header';

// 客戶專用訂閱按鈕
const SubscribeButton = styled.button`
  background-color: var(--color-gray-800);
  color: var(--color-gray-0);
  padding: 0.8rem 0.8rem;
  border-radius: var(--border-radius-round);
  box-shadow: var(--btn-shadow);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-600);
    transform: translateY(-2px);
    box-shadow: var(--btn-shadow-hover);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 客製化圖標
const StyledPlusIcon = styled(HiMiniPlus)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

/**
 * 顧客專用頁首
 * 包含訂閱按鈕
 */
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
