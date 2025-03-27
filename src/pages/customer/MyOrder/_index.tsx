import styled from 'styled-components';
import { HiCalendar, HiTruck } from 'react-icons/hi2';

//最外層容器
const MyOrderSectionStyled = styled.section`
  background-color: var(--color-gray-200);
  width: 100%;
  height: 100%;
`;

// ===== 使用者卡片相關組件 =====

// 使用者卡片 最外層區塊
const UserCardSection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-bottom: var(--spacing-lg);
`;

// 空白區塊
const Blank = styled.div`
  background-color: transparent;
`;

// 使用者卡片
const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

// 使用者卡片 問候語
const UserGreeting = styled.h1`
  color: var(--color-gray-600);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
`;

// 使用者卡片 項目
const UserCardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// 使用者卡片 標題
const UserCardTitle = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// 使用者卡片 圖示
const UserIconItem = styled.div`
  color: var(--color-gray-600);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: var(--spacing-sm);
`;

// 使用者卡片 文字
const UserTextItem = styled.p`
  color: var(--color-gray-600);
`;

// 使用者卡片 內容
const UserCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

// ===== 進度條相關組件 =====

// 進度條 最外層區塊
const ProgressBarSection = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-lg);
`;

// 進度條 白底圓角容器
const BackgroundContainer = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-lg) 0;
`;

// 進度條 狀態 文字
const ProgressStatus = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: var(--spacing-sm);
`;

// 進度狀態 文字
const ProgressItem = styled.div<{ isActive?: boolean; isPassed?: boolean }>`
  // isActive 是否為當前狀態 900
  // isPassed 是否已通過 600
  // 已完成 400
  color: ${({ isActive, isPassed }) =>
    isActive
      ? 'var(--color-gray-900)'
      : isPassed
        ? 'var(--color-gray-600)'
        : 'var(--color-gray-400)'};

  font-weight: ${({ isActive, isPassed }) =>
    isActive || isPassed
      ? 'var(--font-weight-medium)'
      : 'var(--font-weight-normal)'};

  z-index: 1;
  position: relative;

  text-align: center;
  padding-top: var(--spacing-sm);

  font-size: var(--font-size-xs);
`;

// 進度條 容器
const ProgressBarContainer = styled.div`
  background-color: var(--color-gray-200);
  border-radius: 2px;

  position: relative;
  width: 100%;
  height: 2px;
  margin: var(--spacing-xl) 0 var(--spacing-xs);
`;

// 進度條填充
const ProgressBarFill = styled.div<{ progress: number }>`
  background-color: var(--color-gray-700);
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

// 進度圖標容器
const TruckIcon = styled.div<{ step: number }>`
  position: absolute;
  z-index: 3;
  top: -40px;
  left: ${({ step }) =>
    step === 0 ? '38px' : step === 1 ? '50%' : 'calc(100% - 38px)'};
  transform: ${({ step }) =>
    step === 0
      ? 'translateX(0)'
      : step === 2
        ? 'translateX(-100%)'
        : 'translateX(-50%)'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s ease;

  svg {
    color: var(--color-gray-900);
    width: 25px;
    height: 25px;
  }
`;

// 進度點
const ProgressDot = styled.div<{
  position: number;
  isActive?: boolean;
  isPassed?: boolean;
}>`
  position: absolute;
  left: ${({ position }) =>
    position === 0 ? '50px' : position === 50 ? '50%' : 'calc(100% - 50px)'};
  top: 50%;
  transform: ${({ position }) =>
    position === 0
      ? 'translateY(-50%)'
      : position === 100
        ? 'translate(-100%, -50%)'
        : 'translate(-50%, -50%)'};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ isActive, isPassed }) =>
    isActive || isPassed ? 'var(--color-gray-900)' : 'var(--color-gray-400)'};
  z-index: 2;
`;

// ===== 訂單卡片相關組件 =====

// 訂單列表 區塊
const OrderListSection = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */
  width: 100%;
  padding: var(--spacing-12);
`;

// 訂單列表 容器
const OrderList = styled.div`
  /* background-color: var(--color-gray-100); */
`;

// 訂單卡片 容器
const OrderCard = styled.div`
  background-color: var(--color-gray-0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-12);
  width: 100%;
`;

// 訂單卡片 排版
const OrderCardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  width: 100%;
  margin-bottom: var(--spacing-12);
`;

// 訂單照片容器
const OrderPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: var(--spacing-12);
`;

// 訂單照片 - 無圖片時的佔位元素
const OrderPhoto = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 80%;
  aspect-ratio: 1/1;
  overflow: hidden;
