import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { HiExclamationCircle, HiPencil, HiMiniQrCode } from 'react-icons/hi2';

import {
  ErrorMessage,
  EmptyMessage,
  OrderDetailContainer,
  ContentArea,
  OrderCard,
  CardHeader,
  OrderTitle,
  CardHeaderEditButtons,
  Button,
  OrderPhotoArea,
  PhotoContainer,
  SinglePhotoContainer,
  Photo,
  NoPhotoPlaceholder,
  DetailList,
  DetailItem,
  DetailLabel,
  DetailValue,
  OrderListSection,
} from './styled';

import { getOrderDetails } from '../../../apis/customer/getOrderDetails';

import OrderNavHeader from '../../../components/customer/OrderNavHeader';
import AnimationLoading from '../../../components/common/AnimationLoading';
import Modal from '../../../components/common/Modal';
import QRcodeData from '../../../components/customer/QRcodeData';
import Tab from '../../../components/customer/OrderDetails/Tab';
import TabContent from '../../../components/customer/OrderDetails/TabContent';

const BASE_API_URL = import.meta.env.VITE_API_URL;
const userId = localStorage.getItem('UsersID');

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId, orderDetailId } = useParams<{
    orderId: string;
    orderDetailId: string;
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [activeTab, setActiveTab] = useState('全部');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // 獲取訂單數據的函數
  const fetchOrderData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('正在請求訂單數據，參數：', {
        userId,
        orderId,
      });

      const data = await getOrderDetails(userId, orderId);

      console.log('API 回傳數據：', data);

      if (data.status) {
        console.log('訂單詳情數據：', data.result[0]);
        console.log('OrderDetail 數據：', data.result[0].OrderDetails);
        setOrderData(data.result[0]);
      } else {
        console.error('API 回傳錯誤：', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('獲取訂單數據時出錯：', error);
      setError(error instanceof Error ? error.message : '獲取訂單數據時出錯');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  // 馬上載入訂單數據
  useEffect(() => {
    if (orderId) {
      fetchOrderData();
    }
  }, [orderId, fetchOrderData]);

  // 載入中
  if (isLoading) {
    return <AnimationLoading />;
  }

  // 錯誤
  if (error) {
    return <ErrorMessage>錯誤: {error}</ErrorMessage>;
  }

  // 沒有找到訂單數據
  if (!orderData) {
    return <EmptyMessage>沒有找到訂單數據</EmptyMessage>;
  }

  // 分離不同狀態的訂單
  const abnormalOrders =
    orderData.OrderDetails?.filter((order) => order.Status === '異常') || [];
  const scheduledOrders =
    orderData.OrderDetails?.filter((order) =>
      ['已排定', '前往中', '已抵達'].includes(order.Status),
    ) || [];
  const unscheduledOrders =
    orderData.OrderDetails?.filter((order) => order.Status === '未排定') || [];
  const completedOrders =
    orderData.OrderDetails?.filter((order) => order.Status === '已完成') || [];

  // 計算全部任務數量
  const totalOrders = orderData.OrderDetails?.length || 0;

  // 標籤數據
  const tabs = [
    { name: '全部', count: totalOrders },
    { name: '已排定', count: scheduledOrders.length },
    { name: '未排定', count: unscheduledOrders.length },
    { name: '已結束', count: completedOrders.length },
    { name: '異常', count: abnormalOrders.length },
  ];

  return (
    <OrderDetailContainer>
      {/* navbar */}
      <OrderNavHeader title="方案詳情" orderNumber={orderData.OrderNumber} />

      <ContentArea>
        {/* 訂單卡片 */}
        <OrderCard>
          <CardHeader>
            <OrderTitle>
              {orderData.PlanName} {orderData.Liter}L / {orderData.PlanKG}kg
            </OrderTitle>
            <CardHeaderEditButtons>
              {/* 下載qrcode */}
              <Button onClick={() => setIsQrModalOpen(true)}>
                <HiMiniQrCode />
              </Button>

              {/* 修改訂單 */}
              <Button
                onClick={() =>
                  navigate(`/customer/order/${orderId}/edit`, {
                    state: {
                      orderData,
                    },
                  })
                }
              >
                <HiPencil />
              </Button>
            </CardHeaderEditButtons>
          </CardHeader>

          <OrderPhotoArea>
            <PhotoContainer>
              {orderData.Photos?.map((photo, index) => {
                return (
                  <SinglePhotoContainer key={index}>
                    {photo ? (
                      <Photo
                        src={`${BASE_API_URL}${photo}`}
                        alt={`收運定點照片 ${index + 1}`}
                      />
                    ) : (
                      <NoPhotoPlaceholder>
                        <HiExclamationCircle size={24} />
                      </NoPhotoPlaceholder>
                    )}
                  </SinglePhotoContainer>
                );
              })}
            </PhotoContainer>
          </OrderPhotoArea>

          <DetailList>
            <DetailItem>
              <DetailLabel>訂單期間</DetailLabel>
              <DetailValue>
                {orderData.StartDate} - {orderData.EndDate}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>每周收運日</DetailLabel>
              <DetailValue>{orderData.WeekDay}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>收運地址</DetailLabel>
              <DetailValue>{orderData.Addresses}</DetailValue>
            </DetailItem>
          </DetailList>
        </OrderCard>

        {/* 收運任務 */}
        <OrderListSection>
          {/* 收運任務 標籤 */}
          <Tab activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

          {/* 任務內容 */}
          <TabContent
            activeTab={activeTab}
            abnormalOrders={abnormalOrders}
            scheduledOrders={scheduledOrders}
            unscheduledOrders={unscheduledOrders}
            completedOrders={completedOrders}
            totalOrders={totalOrders}
            orderData={orderData}
          />
        </OrderListSection>
      </ContentArea>

      <Modal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)}>
        <QRcodeData orderId={orderData?.OrdersID} userId={userId} />
      </Modal>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
