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
import { theme } from '../../../styles/theme';

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

import { getUsersID } from '../../../utils/authUtils';

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
        let todayResult = null;
        try {
          const TodayData = await getUserTodayData();
          todayResult = TodayData.result;
          setTodayData(todayResult);
          console.log('使用者今日數據:', todayResult);
        } catch (err) {
          console.error('獲取今日數據失敗:', err);
          // 今日數據失敗不影響方案顯示
        }

        // API 獲取當前方案數據
        let currentResult = null;
        try {
          const currentData = await getUserOrders();
          if (currentData && currentData.result && Array.isArray(currentData.result)) {
            currentResult = currentData.result;
            setCurrentOrders(currentResult);
          } else {
            setCurrentOrders([]);
          }
          console.log('當前方案數據:', currentResult);
        } catch (err) {
          console.error('獲取當前方案數據失敗:', err);
          setCurrentOrders([]);
        }

        // API 獲取已完成方案數據
        let completedResult = null;
        try {
          const completedData = await getUserOrdersCompleted();
          if (completedData && completedData.result && Array.isArray(completedData.result)) {
            completedResult = completedData.result;
            setCompletedOrders(completedResult);
          } else {
            setCompletedOrders([]);
          }
          console.log('已完成方案數據:', completedResult);
        } catch (err) {
          console.error('獲取已完成方案數據失敗:', err);
          // 已完成方案失敗不影響當前方案顯示
          setCompletedOrders([]);
        }

        // 檢查是否有任何方案數據 - 只有當兩個都沒有數據時才顯示錯誤
        const hasCurrentOrders = Array.isArray(currentResult) && currentResult.length > 0;
        const hasCompletedOrders = Array.isArray(completedResult) && completedResult.length > 0;

        // 移除統一的錯誤設置，讓各個標籤頁自己處理空狀態
        // if (!hasCurrentOrders && !hasCompletedOrders) {
        //   setError('目前沒有方案數據');
        // }

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
              title="載入失敗"
              error={error}
              showImage={true}
              titleColor={theme.colors.primary.main}
            />
          ) : activeTab === 'current' ? (
            currentOrders.length > 0 ? (
              <CurrentOrderList
                orders={currentOrders}
                onOrderClick={handleOrderDetailCurrentClick}
              />
            ) : (
              <ErrorReport
                title="目前沒有當前方案"
                error=""
                showImage={true}
                titleColor={theme.colors.primary.main}
              />
            )
          ) : (
            completedOrders.length > 0 ? (
              <CompletedOrderList
                orders={completedOrders}
                onOrderClick={handleOrderDetailCompletedClick}
              />
            ) : (
              <ErrorReport
                title="目前沒有已結束方案"
                error=""
                showImage={true}
                titleColor={theme.colors.primary.main}
              />
            )
          )}
        </OrderListSection>
      </OrderContainer>
    </MyOrderSectionStyled>
  );
}

export default MyOrder;
