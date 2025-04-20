import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IoMdWalk,
  IoMdQrScanner,
  IoIosCloudDownload,
  IoIosRocket,
} from 'react-icons/io';
import QRCode from 'react-qr-code';
import {
  PageWrapper,
  SuccessContainer,
  SuccessIcon,
  SuccessTitle,
  SuccessSubtitle,
  OrderInfoContainer,
  OrderNumber,
  OrderItem,
  OrderItemLabel,
  OrderItemValue,
  Divider,
  QRCodeContainer,
  QRcodeTextItems,
  QRCodeTextItem,
  TextIcon,
  QRCodeText,
  HomeButton,
} from './styles';

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
    days,
  } = location.state || defaultData;

  // 添加日誌檢查
  useEffect(() => {
    console.log('SubscribeSuccess - 接收到的數據:', {
      orderId,
      planName,
      planPeople,
      frequency,
      totalPrice,
      paymentMethod,
      days,
    });
  }, [location.state]);

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
            <OrderItemLabel>收運日</OrderItemLabel>
            <OrderItemValue>
              {days
                ? days
                    .split(',')
                    .map((day) => {
                      const dayMap: { [key: string]: string } = {
                        '1': '週一',
                        '2': '週二',
                        '3': '週三',
                        '4': '週四',
                        '5': '週五',
                        '6': '週六',
                        '7': '週日',
                      };
                      return dayMap[day];
                    })
                    .join('、')
                : '未指定'}
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

export default SubscribeSuccess;
