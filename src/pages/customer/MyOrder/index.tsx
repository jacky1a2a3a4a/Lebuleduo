import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdError, MdArrowCircleRight } from 'react-icons/md';
import dogImage from '../../../assets/images/img-Lebuledou-lying.png';
import dogTruckImage from '../../../assets/images/img-Lebuledou-truck.png';
import ErrorReport from '../../../components/common/ErrorReport';
import AnimationLoading from '../../../components/common/AnimationLoading';
import { getCustomerGreeting } from '../../../utils/getGreeting';

import {
  OrderStep,
  TabType,
  ApiTodayOrder,
  ApiCurrentOrder,
  ApiCompletedOrder,
} from './types';
import {
  MyOrderSectionStyled,
  UserCardSection,
  UserCard,
  UserGreeting,
  UserCardItem,
  UserCardItemColumn,
  UserCardTitle,
  UserCardButton,
  UserCardDate,
  UserCardTime,
  ImageContainer,
  DogImage,
  ProgressBarSection,
  BackgroundContainer,
  ProgressBarContainer,
  ProgressBarFill,
  ProgressDotContainer,
  DogTruckImage,
  ProgressDot,
  ProgressStatus,
  ProgressItem,
  OrderContainer,
  TabContainer,
  TabItem,
  OrderListSection,
  OrderList,
  OrderCard,
  OrderCardLayout,
  OrderPhotoContainer,
  OrderPhotoImage,
  OrderPhoto,
  OrderCardData,
  OrderCardTitle,
  OrderCardItems,
  OrderCardItem,
  OrderCardSubtitle,
  OrderCardDetail,
} from './styled';

import { getUsersID, getUserName } from '../../../utils/getUserLocalData';

// 照片用URL
const BASE_URL = import.meta.env.VITE_API_URL;
const userID = getUsersID();
const userName = getUserName();

console.log('userID', userID);
console.log('userName', userName);

