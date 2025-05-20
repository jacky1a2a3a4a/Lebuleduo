import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SubscribeBottom from '../../../components/customer/Subscribe/Bottom';
import CommonLoading from '../../../components/common/CommonLoading';
import {
  PageWrapper,
  ScrollableContent,
  Section,
  Spacer,
  SubscriptionTitle,
  SubscriptionInfo,
  SubscriptionInfoItem,
  Divider,
  SubscriptionDateInfo,
  SubscriptionDateInfoItem,
  DateTitle,
  DateText,
  DeliverTitle,
  FixedPointImagesContainer,
  FixedPointImagesTitle,
  FixedPointImagesGrid,
  FixedPointImage,
} from './styled';

import ProgressSteps from '../../../components/customer/Subscribe/ProgressSteps';
import SectionTitle from '../../../components/customer/Subscribe/SectionTitle';
import ButtonCard from '../../../components/customer/Subscribe/ButtonCard';

import { SubscriptionData } from './types';
import { getFormattedDateWithDay } from '../../../utils/formatDate';
import { SubscribeSteps } from '../../../components/customer/Subscribe/SubscribeSteps';
import { postOrder } from '../../../apis/customer/PostOrder';
import { createPayment } from '../../../apis/customer/postCreatePayment';

const userId = localStorage.getItem('UsersID');

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

// 轉換訂閱頻率
const convertFrequency = (frequency: number) => {
  const frequencyMap: { [key: number]: number } = {
    1: 1,
    2: 3,
    3: 6,
  };
  return frequencyMap[frequency] || frequency;
};

const SubscribeCheckout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('linePay');
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentLoading, setShowPaymentLoading] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('subscriptionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // 確保 planId 是數字
      parsedData.planId = Number(parsedData.planId);
      setSubscriptionData(parsedData);
      // 從 subscriptionData 中讀取付款方式
      if (parsedData.paymentMethod) {
        setPaymentMethod(parsedData.paymentMethod);
      }
      console.log('目前儲存的訂單資料:', parsedData);
    } else {
      navigate('/customer/subscribe');
    }
  }, [navigate]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // 更新 subscriptionData 中的付款方式
    if (subscriptionData) {
      const updatedData = {
        ...subscriptionData,
        paymentMethod: method,
      };
      setSubscriptionData(updatedData);
      sessionStorage.setItem('subscriptionData', JSON.stringify(updatedData));
    }
  };

  // === 提交訂單 ===
  const handleCheckout = async () => {
    if (!subscriptionData) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!userId) {
        setError('請先登入');
        setIsLoading(false);
        return;
      }

      // api 建立訂單
      const response = await postOrder(subscriptionData);
      console.log('api提交成功:', response);
      console.log('訂單id:', response.orders.OrdersID);

      const orderId = response.orders.OrdersID;

      // 更新 subscriptionData 並存入 session storage
      const updatedData = {
        ...subscriptionData,
        orderId: orderId,
      };
      setSubscriptionData(updatedData);
      sessionStorage.setItem('subscriptionData', JSON.stringify(updatedData));

      if (response) {
        try {
          const paymentResponse = await createPayment(orderId);
          console.log('藍新金流 API 回應:', paymentResponse);

          // 確保頁面已完全載入
          if (document.readyState !== 'complete') {
            await new Promise((resolve) => {
              window.addEventListener('load', resolve);
            });
          }

          // 顯示付款載入中
          setShowPaymentLoading(true);

          // 建立表單並自動提交
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = paymentResponse.paymentData.PaymentUrl;

          // 建立隱藏的輸入欄位
          const merchantId = document.createElement('input');
          merchantId.type = 'hidden';
          merchantId.name = 'MerchantID';
          merchantId.value = paymentResponse.paymentData.MerchantID;
          form.appendChild(merchantId);

          const tradeInfo = document.createElement('input');
          tradeInfo.type = 'hidden';
          tradeInfo.name = 'TradeInfo';
          tradeInfo.value = paymentResponse.paymentData.TradeInfo;
          form.appendChild(tradeInfo);

          const tradeSha = document.createElement('input');
          tradeSha.type = 'hidden';
          tradeSha.name = 'TradeSha';
          tradeSha.value = paymentResponse.paymentData.TradeSha;
          form.appendChild(tradeSha);

          const version = document.createElement('input');
          version.type = 'hidden';
          version.name = 'Version';
          version.value = paymentResponse.paymentData.Version || '1.6';
          form.appendChild(version);

          // 確保 document.body 存在
          if (!document.body) {
            throw new Error('Document body not found');
          }

          // 將表單加入頁面並提交
          document.body.appendChild(form);
          form.submit();
          return;
        } catch (paymentError) {
          console.error('藍新金流 API 呼叫失敗:', paymentError);
          setError(paymentError.message);
          return;
        }
      }
    } catch (err) {
      console.error('訂單提交失敗:', err);
      if (axios.isAxiosError(err) && err.response) {
        console.error('錯誤詳情:', err.response.data);
        setError(`訂單提交失敗: ${err.response.data.message || '請稍後再試'}`);
      } else {
        setError('訂單提交失敗，請稍後再試');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 如果沒有訂單資料，則不顯示頁面
  if (!subscriptionData) {
    return null;
  }

  return (
    <PageWrapper>
      {showPaymentLoading && <CommonLoading text="正在跳轉至付款頁面" />}
      <ProgressSteps steps={SubscribeSteps} currentStep={3} />

      <ScrollableContent>
        <SectionTitle mainTitle="訂單明細" subTitle="請確認您的訂單資訊" />

        <Section>
          <SubscriptionTitle>
            {subscriptionData.planName} ({subscriptionData.planPeople})
          </SubscriptionTitle>
          <SubscriptionInfo>
            <SubscriptionInfoItem>
              ．每次收運: 一般垃圾 + 回收 + 廚餘 = {subscriptionData.kg}kg /
              {subscriptionData.liter}L
            </SubscriptionInfoItem>
            <SubscriptionInfoItem>
              ．{subscriptionData.planDescription}
            </SubscriptionInfoItem>
            <SubscriptionInfoItem>
              ．預定期程：{convertFrequency(subscriptionData.frequency)}個月
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
                {getFormattedDateWithDay(subscriptionData.startDate)}
              </DateText>
            </SubscriptionDateInfoItem>

            <SubscriptionDateInfoItem>
              <DateTitle>結束時間</DateTitle>
              <DateText>
                {getFormattedDateWithDay(
                  new Date(
                    new Date(subscriptionData.startDate).getTime() +
                      subscriptionData.frequency * 30 * 24 * 60 * 60 * 1000,
                  ).toISOString(),
                )}
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

        <SectionTitle mainTitle="選擇付款方式" subTitle="" />

        <Section>
          <ButtonCard
            title="LINE pay"
            subtitle="選擇Linepay付款，系統將直接導入付款連結"
            $active={paymentMethod === 'linePay'}
            onClick={() => handlePaymentMethodChange('linePay')}
          />

          <Spacer />

          <ButtonCard
            title="信用卡付款"
            subtitle="選擇立即以信用卡完成付款"
            $active={paymentMethod === 'creditCard'}
            onClick={() => handlePaymentMethodChange('creditCard')}
          />
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
