import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { HiExclamationCircle } from 'react-icons/hi2';
import OrderListCard from './OrderListCard';
import {
  ErrorMessage,
  EmptyMessage,
  OrderDetailContainer,
  ContentArea,
  OrderCard,
  CardHeader,
  OrderTitle,
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
  OrderListHeader,
  OrderListTitle,
  OrderListCal,
  OrderList,
} from './styled';
import OrderNavHeader from '../../../components/customer/OrderNavHeader';
import AnimationLoading from '../../../components/common/AnimationLoading';
import { 
  getUserOrdersCompletedDetails,
  type CompletedOrderDetailsData,
  type CompletedOrderDetail
} from '../../../apis/customer/getUserOrdersCompletedDetails';

const BASE_URL = import.meta.env.VITE_API_URL;

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId, orderDetailId } = useParams<{
    orderId: string;
    orderDetailId: string;
  }>();
  const [orderData, setOrderData] = useState<CompletedOrderDetailsData | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<CompletedOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 獲取訂單數據的函數
  const fetchOrderData = useCallback(async () => {
    if (!orderId) {
      setError('訂單 ID 不存在');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('正在請求訂單數據，訂單 ID：', orderId);

      const data = await getUserOrdersCompletedDetails(orderId);
      console.log('API 回傳數據：', data);

      if (data.result && data.result.length > 0) {
        const orderDetails = data.result[0];
        console.log('訂單詳情數據：', orderDetails);
        console.log('OrderDetail 數據：', orderDetails.OrderDetail);
        setOrderData(orderDetails);

        // 如果有 orderDetailId，找到對應的訂單詳情
        if (orderDetailId) {
          const detail = orderDetails.OrderDetail.find(
            (detail) => detail.OrderDetailID.toString() === orderDetailId,
          );
          if (detail) {
            setSelectedOrderDetail(detail);
          }
        }
      } else {
        setError('沒有找到訂單數據');
      }
    } catch (error) {
      console.error('獲取訂單數據時出錯：', error);
      setError(error instanceof Error ? error.message : '獲取訂單數據時出錯');
    } finally {
      setIsLoading(false);
    }
  }, [orderId, orderDetailId]);

  // 馬上載入訂單數據
  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

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

  // 如果有選中的訂單詳情，顯示該詳情的資訊
  if (selectedOrderDetail) {
    return (
      <OrderDetailContainer>
        <OrderNavHeader title="訂單詳情" orderNumber={orderData.OrderNumber} />
        <ContentArea>
          <OrderCard>
            <CardHeader>
              <OrderTitle>
                {orderData.PlanName} {orderData.Liter}L/{orderData.PlanKG}kg
              </OrderTitle>
            </CardHeader>
            <DetailList>
              <DetailItem>
                <DetailLabel>服務日期</DetailLabel>
                <DetailValue>{selectedOrderDetail.ServiceDate}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>狀態</DetailLabel>
                <DetailValue>{selectedOrderDetail.Status}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>司機抵達時間</DetailLabel>
                <DetailValue>
                  {selectedOrderDetail.DriverTime || '未設定'}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>重量</DetailLabel>
                <DetailValue>{selectedOrderDetail.KG || '未記錄'}</DetailValue>
              </DetailItem>
            </DetailList>
          </OrderCard>
        </ContentArea>
      </OrderDetailContainer>
    );
  }

  // 分離不同狀態的訂單
  const abnormalOrders =
    orderData.OrderDetail?.filter((order) => order.Status === '異常') || [];
  const scheduledOrders =
    orderData.OrderDetail?.filter((order) =>
      ['已排定', '前往中', '已抵達'].includes(order.Status),
    ) || [];
  const unscheduledOrders =
    orderData.OrderDetail?.filter((order) => order.Status === '未排定') || [];
  const completedOrders =
    orderData.OrderDetail?.filter((order) => order.Status === '已完成') || [];

  // 計算全部任務數量
  const totalOrders = orderData.OrderDetail?.length || 0;

  // 渲染訂單列表
  const renderOrderList = (orders: CompletedOrderDetail[]) => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.ServiceDate.replace(/\//g, '-'));
      const dateB = new Date(b.ServiceDate.replace(/\//g, '-'));
      return dateA.getTime() - dateB.getTime();
    });

    return (
      <OrderList>
        {sortedOrders.map((order) => (
          <OrderListCard
            key={order.OrderDetailID}
            date={order.ServiceDate}
            time={order.ServiceTime}
            status={order.Status}
            orderDetailId={order.OrderDetailID}
            ordersId={orderData.OrdersID}
          />
        ))}
      </OrderList>
    );
  };

  return (
    <OrderDetailContainer>
      <OrderNavHeader title="方案詳情" orderNumber={orderData.OrderNumber} />

      <ContentArea>
        <OrderCard>
          <CardHeader>
            <OrderTitle>
              {orderData.PlanName} {orderData.Liter}L/{orderData.PlanKG}kg
            </OrderTitle>
          </CardHeader>

          <OrderPhotoArea>
            <PhotoContainer>
              {orderData.Photos?.map((photo, index) => {
                return (
                  <SinglePhotoContainer key={index}>
                    {photo ? (
                      <Photo
                        src={`${BASE_URL}${photo}`}
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
              <DetailLabel>方案期間</DetailLabel>
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

        <OrderListSection>
          {abnormalOrders.length > 0 && (
            <>
              <OrderListHeader>
                <OrderListTitle>異常任務</OrderListTitle>
              </OrderListHeader>
              {renderOrderList(abnormalOrders)}
            </>
          )}
          {scheduledOrders.length > 0 && (
            <>
              <OrderListHeader>
                <OrderListTitle>已排定任務</OrderListTitle>
              </OrderListHeader>
              {renderOrderList(scheduledOrders)}
            </>
          )}
          {unscheduledOrders.length > 0 && (
            <>
              <OrderListHeader>
                <OrderListTitle>未排定任務</OrderListTitle>
                <OrderListCal>
                  剩餘次數: {unscheduledOrders.length}/{totalOrders}
                </OrderListCal>
              </OrderListHeader>
              {renderOrderList(unscheduledOrders)}
            </>
          )}
          {completedOrders.length > 0 && (
            <>
              <OrderListHeader>
                <OrderListTitle>已結束任務</OrderListTitle>
              </OrderListHeader>
              {renderOrderList(completedOrders)}
            </>
          )}
        </OrderListSection>
      </ContentArea>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
