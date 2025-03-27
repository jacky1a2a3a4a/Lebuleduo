import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { HiArrowLeft, HiCalendar, HiTruck, HiPhoto } from 'react-icons/hi2';

// 頁面容器
const OrderDetailContainer = styled.div`
  background-color: var(--color-gray-200);
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
  padding: var(--spacing-md) var(--spacing-12);
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  margin-right: var(--spacing-md);
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

// 內容區域
const ContentArea = styled.div`
  padding: var(--spacing-lg);
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
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-12);
  margin-bottom: var(--spacing-md);
`;

// 訂單標題
const OrderTitle = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-lg);
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
const PhotoTitle = styled.h3`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;

  svg {
    margin-right: var(--spacing-sm);
  }
`;

// 照片容器
const PhotoContainer = styled.div`
  width: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
  background-color: var(--color-gray-200);
`;

// 照片
const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 訂單詳情列表
const DetailList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
`;

// 詳情項
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

// 詳情標籤
const DetailLabel = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  margin-bottom: var(--spacing-xs);
`;

// 詳情值
const DetailValue = styled.div`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 狀態卡片
const StatusCard = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-12);
  margin-bottom: var(--spacing-md);
`;

// 狀態標題
const StatusTitle = styled.h2`
  color: var(--color-gray-800);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;

  svg {
    margin-right: var(--spacing-sm);
  }
`;

// 狀態項目
const StatusItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

// 狀態指示器
const StatusIndicator = styled.div<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--color-gray-800)' : 'var(--color-gray-300)'};
  margin-right: var(--spacing-sm);
`;

// 狀態文字
const StatusText = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? 'var(--color-gray-800)' : 'var(--color-gray-500)'};
  font-weight: ${({ isActive }) =>
    isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'};
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
    nextPickup: '2025/04/04',
    remainingPickups: 7,
    status: '前往中', // 待收運, 前往中, 已完成
    imageUrl: '../../public/user_trash_photo_test.jpg',
  };

  // 根據訂單狀態決定當前步驟
  const getCurrentStep = (status: string) => {
    switch (status) {
      case '待收運':
        return 0;
      case '前往中':
        return 1;
      case '已完成':
        return 2;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep(orderData.status);

  // 返回上一頁
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <OrderDetailContainer>
      <NavHeader>
        <BackButton onClick={handleBack}>
          <HiArrowLeft />
        </BackButton>
        <PageTitle>訂單詳情</PageTitle>
      </NavHeader>

      <ContentArea>
        <OrderCard>
          <OrderTitle>{orderData.title}</OrderTitle>

          <OrderPhotoArea>
            <PhotoTitle>
              <HiPhoto />
              垃圾照片
            </PhotoTitle>
            <PhotoContainer>
              {orderData.imageUrl ? (
                <Photo src={orderData.imageUrl} alt="垃圾照片" />
              ) : (
                <div>無照片</div>
              )}
            </PhotoContainer>
          </OrderPhotoArea>

          <DetailList>
            <DetailItem>
              <DetailLabel>下次收運</DetailLabel>
              <DetailValue>{orderData.nextPickup}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>剩餘次數</DetailLabel>
              <DetailValue>{orderData.remainingPickups}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>開始時間</DetailLabel>
              <DetailValue>{orderData.startDate}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>結束時間</DetailLabel>
              <DetailValue>{orderData.endDate}</DetailValue>
            </DetailItem>
          </DetailList>
        </OrderCard>

        <StatusCard>
          <StatusTitle>
            <HiTruck />
            收運狀態
          </StatusTitle>

          <StatusItem>
            <StatusIndicator isActive={currentStep >= 0} />
            <StatusText isActive={currentStep === 0}>待收運</StatusText>
          </StatusItem>

          <StatusItem>
            <StatusIndicator isActive={currentStep >= 1} />
            <StatusText isActive={currentStep === 1}>前往中</StatusText>
          </StatusItem>

          <StatusItem>
            <StatusIndicator isActive={currentStep >= 2} />
            <StatusText isActive={currentStep === 2}>已完成</StatusText>
          </StatusItem>
        </StatusCard>
      </ContentArea>
    </OrderDetailContainer>
  );
}

export default OrderDetail;