`;

// 訂單照片圖片
const OrderPhotoImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: var(--border-radius-lg);
  object-fit: cover;
`;

// 訂單 文字資訊
const OrderCardData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
`;

// 訂單卡片 標題
const OrderCardTitle = styled.p`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-xs);
`;

// 訂單卡片 項目容器
const OrderCardItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
`;

// 訂單卡片 項目
const OrderCardItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: var(--spacing-xs);
`;

// 訂單卡片 副標題
const OrderCardSubtitle = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  min-width: 70px;
  flex-shrink: 0;
`;

// 訂單卡片 詳情
const OrderCardDetail = styled.p`
  color: var(--color-gray-700);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  flex: 1;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 訂單卡片 按鈕
const OrderCardButton = styled.button`
  background-color: var(--color-gray-600);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-gray-800);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function MyOrder() {
  // 假設當前訂單狀態是「待收運」(可以從API或狀態管理中獲取)
  const currentStep = 1; // 0:待收運, 1:前往中, 2:已完成
  const progress = (currentStep / 2) * 100; // 計算進度百分比，由於有3個步驟(0-2)，所以除以2

  const orderSteps = [
    { label: '待收運', position: 0 },
    { label: '前往中', position: 50 },
    { label: '已完成', position: 100 },
  ];

  // 假設這是圖片URL，實際開發時可從API獲取
  const productImageUrl = '../../public/user_trash_photo_test.jpg';

  return (
    <MyOrderSectionStyled>
      <UserCardSection>
        <UserCard>
          <UserGreeting>您好，尊貴的會員</UserGreeting>

          <UserCardItem>
            <UserCardTitle>
              <UserIconItem>
                <HiCalendar />
              </UserIconItem>
              <UserTextItem>2025/03/25</UserTextItem>
            </UserCardTitle>
            <UserCardContent>10:00 - 11:00</UserCardContent>
          </UserCardItem>

          <UserCardItem>
            <UserCardTitle>
              <UserIconItem>
                <HiTruck />
              </UserIconItem>
              <UserTextItem>訂單狀態</UserTextItem>
            </UserCardTitle>
            <UserCardContent>前往中</UserCardContent>
          </UserCardItem>
        </UserCard>
        <Blank />
      </UserCardSection>

      <ProgressBarSection>
        <BackgroundContainer>
          {/* 進度條 */}
          <ProgressBarContainer>
            {/* 進度條填充 */}
            <ProgressBarFill progress={progress} />

            {/* 進度圖標 */}
            <TruckIcon step={currentStep}>
              <HiTruck />
            </TruckIcon>

            {/* 進度點 */}
            {orderSteps.map((step, index) => (
              <ProgressDot
                key={index}
                position={step.position}
                isActive={index === currentStep}
                isPassed={index < currentStep}
              />
            ))}
          </ProgressBarContainer>

          {/* 進度文字 */}
          <ProgressStatus>
            {orderSteps.map((step, index) => (
              <ProgressItem
                key={index}
                isActive={index === currentStep}
                isPassed={index < currentStep}
              >
                {step.label}
              </ProgressItem>
            ))}
          </ProgressStatus>
        </BackgroundContainer>
      </ProgressBarSection>

      <OrderListSection>
        <OrderList>
          <OrderCard>
            <OrderCardLayout>
              <OrderPhotoContainer>
                {productImageUrl ? (
                  <OrderPhotoImage src={productImageUrl} alt="訂單商品" />
                ) : (
                  <OrderPhoto />
                )}
              </OrderPhotoContainer>

              <OrderCardData>
                <OrderCardTitle>標準方案 50L/10kg</OrderCardTitle>
                <OrderCardItems>
                  <OrderCardItem>
                    <OrderCardSubtitle>方案期間</OrderCardSubtitle>
                    <OrderCardDetail>2025/03/25 - 2025/04/25</OrderCardDetail>
                  </OrderCardItem>

                  <OrderCardItem>
                    <OrderCardSubtitle>下次收運</OrderCardSubtitle>
                    <OrderCardDetail>2025/04/04</OrderCardDetail>
                  </OrderCardItem>

                  <OrderCardItem>
                    <OrderCardSubtitle>剩餘次數</OrderCardSubtitle>
                    <OrderCardDetail>7</OrderCardDetail>
                  </OrderCardItem>
                </OrderCardItems>
              </OrderCardData>
            </OrderCardLayout>

            <OrderCardButton>查看訂單</OrderCardButton>
          </OrderCard>
        </OrderList>
      </OrderListSection>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
