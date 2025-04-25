import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
} from './styles';

import SubscribeProgressSteps from '../../../components/customer/SubscribeProgressSteps';
import LoadingMessage from '../../../components/common/LoadingMessage';
import ErrorReport from '../../../components/common/ErrorReport';
import { SubscriptionData, Step } from './types';

const steps: Step[] = [
  { number: 1, text: '選擇方案' },
  { number: 2, text: '填選收運資料' },
  { number: 3, text: '結帳' },
];

// 將星期幾轉換為中文
const convertDaysToChinese = (days: string) => {
  const dayMap: { [key: string]: string } = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '日',
  };

  return days
    .split(',')
    .map((day) => dayMap[day.trim()])
    .join('，');
};

const SubscribeCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('linePay');
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleCheckout = async () => {
    if (!subscriptionData) return;

    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('UsersID');
      if (!userId) {
        setError('請先登入');
        setIsLoading(false);
        return;
      }

      // 建立 FormData 物件
      const formData = new FormData();
      formData.append('UsersID', userId);
      formData.append('PlanID', subscriptionData.planId.toString());
      formData.append('DiscountID', subscriptionData.frequency.toString());
      formData.append('OrderName', subscriptionData.name);
      formData.append('OrderPhone', subscriptionData.phone);
      formData.append('Addresses', subscriptionData.address);
      formData.append('Notes', subscriptionData.notes || '');
      formData.append('WeekDay', subscriptionData.days);
      formData.append('StartDate', subscriptionData.startDate);
      formData.append('TotalAmount', subscriptionData.totalPrice.toString());

      // 處理圖片檔案上傳
      if (
        subscriptionData.deliveryMethod === 'fixedpoint' &&
        subscriptionData.fixedPointImages &&
        subscriptionData.fixedPointImages.length > 0
      ) {
        // 如果有檔案屬性，直接使用檔案
        for (let i = 0; i < subscriptionData.fixedPointImages.length; i++) {
          const image = subscriptionData.fixedPointImages[i];
          if (image.file) {
            formData.append(`OrderImage`, image.file, `image_${i}.jpg`);
          } else {
            // 如果沒有檔案但有 URL，嘗試從 URL 獲取檔案
            try {
              // 處理 data URL
              if (image.url.startsWith('data:')) {
                const response = await fetch(image.url);
                const blob = await response.blob();
                formData.append(`OrderImage`, blob, `image_${i}.jpg`);
              } else {
                // 處理 blob URL
                const response = await fetch(image.url);
                const blob = await response.blob();
                formData.append(`OrderImage`, blob, `image_${i}.jpg`);
              }
            } catch (error) {
              console.error('無法從 URL 獲取圖片:', error);
              setError('圖片處理失敗，請重新上傳');
              setIsLoading(false);
              return;
            }
          }
        }
      }

      // 發送請求到後端 API
      const response = await axios.post('/api/POST/user/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('api提交成功:', response.data);

      //回傳回來的訂單ID
      const orderID = response.data.orderId;

      if (response.data) {
        navigate('/customer/subscribe-success', {
          state: {
            subscriptionData,
            orderId: response.data.orderId,
          },
        });
      }
    } catch (err) {
      console.error('訂單提交失敗:', err);
      setError('訂單提交失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
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
            <SubscriptionInfoItem>
              ．每周收運日: {convertDaysToChinese(subscriptionData.days)}
            </SubscriptionInfoItem>
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
                    subscriptionData.frequency * 30 * 24 * 60 * 60 * 1000,
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
            <div>．姓名：{subscriptionData.name}</div>
            <div>．聯絡電話：{subscriptionData.phone}</div>
            <div>．收運地址：{subscriptionData.address}</div>
            <div>
              ．收運方式：
              {subscriptionData.deliveryMethod === 'fixedpoint'
                ? '放置固定點'
                : '面交收運'}
            </div>
            {subscriptionData.notes && (
              <div>．備註：{subscriptionData.notes}</div>
            )}

            {subscriptionData.deliveryMethod === 'fixedpoint' &&
              subscriptionData.fixedPointImages && (
                <FixedPointImagesContainer>
                  <FixedPointImagesTitle>．固定點照片：</FixedPointImagesTitle>
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
        isActive={!isLoading}
        onNext={handleCheckout}
        isLastStep={true}
        isLoading={isLoading}
      />
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </PageWrapper>
  );
};

export default SubscribeCheckout;
