import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorReport from '../../../components/common/ErrorReport';
import AnimationLoading from '../../../components/common/AnimationLoading';
import UserCardComponent from '../../../components/customer/UserCard';
import TaskProgressBar from '../../../components/customer/TaskProgressBar';
import { getUserTodayData } from '../../../apis/customer/getUserTodayData';
import { getUserOrders } from '../../../apis/customer/getUserOrders';
import { getUserOrdersCompleted } from '../../../apis/customer/getUserOrdersCompleted';
import CurrentOrderList from '../../../components/customer/CurrentOrderList';
import CompletedOrderList from '../../../components/customer/CompletedOrderList';

import {
  OrderStep,
  TabType,
  ApiTodayOrder,
  ApiCurrentOrder,
  ApiCompletedOrder,
} from './types';
import {
  MyOrderSectionStyled,
  OrderContainer,
  TabContainer,
  TabItem,
  OrderListSection,
} from './styled';

import { getUsersID } from '../../../utils/getUserLocalData';

// 照片用URL
const userID = getUsersID();

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

        // API 獲取使用者今日數據
        const TodayData = await getUserTodayData();
        setTodayData(TodayData.result);
        console.log('使用者今日數據:', TodayData.result);

        // API 獲取當前方案數據
        const currentData = await getUserOrders();
        if (!currentData || !currentData.result) {
          setCurrentOrders([]);
        } else if (Array.isArray(currentData.result)) {
          setCurrentOrders(currentData.result);
        }
        console.log('當前方案數據:', currentData.result);

        // API 獲取已完成方案數據
        const completedData = await getUserOrdersCompleted();
        if (!completedData || !completedData.result) {
          setCompletedOrders([]);
        } else if (Array.isArray(completedData.result)) {
          setCompletedOrders(completedData.result);
        }
        console.log('已完成方案數據:', completedData.result);

        // 檢查是否有任何方案數據
        const hasCurrentOrders =
          Array.isArray(currentData?.result) && currentData.result.length > 0;
        const hasCompletedOrders =
          Array.isArray(completedData?.result) && completedData.result.length > 0;

        if (!hasCurrentOrders && !hasCompletedOrders) {
          setError('目前沒有方案數據');
        }
      } catch (err) {
        console.error('獲取方案數據失敗:', err);
        setError(
          err instanceof Error ? err.message : '獲取方案數據失敗，請稍後再試',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userID]);

  return (
    <MyOrderSectionStyled>
      <UserCardComponent todayData={todayData} />

      <TaskProgressBar
        progress={progress}
        currentStep={currentStep}
        orderSteps={orderSteps}
        todayDataStatus={todayDataStatus}
      />

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

        {/* 方案列表 */}
        <OrderListSection>
          {isLoading ? (
            <AnimationLoading size="mini" animationType="moving" />
          ) : error ? (
            <ErrorReport
              title="目前沒有方案"
              error=""
              showImage={true}
              titleColor="var(--color-primary)"
            />
          ) : activeTab === 'current' ? (
            <CurrentOrderList
              orders={currentOrders}
              onOrderClick={handleOrderDetailCurrentClick}
            />
          ) : (
            <CompletedOrderList
              orders={completedOrders}
              onOrderClick={handleOrderDetailCompletedClick}
            />
          )}
        </OrderListSection>
      </OrderContainer>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
