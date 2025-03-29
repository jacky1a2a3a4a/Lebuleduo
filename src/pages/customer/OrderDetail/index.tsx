import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { HiChevronLeft, HiExclamationCircle } from 'react-icons/hi2';
import OrderListCard from './OrderListCard';

// 頁面容器
const OrderDetailContainer = styled.div`
  background-color: var(--color-gray-0);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: 768px) {
    max-width: 480px;
    margin: 0 auto;
    border-left: 1px solid var(--color-gray-300);
    border-right: 1px solid var(--color-gray-300);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

// 導航欄
const NavHeader = styled.div`
  background-color: var(--color-gray-0);
  padding: var(--spacing-12);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 返回按鈕
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--color-gray-800);
  font-size: var(--font-size-xl);
  padding: var(--spacing-xs);
  border-radius: 50%;

  &:hover {
    background-color: var(--color-gray-100);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 頁面標題
const PageTitle = styled.h1`
  color: var(--color-gray-800);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
`;

const OrderID = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

//// 內容區域 最外層容器
const ContentArea = styled.div`
  padding: 0 var(--spacing-12);
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-300);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-gray-100);
    border-radius: 3px;
  }
`;

// 訂單卡片
const OrderCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

// 訂單標題
const OrderTitle = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-gray-200);
`;

// 訂單照片區域
const OrderPhotoArea = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 訂單照片標題
// const PhotoTitle = styled.h3`
//   color: var(--color-gray-600);
//   font-size: var(--font-size-sm);
//   font-weight: var(--font-weight-medium);
//   margin-bottom: var(--spacing-sm);
//   display: flex;
//   align-items: center;
// `;

// 照片容器
const PhotoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-sm);
  width: 50%;
`;

// 單張照片容器
const SinglePhotoContainer = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 100%;
  overflow: hidden;
  aspect-ratio: 3/4;
`;

// 照片
const Photo = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

// 無照片時的佔位元素
const NoPhotoPlaceholder = styled.div`
  background-color: var(--color-gray-200);
  color: var(--color-gray-400);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: var(--font-size-xl);
`;

// 訂單詳情列表
const DetailList = styled.div`
  display: flex;
  flex-direction: column;
`;

// 收運 詳情項
const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 收運 詳情標籤
const DetailLabel = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
`;

// 收運 詳情值
const DetailValue = styled.div`
  color: var(--color-gray-800);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 收運列表區塊
const OrderListSection = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-12);
  margin-bottom: var(--spacing-md);
`;

// 收運列表標題區塊
const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-gray-200);
`;

// 收運列表標題
const OrderListTitle = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`;

// 收運次數
const OrderListCal = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 收運列表
const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
`;

function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  // 模擬訂單數據獲取
  // 實際應用中，這裡會根據orderId從API獲取數據
  const orderData = {
    id: orderId,
    title: '標準方案 50L/10kg',
    startDate: '2025/03/25',
    endDate: '2025/04/25',
    pickupDay: ['每週一', '每週三', '每週五'],
    nextPickup: '2025/04/04',
    remainingPickups: 7,
    status: '前往中', // 待收運, 前往中, 已完成
    imageUrl1: '../../public/user_trash_photo_test.jpg',
    imageUrl2: '../../public/user_trash_photo_test.jpg',
    address: '高雄市三民區和平一路 123 號 5F',
  };

  // 返回上一頁
  const handleBack = () => {
    navigate(-1);
  };

  // 計算剩餘收運次數
  const calculateRemainingPickups = () => {
    const startDate = new Date(orderData.startDate);
    const endDate = new Date(orderData.endDate);
    const today = new Date();

    // 計算總收運日數
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const weeks = Math.ceil(totalDays / 7);
    const totalPickups = weeks * orderData.pickupDay.length;

    // 計算已過收運日數
    const passedDays = Math.ceil(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const passedWeeks = Math.floor(passedDays / 7);
    const passedPickups = passedWeeks * orderData.pickupDay.length;

    // 計算剩餘次數
    const remaining = totalPickups - passedPickups;

    return Math.max(0, remaining);
  };

  const remainingPickups = calculateRemainingPickups();

  return (
    <OrderDetailContainer>
      <NavHeader>
        <BackButton onClick={handleBack}>
          <HiChevronLeft />
          <PageTitle>訂單詳情</PageTitle>
        </BackButton>
        <OrderID>訂單編號: {orderData.id}</OrderID>
      </NavHeader>

      <ContentArea>
        <OrderCard>
          <OrderTitle>{orderData.title}</OrderTitle>

          <OrderPhotoArea>
            <DetailLabel>放置定點</DetailLabel>
            <PhotoContainer>
              <SinglePhotoContainer>
                {orderData.imageUrl1 ? (
                  <Photo src={orderData.imageUrl1} alt="垃圾照片 1" />
                ) : (
                  <NoPhotoPlaceholder>
                    <HiExclamationCircle />
                  </NoPhotoPlaceholder>
                )}
              </SinglePhotoContainer>
              <SinglePhotoContainer>
                {orderData.imageUrl2 ? (
                  <Photo src={orderData.imageUrl2} alt="垃圾照片 2" />
                ) : (
                  <NoPhotoPlaceholder>
                    <HiExclamationCircle />
                  </NoPhotoPlaceholder>
                )}
              </SinglePhotoContainer>
            </PhotoContainer>
          </OrderPhotoArea>

          <DetailList>
            <DetailItem>
              <DetailLabel>方案期間</DetailLabel>
              <DetailValue>
                {orderData.startDate} - {orderData.endDate}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>每周收運日</DetailLabel>
              <DetailValue>{orderData.pickupDay.join('、')}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>收運地址</DetailLabel>
              <DetailValue>{orderData.address}</DetailValue>
            </DetailItem>
          </DetailList>
        </OrderCard>

        {/* 已排定收運 */}
        <OrderListSection>
          <OrderListHeader>
            <OrderListTitle>已排定收運</OrderListTitle>
            <OrderListCal>剩餘次數: {remainingPickups}</OrderListCal>
          </OrderListHeader>

          <OrderList>
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />
            <OrderListCard
              date={orderData.nextPickup}
              time="10:00-11:00"
              status="已排定"
              isActive={true}
            />


          </OrderList>
        </OrderListSection>
      </ContentArea>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
