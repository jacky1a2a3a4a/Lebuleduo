import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubscribeProgressSteps from '../../../components/customer/SubscribeProgressSteps';
import {
  Container,
  Title,
  Section,
  SectionTitle,
  SubscriptionInfo,
  PaymentMethod,
  PaymentMethodItem,
  CheckoutButton,
} from './styled';

const steps = [
  { number: 1, text: '選擇方案' },
  { number: 2, text: '填寫資料' },
  { number: 3, text: '確認訂單' },
];

const SubscribeCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    if (location.state?.subscriptionData) {
      setSubscriptionData(location.state.subscriptionData);
    } else {
      navigate('/customer/subscribe');
    }
  }, [location.state, navigate]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    // TODO: 實現結帳邏輯
    navigate('/customer/subscribe/success', { state: { subscriptionData } });
  };

  if (!subscriptionData) {
    return null;
  }

  return (
    <Container>
      <Title>訂閱結帳</Title>
      <SubscribeProgressSteps steps={steps} currentStep={2} />
      <Section>
        <SectionTitle>訂閱方案資訊</SectionTitle>
        <SubscriptionInfo>
          <p>方案名稱：{subscriptionData.planName}</p>
          <p>價格：${subscriptionData.price}</p>
          <p>週期：{subscriptionData.cycle}</p>
        </SubscriptionInfo>
      </Section>
      <Section>
        <SectionTitle>選擇付款方式</SectionTitle>
        <PaymentMethod>
          <PaymentMethodItem
            selected={paymentMethod === 'creditCard'}
            onClick={() => handlePaymentMethodChange('creditCard')}
          >
            信用卡
          </PaymentMethodItem>
          <PaymentMethodItem
            selected={paymentMethod === 'linePay'}
            onClick={() => handlePaymentMethodChange('linePay')}
          >
            LINE Pay
          </PaymentMethodItem>
        </PaymentMethod>
      </Section>
      <CheckoutButton onClick={handleCheckout} disabled={!subscriptionData}>
        確認結帳
      </CheckoutButton>
    </Container>
  );
};

export default SubscribeCheckout;
