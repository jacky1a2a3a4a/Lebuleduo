import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 最外層 大容器
const ScanOrderSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TestButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

function ScanOrder() {
  const navigate = useNavigate();

  // 模擬掃描 QR Code 成功
  const handleScanSuccess = () => {
    // 這裡可以模擬掃描到的訂單 ID
    const scannedOrderId = '4'; // 使用一個已存在的訂單 ID
    navigate(`/deliver/task/${scannedOrderId}/process-order`);
  };

  return (
    <ScanOrderSectionStyled>
      <TestButton onClick={handleScanSuccess}>模擬掃描成功</TestButton>
    </ScanOrderSectionStyled>
  );
}

export default ScanOrder;