// 組件本體
function MyOrder() {
  const navigate = useNavigate();

  // 使用者今日數據狀態(以請後端暫時改成明天20250503)
  const [todayData, setTodayData] = useState<ApiTodayOrder | null>(null);
  const todayDataStatus = todayData?.status || '未排定'; // 如果沒有數據，默認為'未排定'
  console.log('todayDataStatus', todayDataStatus);

  // 根據狀態設定 currentStep
  let currentStep = 0;
  if (todayDataStatus === '未排定') {
    currentStep = 0;
  } else if (todayDataStatus === '前往中') {
    currentStep = 0;
  } else if (todayDataStatus === '已抵達') {
    currentStep = 1;
  } else if (todayDataStatus === '已完成') {
    currentStep = 2;
  } else if (todayDataStatus === '異常') {
    currentStep = 2; // 異常狀態也設為第一步
  }

  // 收運進度條 步驟
  // 計算進度百分比，根據 currentStep 的值 (0, 1, 2) 轉換為 (0%, 50%, 100%)
  const progress = currentStep * 50;

  // 收運進度條
  const orderSteps: OrderStep[] = [
    { label: '前往中', position: 0 },
    { label: '已抵達', position: 50 },
    { label: '已完成', position: 100 },
  ];

  // 訂單數據狀態
  const [currentOrders, setCurrentOrders] = useState<ApiCurrentOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<ApiCompletedOrder[]>(
    [],
  );

  // 標籤狀態管理
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    // 從 localStorage 讀取上次的標籤狀態
    const savedTab = localStorage.getItem('activeCategory_customer');
    return (savedTab as TabType) || 'current';
  });

  const [isLoading, setIsLoading] = useState<boolean>(true); // 載入狀態
  // const testLoading = true; //測試用狀態
  const [error, setError] = useState<string | null>(null); // 錯誤訊息

  // 處理標籤切換，確保只在標籤不同時進行切換
  const handleTabClick = (tab: TabType) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      // 將新的標籤狀態保存到 localStorage
      localStorage.setItem('activeCategory_customer', tab);
    }
  };

  // 處理當前方案詳情 按鈕點擊
  const handleOrderDetailCurrentClick = (orderId: number) => {
    navigate(`/customer/order-detail/current/${orderId}`);
  };

  // 處理已結束方案詳情 按鈕點擊
  const handleOrderDetailCompletedClick = (orderId: number) => {
    navigate(`/customer/order-detail/completed/${orderId}`);
  };

  // 從API獲取數據
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // API使用代理路徑
        const userTodayAPI_Path = `/api/GET/user/dashboard/today/${userID}`;
        const currentOrdersAPI_Path = `/api/GET/user/orders/${userID}`;
        const completedOrdersAPI_Path = `/api/GET/user/orders/completed/${userID}`;

        // 分別調用API獲取數據
        // 使用者今日數據
        const userTodayResponse = await fetch(userTodayAPI_Path);
        if (!userTodayResponse.ok) {
          throw new Error(`使用者今日API請求失敗：${userTodayResponse.status}`);
        }
        const TodayData = await userTodayResponse.json();
        if (!TodayData || !TodayData.result) {
          throw new Error('使用者今日數據格式錯誤');
        }
        setTodayData(TodayData.result);
        console.log('使用者今日數據:', TodayData.result);

        // 當前方案數據
        const currentResponse = await fetch(currentOrdersAPI_Path);
        if (!currentResponse.ok) {
          throw new Error(`當前訂單API請求失敗：${currentResponse.status}`);
        }
        const currentData = await currentResponse.json();
        if (!currentData || !currentData.result) {
          setCurrentOrders([]);
        } else if (Array.isArray(currentData.result)) {
          setCurrentOrders(currentData.result);
        }
        console.log('當前方案數據:', currentData.result);

        // 已結束方案數據
        // const completedResponse = await fetch(completedOrdersAPI_Path);
        // if (!completedResponse.ok) {
        //   throw new Error(`已完成訂單API請求失敗：${completedResponse.status}`);
        // }
        // const completedData = await completedResponse.json();
        // if (!completedData || !completedData.result) {
        //   setCompletedOrders([]);
        // } else if (Array.isArray(completedData.result)) {
        //   setCompletedOrders(completedData.result);
        // }
        // console.log('已完成方案數據:', completedData.result);
        setCompletedOrders([]); // 暫時使用空數組

        // 檢查是否有任何訂單數據
        const hasCurrentOrders =
          Array.isArray(currentData?.result) && currentData.result.length > 0;
        // const hasCompletedOrders =
        //   Array.isArray(completedData?.result) &&
        //   completedData.result.length > 0;
        const hasCompletedOrders = false; // 暫時設為 false

        if (!hasCurrentOrders && !hasCompletedOrders) {
          setError('目前沒有訂單數據');
        }
      } catch (err) {
        console.error('獲取訂單數據失敗:', err);
        setError(
          err instanceof Error ? err.message : '獲取訂單數據失敗，請稍後再試',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userID, userName]);

  return (
    <MyOrderSectionStyled>
      <UserCardSection>
        {/* 使用者資訊 */}
        <UserCard>
          <UserGreeting>
            {getCustomerGreeting()}，{userName}
          </UserGreeting>

          <UserCardItem>
            <UserCardTitle>今日任務</UserCardTitle>
            {/* <UserCardButton>
              查看詳情
              <MdArrowCircleRight />
            </UserCardButton> */}
          </UserCardItem>

          <UserCardItemColumn>
            <UserCardDate>{todayData?.date || '-'}</UserCardDate>
            <UserCardTime>{todayData?.driverTime || '今天無任務'}</UserCardTime>
          </UserCardItemColumn>
        </UserCard>

        {/* 狗圖 */}
        <ImageContainer>
          <DogImage src={dogImage} alt="趴趴狗" />
        </ImageContainer>
      </UserCardSection>

      <ProgressBarSection>
        <BackgroundContainer>
          {/* 進度條 */}
          <ProgressBarContainer>
            {/* 進度條填充 */}
            <ProgressBarFill $progress={progress} />

            {/* 進度點 */}
            <ProgressDotContainer>
              <DogTruckImage
                src={dogTruckImage}
                alt="狗車"
                $progress={progress}
              />
              {orderSteps.map((step, index) => (
                <ProgressDot
                  key={index}
                  $position={step.position}
                  $isActive={index === currentStep}
                  $isPassed={index < currentStep}
                />
              ))}
            </ProgressDotContainer>
          </ProgressBarContainer>

          {/* 進度文字 */}
          <ProgressStatus>
            {orderSteps.map((step, index) => (
              <ProgressItem
                key={index}
                $isActive={index === currentStep}
                $isPassed={index < currentStep}
                $isUnscheduled={todayDataStatus === '未排定'}
              >
                {step.label}
              </ProgressItem>
            ))}
          </ProgressStatus>
        </BackgroundContainer>
      </ProgressBarSection>

      {/* 訂單列表 */}
      <OrderContainer>
        {/* 訂單列表標籤 */}
        <TabContainer>
          <TabItem
            $isActive={activeTab === 'current'}
            onClick={() => handleTabClick('current')}
          >
            當前訂單
          </TabItem>
          <TabItem
            $isActive={activeTab === 'completed'}
            onClick={() => handleTabClick('completed')}
          >
            已結束訂單
          </TabItem>
        </TabContainer>

        {/* 訂單列表 */}
        <OrderListSection>
          {isLoading ? (
            <AnimationLoading size="mini" animationType="moving" />
          ) : error ? (
            <ErrorReport
              title="目前沒有訂單"
              error=""
              showImage={true}
              titleColor="var(--color-primary)"
            />
          ) : (
            <OrderList>
              {activeTab === 'current' ? (
                currentOrders.length > 0 ? (
                  currentOrders.map((currentOrder) => {
                    // 使用解構賦值提取需要的屬性
                    const {
                      OrdersID,
                      PlanName,
                      PlanKG,
                      Liter,
                      Photos,
                      RemainingCount,
                      StartDate,
                      EndDate,
                      NextServiceDate,
                    } = currentOrder;

                    return (
                      <OrderCard
                        key={OrdersID}
                        onClick={() => handleOrderDetailCurrentClick(OrdersID)}
                      >
                        <OrderCardLayout>
                          <OrderPhotoContainer>
                            {Photos && Photos.length > 0 ? (
                              <OrderPhotoImage
                                src={`${BASE_URL}${Photos[0]}`}
                                alt="訂單商品"
                              />
                            ) : (
                              <OrderPhoto>
                                <MdError />
                              </OrderPhoto>
                            )}
                          </OrderPhotoContainer>

                          <OrderCardData>
                            <OrderCardTitle>
                              {PlanName} {Liter}L/{PlanKG}kg
                            </OrderCardTitle>
                            <OrderCardItems>
                              <OrderCardItem>
                                <OrderCardSubtitle $primary>
                                  下次收運
                                </OrderCardSubtitle>
                                <OrderCardDetail $primary>
                                  {NextServiceDate}
                                </OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle $primary>
                                  剩餘次數
                                </OrderCardSubtitle>
                                <OrderCardDetail $primary>
                                  {RemainingCount}
                                </OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle>開始時間</OrderCardSubtitle>
                                <OrderCardDetail>{StartDate}</OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle>結束時間</OrderCardSubtitle>
                                <OrderCardDetail>{EndDate}</OrderCardDetail>
                              </OrderCardItem>
                            </OrderCardItems>
                          </OrderCardData>
                        </OrderCardLayout>
                      </OrderCard>
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    無當前訂單
                  </div>
                )
              ) : completedOrders.length > 0 ? (
                completedOrders.map((completedOrder) => {
                  const {
                    OrdersID,
                    PlanName,
                    PlanKG,
                    Liter,
                    Photos,
                    StartDate,
                    EndDate,
                  } = completedOrder;

                  return (
                    <OrderCard
                      key={OrdersID}
                      onClick={() => handleOrderDetailCompletedClick(OrdersID)}
                    >
                      <OrderCardLayout>
                        <OrderPhotoContainer>
                          {Photos && Photos.length > 0 ? (
                            <OrderPhotoImage
                              src={`${BASE_URL}${Photos[0]}`}
                              alt="訂單商品"
                            />
                          ) : (
                            <OrderPhoto>
                              <MdError />
                            </OrderPhoto>
                          )}
                        </OrderPhotoContainer>

                        <OrderCardData>
                          <OrderCardTitle>
                            {PlanName} {Liter}L/{PlanKG}kg
                          </OrderCardTitle>
                          <OrderCardItems>
                            <OrderCardItem>
                              <OrderCardSubtitle>開始時間</OrderCardSubtitle>
                              <OrderCardDetail>{StartDate}</OrderCardDetail>
                            </OrderCardItem>

                            <OrderCardItem>
                              <OrderCardSubtitle>結束時間</OrderCardSubtitle>
                              <OrderCardDetail>{EndDate}</OrderCardDetail>
                            </OrderCardItem>
                          </OrderCardItems>
                        </OrderCardData>
                      </OrderCardLayout>
                    </OrderCard>
                  );
                })
              ) : (
                <ErrorReport
                  title="目前沒有訂單"
                  error=""
                  showImage={true}
                  titleColor="var(--color-primary)"
                />
              )}
            </OrderList>
          )}
        </OrderListSection>
      </OrderContainer>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
