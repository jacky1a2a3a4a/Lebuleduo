import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  HiChevronLeft,
  HiExclamationCircle,
  HiPencil,
  HiMiniQrCode,
} from 'react-icons/hi2';
import OrderListCard from './OrderListCard';
import {
  LoadingMessage,
  ErrorMessage,
  EmptyMessage,
  OrderDetailContainer,
  NavHeader,
  BackButton,
  PageTitle,
  OrderID,
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
} from './styled';

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 返回上一頁
  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <LoadingMessage>載入中...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>錯誤: {error}</ErrorMessage>;
  }

  if (!orderData) {
    return <EmptyMessage>沒有找到訂單數據</EmptyMessage>;
  }

  // 分離已完成和未完成的訂單
  const completedOrders =
    orderData.OrderDetails?.filter((order) => order.Status === '已完成') || [];
  const upcomingOrders =
    orderData.OrderDetails?.filter((order) => order.Status === '未完成') || [];

  return (
    <OrderDetailContainer>
      {/* navbar */}
      <NavHeader>
        <BackButton onClick={handleBack}>
          <HiChevronLeft />
          <PageTitle>訂單詳情</PageTitle>
        </BackButton>
        <OrderID>訂單編號: {orderData.OrderNumber}</OrderID>
      </NavHeader>

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
              <EditButton>
                <HiPencil />
              </EditButton>
            </CardHeaderEditButtons>
          </CardHeader>

          <OrderPhotoArea>
            <PhotoContainer>
              {[0, 1].map((index) => {
                const imageUrl = orderData.OrderImageUrl?.[index];
                return (
                  <SinglePhotoContainer key={index}>
                    {imageUrl ? (
                      <Photo src={imageUrl} alt={`垃圾照片 ${index + 1}`} />
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
          {/* 已排定收運 */}
          <OrderListHeader>
            <OrderListTitle>已排定任務</OrderListTitle>
            <OrderListCal>
              剩餘次數: {upcomingOrders.length}/
              {upcomingOrders.length + completedOrders.length}
            </OrderListCal>
          </OrderListHeader>

          <OrderList>
            {upcomingOrders.map((order) => (
              <OrderListCard
                key={order.OrderDetailID}
                date={order.ServiceDate}
                time={order.DriverTime || '未排定'}
                status={order.Status}
                isActive={true}
                orderId={order.OrderDetailID}
              />
            ))}
          </OrderList>

          {/* 已完成收運 */}
          <OrderListHeader>
            <OrderListTitle>已結束任務</OrderListTitle>
          </OrderListHeader>

          <OrderList>
            {completedOrders.map((order) => (
              <OrderListCard
                key={order.OrderDetailID}
                date={order.ServiceDate}
                time={order.DriverTime || '未排定'}
                status={order.Status}
                isActive={false}
                orderId={order.OrderDetailID}
              />
            ))}
          </OrderList>
        </OrderListSection>
      </ContentArea>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
