import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiTruck, HiExclamationCircle } from 'react-icons/hi2';
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
  UserCardTitle,
  UserTextItem,
  UserCardContent,
  OrderStatus,
  Blank,
  ProgressBarSection,
  BackgroundContainer,
  ProgressBarContainer,
  ProgressBarFill,
  TruckIcon,
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

// 組件本體
function MyOrder() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
  const userName = userData.displayName || '尊貴的會員';
  const userId = localStorage.getItem('UsersID'); // 從localStorage獲取用戶ID

  // 使用者今日數據狀態
  const [todayData, setTodayData] = useState<ApiTodayOrder | null>(null);
  const todayDataStatus = todayData?.status || '未完成'; // 如果沒有數據，默認為'未完成'

  // 根據狀態設定 currentStep
  let currentStep = 0;
  if (todayDataStatus === '未完成') {
    currentStep = 0;
  } else if (todayDataStatus === '前往中') {
    currentStep = 1;
  } else if (todayDataStatus === '已完成') {
    currentStep = 2;
  }

  //// 收運進度條 步驟
  // 計算進度百分比，由於有3個步驟(0-2)，所以除以2
  const progress = (currentStep / 2) * 100;

  // 收運進度條
  const orderSteps: OrderStep[] = [
    { label: '未完成', position: 0 },
    { label: '前往中', position: 50 },
    { label: '已完成', position: 100 },
  ];

  // 訂單數據狀態
  const [currentOrders, setCurrentOrders] = useState<ApiCurrentOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<ApiCompletedOrder[]>(
    [],
  );

  const [activeTab, setActiveTab] = useState<TabType>('current'); // 標籤狀態管理
  const [isLoading, setIsLoading] = useState<boolean>(true); // 載入狀態
  const [error, setError] = useState<string | null>(null); // 錯誤訊息

  // 處理標籤切換，確保只在標籤不同時進行切換
  const handleTabClick = (tab: TabType) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // 處理訂單詳情按鈕點擊
  const handleOrderDetailClick = (orderId: number) => {
    navigate(`/customer/order-detail/${orderId}`);
  };

  // 從API獲取數據
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);

        // API使用代理路徑
        const userTodayAPI_Path = `/api/GET/user/dashboard/today/${userId}`;
        const currentOrdersAPI_Path = `/api/GET/user/orders/${userId}`;
        const completedOrdersAPI_Path = `/api/GET/user/orders/completed/${userId}`;

        // 分別調用API獲取數據
        // 使用者今日數據
        const userTodayResponse = await fetch(userTodayAPI_Path);

        if (!userTodayResponse.ok) {
          throw new Error(`使用者今日API請求失敗：${userTodayResponse.status}`);
        }
        const TodayData = (await userTodayResponse.json()) as {
          statusCode: number;
          status: boolean;
          message: string;
          result: ApiTodayOrder;
        };
        console.log('使用者今日數據:', TodayData);
        setTodayData(TodayData.result);

        // 當前訂單數據
        const currentResponse = await fetch(currentOrdersAPI_Path);
        if (!currentResponse.ok) {
          throw new Error(`當前訂單API請求失敗：${currentResponse.status}`);
        }
        const currentData = (await currentResponse.json()) as {
          statusCode: number;
          status: boolean;
          message: string;
          result: ApiCurrentOrder[];
        };
        console.log('當前訂單數據:', currentData);

        if (currentData.status && currentData.result.length > 0) {
          setCurrentOrders(currentData.result);
        }

        // 結束訂單數據
        const completedResponse = await fetch(completedOrdersAPI_Path);
        if (!completedResponse.ok) {
          throw new Error(`已完成訂單API請求失敗：${completedResponse.status}`);
        }
        const completedData = (await completedResponse.json()) as {
          statusCode: number;
          status: boolean;
          message: string;
          result: ApiCompletedOrder[];
        };
        console.log('已完成訂單數據:', completedData);
        if (completedData.status && completedData.result.length > 0) {
          setCompletedOrders(completedData.result);
        }

        // 如果兩種訂單都沒有數據
        if (
          (!currentData.status || currentData.result.length === 0) &&
          (!completedData.status || completedData.result.length === 0)
        ) {
          setError('沒有獲取到訂單數據');
        }
      } catch (err) {
        console.error('獲取訂單數據失敗:', err);
        setError('獲取訂單數據失敗，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <MyOrderSectionStyled>
      <UserCardSection>
        <UserCard>
          <UserGreeting>您好，{userName}</UserGreeting>

          <UserCardItem>
            <UserCardTitle>
              <UserTextItem>
                {currentOrders.length > 0
                  ? currentOrders[0].NextServiceDate
                  : '無安排收運日期'}
              </UserTextItem>
            </UserCardTitle>
            <UserCardContent>10:00 - 11:00</UserCardContent>
          </UserCardItem>

          <UserCardItem>
            <UserCardTitle>
              <UserTextItem>訂單狀態</UserTextItem>
            </UserCardTitle>
            <UserCardContent>
              <OrderStatus>{todayData?.status || '錯誤'}</OrderStatus>
            </UserCardContent>
          </UserCardItem>
        </UserCard>
        <Blank />
      </UserCardSection>

      <ProgressBarSection>
        <BackgroundContainer>
          {/* 進度條 */}
          <ProgressBarContainer>
            {/* 進度條填充 */}
            <ProgressBarFill $progress={progress} />

            {/* 進度圖標 */}
            <TruckIcon $step={currentStep}>
              <HiTruck />
            </TruckIcon>

            {/* 進度點 */}
            {orderSteps.map((step, index) => (
              <ProgressDot
                key={index}
                $position={step.position}
                $isActive={index === currentStep}
                $isPassed={index < currentStep}
              />
            ))}
          </ProgressBarContainer>

          {/* 進度文字 */}
          <ProgressStatus>
            {orderSteps.map((step, index) => (
              <ProgressItem
                key={index}
                $isActive={index === currentStep}
                $isPassed={index < currentStep}
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
            當前方案
          </TabItem>
          <TabItem
            $isActive={activeTab === 'completed'}
            onClick={() => handleTabClick('completed')}
          >
            已結束方案
          </TabItem>
        </TabContainer>

        {/* 訂單列表 */}
        <OrderListSection>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              載入中...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--color-red-500)',
              }}
            >
              {error}
            </div>
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
                      OrderImageUrl,
                      RemainingCount,
                      StartDate,
                      EndDate,
                      NextServiceDate,
                    } = currentOrder;

                    return (
                      <OrderCard
                        key={OrdersID}
                        onClick={() => handleOrderDetailClick(OrdersID)}
                      >
                        <OrderCardLayout>
                          <OrderPhotoContainer>
                            {OrderImageUrl && OrderImageUrl.length > 0 ? (
                              <OrderPhotoImage
                                src={OrderImageUrl[0]}
                                alt="訂單商品"
                              />
                            ) : (
                              <OrderPhoto>
                                <HiExclamationCircle />
                              </OrderPhoto>
                            )}
                          </OrderPhotoContainer>

                          <OrderCardData>
                            <OrderCardTitle>
                              {PlanName} {Liter}L/{PlanKG}kg
                            </OrderCardTitle>
                            <OrderCardItems>
                              <OrderCardItem>
                                <OrderCardSubtitle>下次收運</OrderCardSubtitle>
                                <OrderCardDetail>
                                  {NextServiceDate}
                                </OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle>剩餘次數</OrderCardSubtitle>
                                <OrderCardDetail>
                                  {RemainingCount}
                                </OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle $light>
                                  開始時間
                                </OrderCardSubtitle>
                                <OrderCardDetail $light>
                                  {StartDate}
                                </OrderCardDetail>
                              </OrderCardItem>

                              <OrderCardItem>
                                <OrderCardSubtitle $light>
                                  結束時間
                                </OrderCardSubtitle>
                                <OrderCardDetail $light>
                                  {EndDate}
                                </OrderCardDetail>
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
              ) : // 顯示已完成訂單
              completedOrders.length > 0 ? (
                completedOrders.map((completedOrder) => {
                  // 使用解構賦值提取需要的屬性
                  const {
                    OrdersID,

                    PlanName,
                    Liter,
                    PlanKG,
                    OrderImageUrl,
                    StartDate,
                    EndDate,
                  } = completedOrder;

                  // 格式化日期 - 從ISO格式轉換為YYYY/MM/DD格式
                  const formatDate = (dateString: string) => {
                    const date = new Date(dateString);
                    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
                  };

                  const formattedStartDate = formatDate(StartDate);
                  const formattedEndDate = formatDate(EndDate);
                  // 使用結束日期作為最後收運日期
                  const lastPickupDate = formattedEndDate;

                  return (
                    <OrderCard
                      key={OrdersID}
                      onClick={() => handleOrderDetailClick(OrdersID)}
                    >
                      <OrderCardLayout>
                        <OrderPhotoContainer>
                          {OrderImageUrl && OrderImageUrl.length > 0 ? (
                            <OrderPhotoImage
                              src={OrderImageUrl[0]}
                              alt="訂單商品"
                            />
                          ) : (
                            <OrderPhoto>
                              <HiExclamationCircle />
                            </OrderPhoto>
                          )}
                        </OrderPhotoContainer>

                        <OrderCardData>
                          <OrderCardTitle>
                            {PlanName} {Liter}L/{PlanKG}kg
                          </OrderCardTitle>
                          <OrderCardItems>
                            <OrderCardItem>
                              <OrderCardSubtitle>最後收運</OrderCardSubtitle>
                              <OrderCardDetail>
                                {lastPickupDate}
                              </OrderCardDetail>
                            </OrderCardItem>

                            <OrderCardItem>
                              <OrderCardSubtitle>訂單狀態</OrderCardSubtitle>
                              <OrderCardDetail>已完成</OrderCardDetail>
                            </OrderCardItem>

                            <OrderCardItem>
                              <OrderCardSubtitle $light>
                                開始時間
                              </OrderCardSubtitle>
                              <OrderCardDetail $light>
                                {formattedStartDate}
                              </OrderCardDetail>
                            </OrderCardItem>

                            <OrderCardItem>
                              <OrderCardSubtitle $light>
                                結束時間
                              </OrderCardSubtitle>
                              <OrderCardDetail $light>
                                {formattedEndDate}
                              </OrderCardDetail>
                            </OrderCardItem>
                          </OrderCardItems>
                        </OrderCardData>
                      </OrderCardLayout>
                    </OrderCard>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  無已完成訂單
                </div>
              )}
            </OrderList>
          )}
        </OrderListSection>
      </OrderContainer>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
