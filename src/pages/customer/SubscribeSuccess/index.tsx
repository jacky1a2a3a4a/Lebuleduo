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
import QRCodeDownloader from '../../../components/common/QRCodeDownloader';
import { getOrderDetails } from '../../../apis/customer/getOrderDetails';
import { OrderDetail } from '../../../components/customer/QRcodeData/types';
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
  Buttons,
  HomeButton,
  CustomQRCodeDownloadButton,
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

const userId = localStorage.getItem('UsersID');

const SubscribeSuccess = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(''); //訂單編號
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  // 從session storage獲取數據並呼叫API
  useEffect(() => {
    const storedData = sessionStorage.getItem('subscriptionData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setOrderData(parsedData);
      console.log('session storage 訂單資料:', parsedData);

      // 呼叫 明細 API
      if (parsedData.orderId) {
        axios
          .get(`api/Get/Orders/${parsedData.orderId}`)
          .then((response) => {
            if (response.data.status) {
              setApiData(response.data.result);
              setOrderNumber(response.data.result.OrderNumber);
            }
            console.log('明細 API 回傳資料:', response.data.result);
          })
          .catch((error) => {
            console.error('明細 API 呼叫失敗:', error);
          });

        // 呼叫 訂單詳情 API
        getOrderDetails(userId, parsedData.orderId)
          .then((response) => {
            if (response.status && response.result.length > 0) {
              setOrderDetails(response.result[0].OrderDetails);
            }
            console.log(
              '訂單詳情 API 回傳資料:',
              response.result[0].OrderDetails,
            );
          })
          .catch((error) => {
            console.error('訂單詳情 API 呼叫失敗:', error);
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
    CreatedAt,
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
            <OrderItemValue>{getFormattedDateTime(CreatedAt)}</OrderItemValue>
          </OrderItem>

          <Divider />

          <OrderItem>
            <OrderItemLabel>總計金額</OrderItemLabel>
            <OrderItemValue>NT$ {TotalAmount}</OrderItemValue>
          </OrderItem>
        </OrderInfoContainer>

        <Buttons>
          <HomeButton onClick={handleBackToHome}>返回我的訂單</HomeButton>
          <CustomQRCodeDownloadButton as="div">
            <QRCodeDownloader
              orderNumber={orderNumber}
              orderDetails={orderDetails}
              buttonText="下載所有 QR Code"
            />
          </CustomQRCodeDownloadButton>
        </Buttons>

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
              若欲立即使用QR碼，請點擊【下載所有QR Code】，或至首頁點選您的方案下載檔案，然後至7-11超商ibon列印貼紙。
            </QRCodeText>
          </QRCodeTextItem>
        </QRcodeTextItems>
      </SuccessContainer>
    </PageWrapper>
  );
};

export default SubscribeSuccess;
