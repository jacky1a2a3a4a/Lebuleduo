import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { HiExclamationCircle, HiPencil, HiMiniQrCode } from 'react-icons/hi2';
import OrderListCard from './OrderListCard';
import {
  ErrorMessage,
  EmptyMessage,
  OrderDetailContainer,
  ContentArea,
  OrderCard,
  CardHeader,
  OrderTitle,
  CardHeaderEditButtons,
  EditButton,
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
  TabContainer,
  Tab,
  TabContent,
} from './styled';
import OrderNavHeader from '../../../components/customer/OrderNavHeader';
import LoadingMessage from '../../../components/common/LoadingMessage';
// 虛擬機URL
const BASE_URL = 'https://lebuleduo.rocket-coding.com';

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId, orderDetailId } = useParams<{
    orderId: string;
    orderDetailId: string;
  }>();
  const [orderData, setOrderData] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('全部');

  // 獲取訂單數據的函數
  const fetchOrderData = useCallback(async () => {
    try {
      setIsLoading(true);
      const usersId = localStorage.getItem('UsersID');
      console.log('正在請求訂單數據，參數：', {
        usersId,
        orderId,
      });

      const response = await fetch(
        `/api/GET/user/orders/${usersId}/${orderId}`,
      );
      const data = await response.json();

      console.log('API 回傳數據：', data);

      if (data.status) {
        console.log('訂單詳情數據：', data.result[0]);
        console.log('OrderDetail 數據：', data.result[0].OrderDetails);
        setOrderData(data.result[0]);

        // 如果有 orderDetailId，找到對應的訂單詳情
        if (orderDetailId) {
          const detail = data.result[0].OrderDetails.find(
            (detail) => detail.OrderDetailID.toString() === orderDetailId,
          );
          if (detail) {
            setSelectedOrderDetail(detail);
          }
        }
      } else {
        console.error('API 回傳錯誤：', data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('獲取訂單數據時出錯：', error);
      setError('獲取訂單數據時出錯');
    } finally {
      setIsLoading(false);
    }
  }, [orderId, orderDetailId]);

  // 馬上載入訂單數據
  useEffect(() => {
    if (orderId) {
      fetchOrderData();
    }
  }, [orderId, fetchOrderData]);

  // 載入中
  if (isLoading) {
    return <LoadingMessage />;
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

  // 渲染訂單列表
  const renderOrderList = (orders) => {
    // 如果是未排定任務或全部標籤下的未排定任務，則按照時間順序排序
    const sortedOrders =
      activeTab === '未排定' ||
      (activeTab === '全部' &&
        orders.some((order) => order.Status === '未排定'))
        ? [...orders].sort((a, b) => {
            // 將日期字串轉換為 Date 對象進行比較
            const dateA = new Date(a.ServiceDate.replace(/\//g, '-'));
            const dateB = new Date(b.ServiceDate.replace(/\//g, '-'));
            return dateA.getTime() - dateB.getTime();
          })
        : orders;

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
            usersId={parseInt(localStorage.getItem('UsersID') || '0')}
            onDateModified={fetchOrderData}
          />
        ))}
      </OrderList>
    );
  };

  // 依照標籤，渲染對應任務區塊
  const renderTabContent = () => {
    switch (activeTab) {
      case '全部':
        return (
          <>
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
          </>
        );
      case '已排定':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>已排定任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(scheduledOrders)}
          </>
        );
      case '未排定':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>未排定任務</OrderListTitle>
              <OrderListCal>
                剩餘次數: {unscheduledOrders.length}/{totalOrders}
              </OrderListCal>
            </OrderListHeader>
            {renderOrderList(unscheduledOrders)}
          </>
        );
      case '已結束':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>已結束任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(completedOrders)}
          </>
        );
      case '異常':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>異常任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(abnormalOrders)}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <OrderDetailContainer>
      {/* navbar */}
      <OrderNavHeader title="訂單詳情" orderNumber={orderData.OrderNumber} />

      <ContentArea>
        {/* 方案卡片 */}
        <OrderCard>
          <CardHeader>
            <OrderTitle>
              {orderData.PlanName} {orderData.Liter}L/{orderData.PlanKG}kg
            </OrderTitle>
            <CardHeaderEditButtons>
              <EditButton>
                <HiMiniQrCode />
              </EditButton>
              <EditButton
                onClick={() =>
                  navigate(`/customer/order/${orderId}/edit`, {
                    state: {
                      orderData,
                    },
                  })
                }
              >
                <HiPencil />
              </EditButton>
            </CardHeaderEditButtons>
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

        {/* 收運任務 */}
        <OrderListSection>
          {/* 收運任務 標籤 */}
          <TabContainer>
            <Tab
              $active={activeTab === '全部'}
              onClick={() => setActiveTab('全部')}
            >
              全部 ({totalOrders})
            </Tab>
            <Tab
              $active={activeTab === '已排定'}
              onClick={() => setActiveTab('已排定')}
            >
              已排定 ({scheduledOrders.length})
            </Tab>
            <Tab
              $active={activeTab === '未排定'}
              onClick={() => setActiveTab('未排定')}
            >
              未排定 ({unscheduledOrders.length})
            </Tab>
            <Tab
              $active={activeTab === '已結束'}
              onClick={() => setActiveTab('已結束')}
            >
              已結束 ({completedOrders.length})
            </Tab>
            <Tab
              $active={activeTab === '異常'}
              onClick={() => setActiveTab('異常')}
            >
              異常 ({abnormalOrders.length})
            </Tab>
          </TabContainer>

          {/* 任務內容 */}
          <TabContent>{renderTabContent()}</TabContent>
        </OrderListSection>
      </ContentArea>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
