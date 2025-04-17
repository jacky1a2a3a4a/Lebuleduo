import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiExclamationCircle, HiPencil, HiMiniQrCode } from 'react-icons/hi2';
import OrderListCard from './OrderListCard';
import {
  LoadingMessage,
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

// 虛擬機URL
const BASE_URL = 'http://lebuleduo.rocket-coding.com';

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('全部');

  // 馬上載入訂單數據
  useEffect(() => {
    const fetchOrderData = async () => {
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
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  // 載入中
  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
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

  // 渲染訂單列表
  const renderOrderList = (orders) => (
    <OrderList>
      {orders.map((order) => (
        <OrderListCard
          key={order.OrderDetailID}
          date={order.ServiceDate}
          time={order.DriverTime || '未排定'}
          status={order.Status}
          isActive={order.Status !== '已完成'}
          orderId={order.OrderDetailID}
        />
      ))}
    </OrderList>
  );

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
