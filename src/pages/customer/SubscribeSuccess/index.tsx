import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoMdWalk,
  IoMdQrScanner,
  IoIosCloudDownload,
  IoIosRocket,
} from 'react-icons/io';
import {
  PageWrapper,
  SuccessContainer,
  SuccessImage,
  SuccessTitle,
  OrderInfoContainer,
  OrderNumberTitle,
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
} from './styled';

import successImage from '../../../assets/images/img-Lebuledou-score.png';
import QRCodeDownloader from '../../../components/common/QRCodeDownloader';
import { getOrderReceipt, type OrderReceipt } from '../../../apis/customer/getOrderReceipt';
import { getOrderDetails } from '../../../apis/customer/getOrderDetails';
import { OrderDetail } from '../../../components/customer/QRcodeData/types';
import { getUsersID } from '../../../utils/getUserLocalData';
import {
  getFormattedDateTime,
  // formatNumbersToWeekdays,
} from '../../../utils/formatDate';
import { formatPaymentMethod } from '../../../utils/formatPaymentMethod';

const SubscribeSuccess = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(''); //儲存orderId
  const [receiptData, setReceiptData] = useState<OrderReceipt | null>(null); //儲存api回傳資料
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  // 從 sessionStorage 獲取訂單 ID
  useEffect(() => {
    const subscriptionData = sessionStorage.getItem('subscriptionData');
    if (subscriptionData) {
      try {
        const parsedData = JSON.parse(subscriptionData);
        setOrderId(parsedData.orderId);
        console.log('訂單id:', parsedData.orderId);
      } catch (error) {
        console.error('解析 subscriptionData 失敗:', error);
      }
    }
  }, []);

  // 獲取訂單收據
  useEffect(() => {
    if (!orderId) return;

    getOrderReceipt(orderId)
      .then((response) => {
        if (response?.status && response?.result) {
          setReceiptData(response.result);
          console.log('訂單明細 API 回傳資料:', response.result);
        } else {
          console.warn('訂單明細 API 回傳資料格式不正確:', response);
        }
      })
      .catch((error) => {
        console.error('訂單明細 API 呼叫失敗:', error);
      });
  }, [orderId]);

  // 獲取訂單詳情
  useEffect(() => {
    if (!orderId) return;
    
    const userId = getUsersID();
    console.log('userId:', userId);
    
    if (!userId) {
      console.error('未找到用戶ID');
      return;
    }

    getOrderDetails(userId.toString(), orderId)
      .then((response) => {
        if (response?.status && response?.result?.[0]?.OrderDetails) {
          setOrderDetails(response.result[0].OrderDetails);
          console.log('訂單詳情 API 回傳資料:', response.result[0].OrderDetails);
        } else {
          console.warn('訂單詳情 API 回傳資料格式不正確:', response);
        }
      })
      .catch((error) => {
        console.error('訂單詳情 API 呼叫失敗:', error);
      });
  }, [orderId]);

  // 返回首頁
  const handleBackToHome = () => {
    navigate('/customer');
  };


  const {
    OrderNumber,
    PlanName,
    Liter,
    PlanKG,
    Months,
    LinePayMethod,
    TotalAmount,
    CreatedAt,
  } = receiptData || {};

  return (
    <PageWrapper>
      <SuccessContainer>
        <SuccessImage src={successImage} alt="預定成功" />
        <SuccessTitle>預定成功囉!</SuccessTitle>

        <OrderInfoContainer>
          <OrderNumberTitle>訂單編號： {OrderNumber}</OrderNumberTitle>
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

          {/* <OrderItem>
            <OrderItemLabel>收運日</OrderItemLabel>
            <OrderItemValue>
              {days ? (
                formatNumbersToWeekdays(days).map(
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
          </OrderItem> */}

          <OrderItem>
            <OrderItemLabel>支付方式</OrderItemLabel>
            <OrderItemValue>
              {formatPaymentMethod(LinePayMethod)}
            </OrderItemValue>
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
              orderNumber={OrderNumber}
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
              若欲立即使用QR碼，請點擊【下載所有QR
              Code】，或至首頁點選您的方案下載檔案，然後至7-11超商ibon列印貼紙。
            </QRCodeText>
          </QRCodeTextItem>
        </QRcodeTextItems>
      </SuccessContainer>
    </PageWrapper>
  );
};

export default SubscribeSuccess;
