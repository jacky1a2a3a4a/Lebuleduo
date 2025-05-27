import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const MockPaymentContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const PaymentInfo = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
`;

const Button = styled.button`
  background: #06C755;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #05a548;
  }
`;

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    orderId: '',
    amount: 0,
    status: 'pending'
  });

  useEffect(() => {
    // 從 URL 參數中獲取訂單資訊
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    
    if (orderId && amount) {
      setPaymentInfo({
        orderId,
        amount: Number(amount),
        status: 'pending'
      });
    }
  }, [searchParams]);

  const handlePaymentSuccess = () => {
    // 模擬付款成功
    setPaymentInfo(prev => ({ ...prev, status: 'success' }));
    
    // 3秒後跳轉到成功頁面
    setTimeout(() => {
      navigate('/customer/subscribe-success');
    }, 3000);
  };

  const handlePaymentCancel = () => {
    // 模擬取消付款
    setPaymentInfo(prev => ({ ...prev, status: 'cancelled' }));
    
    // 3秒後跳轉回訂單頁面
    setTimeout(() => {
      navigate('/customer/subscribe-checkout');
    }, 3000);
  };

  return (
    <MockPaymentContainer>
      <h1>模擬付款頁面</h1>
      <PaymentInfo>
        <h2>訂單資訊</h2>
        <p>訂單編號：{paymentInfo.orderId}</p>
        <p>付款金額：NT$ {paymentInfo.amount}</p>
        <p>付款狀態：{paymentInfo.status}</p>
      </PaymentInfo>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={handlePaymentSuccess}>
          模擬付款成功
        </Button>
        <Button 
          onClick={handlePaymentCancel}
          style={{ background: '#ff4d4f' }}
        >
          模擬取消付款
        </Button>
      </div>
    </MockPaymentContainer>
  );
};

export default MockPayment; 