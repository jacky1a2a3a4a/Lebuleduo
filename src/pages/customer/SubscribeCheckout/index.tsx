import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubscribeProgressSteps from '../../../components/customer/SubscribeProgressSteps';
import SubscribeBottom from '../../../components/customer/SubscribeBottom';
import {
  PageWrapper,
  ScrollableContent,
  SectionTitle,
  SectionSubtitle,
  Section,
  SubscriptionTitle,
  SubscriptionInfo,
  SubscriptionInfoItem,
  Divider,
  SubscriptionDateInfo,
  SubscriptionDateInfoItem,
  DateTitle,
  DateText,
  DeliverTitle,
  PaymentMethod,
  PaymentMethodItem,
  PaymentText,
  PaymentSubtext,
  PaymentTextContainer,
  FixedPointImagesContainer,
  FixedPointImagesTitle,
  FixedPointImagesGrid,
  FixedPointImage,
  RadioButton,
} from './styled';

interface SubscriptionData {
  // 方案資訊
  planId: number;
  planName: string;
  planPeople: string;
  planKg: number;
  liter: number;
  planDescription: string;
  price: number;

  // 訂閱資訊
  frequency: number;
  days: string;
  startDate: string;
  totalPrice: number;

  // 收運資訊
  name: string;
  phone: string;
  address: string;
  deliveryMethod: 'fixedpoint' | 'ereceipt';
  notes: string;
  fixedPointImages?: Array<{
    id: string;
    url: string;
  }>;
}

const steps = [
  { number: 1, text: '選擇方案' },
  { number: 2, text: '填選收運資料' },
  { number: 3, text: '結帳' },
];

const SubscribeCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);

  useEffect(() => {
    console.log(
      'SubscribeCheckout - 接收到的數據:',
      location.state?.subscriptionData,
    );
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
    navigate('/customer/subscribe-success', { state: { subscriptionData } });
  };

  if (!subscriptionData) {
    return null;
  }

  return (
    <PageWrapper>
      <SubscribeProgressSteps steps={steps} currentStep={3} />

      <ScrollableContent>
        <SectionTitle>訂單明細</SectionTitle>
        <SectionSubtitle>請確認您的訂單資訊</SectionSubtitle>

        <Section>
          <SubscriptionTitle>
            {subscriptionData.planName} ({subscriptionData.planPeople})
          </SubscriptionTitle>
          <SubscriptionInfo>
            <SubscriptionInfoItem>
              ．每次收運: 一般垃圾 + 回收 + 廚餘 = {subscriptionData.planKg}kg /
              {subscriptionData.liter}L
            </SubscriptionInfoItem>
            <SubscriptionInfoItem>
              ．{subscriptionData.planDescription}
            </SubscriptionInfoItem>
            <SubscriptionInfoItem>
              ．預定期程：{subscriptionData.frequency}個月
            </SubscriptionInfoItem>
            <SubscriptionInfoItem>．每周收運日:{}</SubscriptionInfoItem>
          </SubscriptionInfo>

          <Divider />

          <SubscriptionDateInfo>
            <SubscriptionDateInfoItem>
              <DateTitle>開始時間</DateTitle>
              <DateText>
                {new Date(subscriptionData.startDate)
                  .toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                  })
                  .replace(/\//g, '/')}
              </DateText>
            </SubscriptionDateInfoItem>

            <SubscriptionDateInfoItem>
              <DateTitle>結束時間</DateTitle>
              <DateText>
                {new Date(
                  new Date(subscriptionData.startDate).getTime() +
                    subscriptionData.frequency * 7 * 24 * 60 * 60 * 1000,
                )
                  .toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                  })
                  .replace(/\//g, '/')}
              </DateText>
            </SubscriptionDateInfoItem>
          </SubscriptionDateInfo>

          <Divider />

          <DeliverTitle>收運資訊</DeliverTitle>
          <SubscriptionInfo>
            <div>姓名：{subscriptionData.name}</div>
            <div>聯絡電話：{subscriptionData.phone}</div>
            <div>收運地址：{subscriptionData.address}</div>
            <div>
              收運方式：
              {subscriptionData.deliveryMethod === 'fixedpoint'
                ? '放置固定點'
                : '面交收運'}
            </div>
            {subscriptionData.notes && (
              <div>備註：{subscriptionData.notes}</div>
            )}

            {subscriptionData.deliveryMethod === 'fixedpoint' &&
              subscriptionData.fixedPointImages && (
                <FixedPointImagesContainer>
                  <FixedPointImagesTitle>固定點照片：</FixedPointImagesTitle>
                  <FixedPointImagesGrid>
                    {subscriptionData.fixedPointImages.map((image) => (
                      <FixedPointImage
                        key={image.id}
                        src={image.url}
                        alt={`固定點照片 ${image.id}`}
                      />
                    ))}
                  </FixedPointImagesGrid>
                </FixedPointImagesContainer>
              )}
          </SubscriptionInfo>
        </Section>

        <SectionTitle>選擇付款方式</SectionTitle>
        <SectionSubtitle> </SectionSubtitle>

        <Section>
          <PaymentMethod>
            <PaymentMethodItem
              selected={paymentMethod === 'linePay'}
              onClick={() => handlePaymentMethodChange('linePay')}
            >
              <RadioButton selected={paymentMethod === 'linePay'} />
              <PaymentTextContainer>
                <PaymentText>LINE pay</PaymentText>
                <PaymentSubtext>
                  您可以選擇Line
                  pay付款，請直接點選下方結帳按鍵，系統將直接導入付款連結
                </PaymentSubtext>
              </PaymentTextContainer>
            </PaymentMethodItem>
            <PaymentMethodItem
              selected={paymentMethod === 'creditCard'}
              onClick={() => handlePaymentMethodChange('creditCard')}
            >
              <RadioButton selected={paymentMethod === 'creditCard'} />
              <PaymentTextContainer>
                <PaymentText>信用卡付款</PaymentText>
                <PaymentSubtext>您可以選擇立即以信用卡完成付款</PaymentSubtext>
              </PaymentTextContainer>
            </PaymentMethodItem>
          </PaymentMethod>
        </Section>
      </ScrollableContent>

      <SubscribeBottom
        totalPrice={subscriptionData.totalPrice}
        isActive={true}
        onNext={handleCheckout}
        isLastStep={true}
      />
    </PageWrapper>
  );
};

export default SubscribeCheckout;
