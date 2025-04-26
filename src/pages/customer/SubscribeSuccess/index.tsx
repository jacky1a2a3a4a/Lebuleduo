import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoMdWalk,
  IoMdQrScanner,
  IoIosCloudDownload,
  IoIosRocket,
} from 'react-icons/io';
import axios from 'axios';
import successImage from '../../../assets/images/Lebuledou_score.png';
import {
  PageWrapper,
  SuccessContainer,
  SuccessImage,
  SuccessTitle,
  OrderInfoContainer,
  OrderNumber,
  OrderItem,
  OrderItemLabel,
  OrderItemValue,
  Divider,
  QRcodeTextItems,
  QRCodeTextItem,
  TextIcon,
  QRCodeText,
  HomeButton,
} from './styles';

import {
  getFormattedDateTime,
  formatNumbersToWeekdays,
} from '../../../utils/formatDate';

interface OrderData {
  orderId: string;
  days: number;
}

interface ApiResponse {
  OrderNumber: string;
  TotalAmount: number;
  PaymentStatus: number;
  LinePayMethod: string;
  Months: number;
  PlanName: string;
  Liter: number;
  PlanKG: number;
  CreatedAt: string;
  UpdatedAt: string;
}

const SubscribeSuccess = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(''); //訂單編號
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  // 從session storage獲取數據並呼叫API
  useEffect(() => {
    const storedData = sessionStorage.getItem('subscriptionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setOrderData(parsedData);
      console.log('session storage 訂單資料:', parsedData);

      // 呼叫 API
      if (parsedData.orderId) {
        axios
          .get(`api/Get/Orders/${parsedData.orderId}`)
          .then((response) => {
            if (response.data.status) {
              setApiData(response.data.result);
              setOrderNumber(response.data.result.OrderNumber);
            }
            console.log('API 回傳資料:', response.data.result);
          })
          .catch((error) => {
            console.error('API 呼叫失敗:', error);
          });
      }
    }
  }, []);

  // 返回首頁
  const handleBackToHome = () => {
    navigate('/customer');
  };

  const { days } = orderData || {};

  const {
    PlanName,
    Liter,
    PlanKG,
    Months,
    LinePayMethod,
    TotalAmount,
    UpdatedAt,
  } = apiData || {};

  return (
    <PageWrapper>
      <SuccessContainer>
        <SuccessImage src={successImage} alt="預定成功" />
        <SuccessTitle>預定成功囉!</SuccessTitle>

        <OrderInfoContainer>
          <OrderNumber>訂單編號： {orderNumber}</OrderNumber>
          <Divider />

          <OrderItem>
            <OrderItemLabel>方案名稱</OrderItemLabel>
            <OrderItemValue>
              {PlanName} {Liter}L / {PlanKG}kg
            </OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>訂閱時長</OrderItemLabel>
            <OrderItemValue>{Months} 個月</OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>收運日</OrderItemLabel>
            <OrderItemValue>
              {days ? (
                formatNumbersToWeekdays(days.toString()).map(
                  (day, index, array) => (
                    <span key={day}>
                      週{day}
                      {index < array.length - 1 && '、'}
                    </span>
                  ),
                )
              ) : (
                <span>無收運日</span>
              )}
            </OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>支付方式</OrderItemLabel>
            <OrderItemValue>{LinePayMethod}</OrderItemValue>
          </OrderItem>

          <OrderItem>
            <OrderItemLabel>訂單建立日期</OrderItemLabel>
            <OrderItemValue>{getFormattedDateTime(UpdatedAt)}</OrderItemValue>
          </OrderItem>

          <Divider />

          <OrderItem>
            <OrderItemLabel>總計金額</OrderItemLabel>
            <OrderItemValue>NT$ {TotalAmount}</OrderItemValue>
          </OrderItem>
        </OrderInfoContainer>

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
