import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiTruck, HiExclamationCircle } from 'react-icons/hi2';
import {
  OrderStep,
  TabType,
  ApiOrder,
  ApiResponse,
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

  //// 收運進度條
  // 假設當前訂單狀態是「待收運」(可以從API或狀態管理中獲取)
  const currentStep = 1; // 0:待收運, 1:前往中, 2:已完成
  const progress = (currentStep / 2) * 100; // 計算進度百分比，由於有3個步驟(0-2)，所以除以2

  const orderSteps: OrderStep[] = [
    { label: '待收運', position: 0 },
    { label: '前往中', position: 50 },
    { label: '已完成', position: 100 },
  ];

  ////模擬資料
  // 圖片URL，實際開發時可從API獲取
  // const productImageUrl1 = '../../public/user_trash_photo_test.jpg';
  // const productImageUrl2 = '../../public/user_trash_photo_test.jpg';

  // 標籤狀態管理
  const [activeTab, setActiveTab] = useState<TabType>('current');

  // 訂單數據狀態
  const [currentOrders, setCurrentOrders] = useState<ApiOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<ApiCompletedOrder[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        // 路徑設定 > vite.config.ts
        const currentOrdersAPI_Path = '/api/GET/user/dashboard/New/1';
        const completedOrdersAPI_Path = '/api/GET/user/dashboard/End/1';

        // 同時調用兩個API獲取數據
        const [currentResponse, completedResponse] = await Promise.all([
          fetch(currentOrdersAPI_Path),
          fetch(completedOrdersAPI_Path),
        ]);

        // 檢查當前方案API響應
        if (!currentResponse.ok) {
          throw new Error(`當前訂單API請求失敗：${currentResponse.status}`);
        }

        // 檢查已完成方案API響應
        if (!completedResponse.ok) {
          throw new Error(`已完成訂單API請求失敗：${completedResponse.status}`);
        }

        // 解析API響應
        const currentData = (await currentResponse.json()) as ApiResponse;
        const completedData = (await completedResponse.json()) as ApiResponse;

        console.log('當前訂單API回應:', currentData);
        console.log('已完成訂單API回應:', completedData);

        // 更新當前方案狀態
        if (currentData.status && currentData.result.length > 0) {
          setCurrentOrders(currentData.result as ApiOrder[]);
        }

        // 更新已完成方案狀態
        if (completedData.status && completedData.result.length > 0) {
          setCompletedOrders(completedData.result as ApiCompletedOrder[]);
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
          <UserGreeting>您好，尊貴的會員</UserGreeting>

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
              <OrderStatus>前往中</OrderStatus>
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

      <OrderContainer>
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
                      Photos,
                      PlanName,
                      Liter,
                      PlanKG,
                      NextServiceDate,
                      RemainingCount,
                      StartDate,
                      EndDate,
                    } = currentOrder;

                    return (
                      <OrderCard
                        key={OrdersID}
                        onClick={() => handleOrderDetailClick(OrdersID)}
                      >
                        <OrderCardLayout>
                          <OrderPhotoContainer>
                            {Photos && Photos.length > 0 ? (
                              <OrderPhotoImage src={Photos[0]} alt="訂單商品" />
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
                    Photos,
                    PlanName,
                    Liter,
                    PlanKG,
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
                          {Photos && Photos.length > 0 ? (
                            <OrderPhotoImage src={Photos[0]} alt="訂單商品" />
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
