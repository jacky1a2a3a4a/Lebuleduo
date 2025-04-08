import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  IoMdWalk,
  IoMdQrScanner,
  IoIosCloudDownload,
  IoIosRocket,
} from 'react-icons/io';
import QRCode from 'react-qr-code';

const SubscribeSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 訂單編號
  const [orderNumber, setOrderNumber] = useState('');

  // 測試數據（僅在沒有location.state時使用）
  const defaultData = {
    orderId: '',
    planName: '測試方案',
    liter: '無',
    planKg: '無',
    planPeople: '無',
    frequency: '無',
    totalPrice: '無',
    paymentMethod: '無',
  };

  // 從上一頁獲取數據或使用默認數據
  const {
    orderId,
    planName,
    planPeople,
    frequency,
    totalPrice,
    paymentMethod,
  } = location.state || defaultData;

  // 生成訂單號碼
  useEffect(() => {
    console.log('訂單數據:', orderId, planName, totalPrice);

    // 若沒有orderId，則生成一個新的
    if (!orderId) {
      // 生成現在時間的時間戳
      const timestamp = new Date().getTime();
      // 生成6位隨機數字
      const randomNum = Math.floor(Math.random() * 900000) + 100000;
      // 組合訂單號
      const newOrderId = `LBL${timestamp}${randomNum}`;
      setOrderNumber(newOrderId);
    } else {
      setOrderNumber(orderId);
    }
  }, [orderId]);

  // 生成QR碼內容（訂單資訊的JSON字符串）
  const qrCodeValue = JSON.stringify({
    orderNumber: orderNumber || `LBL${Date.now()}`,
    planName: planName || defaultData.planName,
    planPeople: planPeople || defaultData.planPeople,
    frequency: frequency || defaultData.frequency,
    totalPrice: totalPrice || defaultData.totalPrice,
    timestamp: new Date().toISOString(),
  });

  // 返回首頁
  const handleBackToHome = () => {
    navigate('/customer');
  };

  return (
    <PageWrapper>
      <SuccessContainer>
        <SuccessIcon>✓</SuccessIcon>
        <SuccessTitle>訂閱成功！</SuccessTitle>
        <SuccessSubtitle>感謝您的訂閱，您的訂單已成功建立</SuccessSubtitle>

        <OrderInfoContainer>
          <OrderNumber>訂單編號：{orderNumber}</OrderNumber>
          <Divider />

          <OrderItem>
            <OrderItemLabel>方案名稱</OrderItemLabel>
            <OrderItemValue>
              {planName || defaultData.planName} (
              {planPeople || defaultData.planPeople})
            </OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>訂閱時長</OrderItemLabel>
            <OrderItemValue>
              {frequency || defaultData.frequency} 個月
            </OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>支付方式</OrderItemLabel>
            <OrderItemValue>
              {(paymentMethod || defaultData.paymentMethod) === 'linepay'
                ? 'Line Pay'
                : (paymentMethod || defaultData.paymentMethod) === 'creditcard'
                  ? '信用卡'
                  : '未指定'}
            </OrderItemValue>
          </OrderItem>

          <Divider />

          <OrderItem>
            <OrderItemLabel>總計金額</OrderItemLabel>
            <OrderItemValue>
              NT$ {totalPrice || defaultData.totalPrice}
            </OrderItemValue>
          </OrderItem>
        </OrderInfoContainer>

        <QRCodeContainer>
          <QRCode
            value={qrCodeValue}
            size={200}
            level="H"
            style={{ width: '100%', maxWidth: '130px', height: 'auto' }}
          />
        </QRCodeContainer>
        <QRcodeTextItems>
          <QRCodeTextItem>
            <TextIcon>
              <IoMdWalk />
            </TextIcon>
            <QRCodeText>
              代收員將在實際收運時掃描此QR碼，以認證您的訂單資訊。
            </QRCodeText>
          </QRCodeTextItem>

          <QRCodeTextItem>
            <TextIcon>
              <IoMdQrScanner />
            </TextIcon>
            <QRCodeText>
              請將QR碼貼紙貼在要收運的垃圾袋明顯處，以利代收員辨識。每包垃圾都需要貼上QR碼。
            </QRCodeText>
          </QRCodeTextItem>

          <QRCodeTextItem>
            <TextIcon>
              <IoIosRocket />
            </TextIcon>
            <QRCodeText>
              您的專屬QR碼貼紙將於 3 天內，寄送到您填寫的收運地址。
            </QRCodeText>
          </QRCodeTextItem>

          <QRCodeTextItem>
            <TextIcon>
              <IoIosCloudDownload />
            </TextIcon>
            <QRCodeText>
              若欲立即使用QR碼，請至首頁點選您的方案，下載QR碼，至7-11超商ibon列印貼紙。
            </QRCodeText>
          </QRCodeTextItem>
        </QRcodeTextItems>

        <HomeButton onClick={handleBackToHome}>返回首頁</HomeButton>
      </SuccessContainer>
    </PageWrapper>
  );
};

// 最外層容器
const PageWrapper = styled.div`
  background-color: var(--color-gray-0);
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 500px;
  margin: 0 auto;
`;

//// 成功訊息容器
const SuccessContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
`;

// 成功圖標
const SuccessIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: var(--color-gray-600);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-gray-0);
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
`;

// 成功標題
const SuccessTitle = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-700);
  text-align: center;
  margin-bottom: var(--spacing-sm);
`;

// 成功副標題
const SuccessSubtitle = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
  text-align: center;
  margin-bottom: var(--spacing-md);
`;

//// 訂單信息容器
const OrderInfoContainer = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--card-shadow);
  width: 100%;
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

// 訂單號碼
const OrderNumber = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

// 訂單詳情項
const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訂單項目標籤
const OrderItemLabel = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
`;

// 訂單項目值
const OrderItemValue = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  font-weight: var(--font-weight-medium);
`;

// 分隔線
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-200);
  margin: var(--spacing-md) 0;
`;

//// QR碼容器
const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// QR碼提示文字容器
const QRcodeTextItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

//// QR碼提示文字容器
const QRCodeTextItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
`;

// 提示文字圖標
const TextIcon = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-md);
`;

// QR碼提示文字
const QRCodeText = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  text-align: left;
`;

// 返回按鈕
const HomeButton = styled.button`
  background-color: var(--color-gray-600);
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-gray-700);
  }
`;

export default SubscribeSuccess;
