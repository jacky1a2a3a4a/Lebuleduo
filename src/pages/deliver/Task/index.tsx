import { useRef, useEffect, useState } from 'react';

import {
  TaskSectionStyled,
  DeliverContainer,
  DeliverCard,
  DeliverGreeting,
  TaskGreetingItem,
  TaskId,
  IconWrapper,
  DeliverDate,
  DeliverProgress,
  DeliverProgressHeader,
  ProgressTitle,
  ProgressStatus,
  StatusItem,
  Label,
  DeliverProgressBarContainer,
  DeliverProgressBarFill,
  OngoingTaskContainer,
  OngoingTaskTitle,
  TaskCategoryWrapper,
  TaskCategoryContainer,
  CategoryTab,
  TaskCardsSection,
  TaskCardsContainer,
} from './styled';
import TaskCard from './Card';
import ErrorReport from '../../../components/common/ErrorReport';
// import AnimationLoading from '../../../components/common/AnimationLoading';
import CommonLoading from '../../../components/common/CommonLoading';

import { MdCalendarToday } from 'react-icons/md';
import { TaskStatus } from '../../../types/deliver';
import { getFormattedDateDash } from '../../../utils/formatDate';
import { getTodayDate } from '../../../utils/getDate';

// API 回傳的資料結構
type ApiResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: {
    DriverID: number; //汪汪員ID
    Number: string; //汪汪員編號
    DriverName: string; //汪汪員姓名
    Today: string; //汪汪員今日日期
    TodayActiveStatus: {
      UnScheduled: number; //未排定
      Scheduled: number; //已排定
      Ongoing: number; //前往中
      Arrived: number; //已抵達
      Total: number; //總數
    };
    TodayCompletedStatus: {
      Completed: number; //已完成
      Abnormal: number; //異常
      Total: number; //總數
    };
    Orders: ApiTask[]; //任務列表
  };
};

// API 個別任務資料結構
type ApiTask = {
  OrderDetailID: number; //任務ID
  ServiceTime: string | null; //服務時間
  OrderDetailsNumber: string; //任務編號
  Addresses: string; //地址
  CustomerNumber: string; //客戶電話
  CustomerName: string; //客戶姓名
  Notes: string; //備註
  Photo: string[]; //照片
  Status: string; //狀態
  PlanName: string; //方案名稱
  PlanKG: number; //方案重量
  Liter: number; //方案容量
};

//API 汪汪員資料 型別
type DriverData = {
  DriverID: number; //汪汪員ID
  Number: string; //汪汪員編號
  DriverName: string; //汪汪員姓名
};

//API 任務 型別
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  customerName: string;
  phone?: string;
  weight?: string;
  photos?: string[];
  orderNumber?: string;
  planName?: string;
  planKG?: number;
  liter?: number;
};

// 分類型別定義
// scheduled 已排定(待前往)
// completed 已完成
// abnormal 異常
type CategoryType = 'scheduled' | 'completed' | 'abnormal';

// 容器高度偏移量
const TOP_OFFSET = 96; // 6rem

function Task() {
  // 取得容器高度
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(TOP_OFFSET);

  // API 資料的狀態
  const [isLoading, setIsLoading] = useState(false); // 是否正在載入
  const [error, setError] = useState<string | null>(null); // 錯誤訊息
  const [driverData, setDriverData] = useState<DriverData | null>(null); // 汪汪員資料
  console.log('汪汪員資料:', driverData);
  const [tasks, setTasks] = useState<TaskItem[]>([]); // 任務列表

  // 從 localStorage 讀取保存的分類，如果沒有則默認為 'waiting'
  const [activeCategory, setActiveCategory] = useState<CategoryType>(() => {
    const savedCategory = localStorage.getItem('activeCategory_deliver');
    return (savedCategory as CategoryType) || 'scheduled';
  });

  // 當分類改變時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('activeCategory_deliver', activeCategory);
  }, [activeCategory]);

  // API 呼叫函數 (fetch)
  const fetchTasks = async () => {
    try {
      //// 1. 請求前置作業
      setIsLoading(true); //告訴UI顯示「載入中」的狀態
      setError(null); //清除先前的錯誤訊息

      //// 2. 處理請求超時
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      ////3. 發送請求
      const driverId = localStorage.getItem('UsersID'); // 從localStorage獲取使用者ID
      const response = await fetch(
        `api/GET/driver/day/${driverId}/${getFormattedDateDash(getTodayDate())}`,
        {
          method: 'GET',
          signal: controller.signal,
        },
      );

      // 清除超時計時器，因為請求已完成
      clearTimeout(timeoutId);

      ////4. 檢查回應
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      console.log('API 原始資料:', data);
      console.log('API 汪汪員資料:', data.result);
      console.log('API 任務資料:', data.result.Orders);

      ////5. 處理回應資料(將任務轉換為任務列表)
      if (data.status) {
        // 儲存汪汪員資料
        setDriverData({
          DriverID: data.result.DriverID,
          Number: data.result.Number,
          DriverName: data.result.DriverName,
        });

        // 檢查 Orders 是否存在，如果不存在則設為空陣列
        const orders = data.result.Orders || [];

        // 將回應資料轉換為任務列表
        const newTasks = orders.map((apiTask: ApiTask) => {
          // 將 API 的中文狀態轉換成英文
          let status: TaskStatus = 'unscheduled';
          switch (apiTask.Status) {
            case '未排定':
              status = 'unscheduled'; //外送員通常不會拿到未排定任務
              break;
            case '已排定':
              status = 'scheduled';
              break;
            case '前往中':
              status = 'ongoing';
              break;
            case '已抵達':
              status = 'arrived';
              break;
            case '已完成':
              status = 'completed';
              break;
            case '異常':
              status = 'abnormal';
              break;
          }

          // 建立任務物件，將API資料轉換為應用程式需要的格式
          return {
            id: apiTask.OrderDetailID.toString(),
            status: status,
            customerName: apiTask.CustomerName || '',
            phone: apiTask.CustomerNumber || '',
            address: apiTask.Addresses || '',
            notes: apiTask.Notes || '',
            time: apiTask.ServiceTime || '',
            photos: apiTask.Photo || [],
            orderNumber: apiTask.OrderDetailsNumber || undefined,
            planName: apiTask.PlanName || undefined,
            planKG: apiTask.PlanKG || undefined,
            liter: apiTask.Liter || undefined,
          };
        });

        // 更新任務列表
        setTasks(newTasks);
        console.log('轉換後的任務:', newTasks);
      } else {
        throw new Error(data.message || 'API 回傳格式錯誤');
      }
    } catch (error) {
      console.error('取得任務資料失敗:', error);
      if (error.name === 'AbortError') {
        setError('請求超時，請稍後再試');
      } else {
        setError(error instanceof Error ? error.message : '取得任務資料失敗');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 在組件載入時呼叫 API
  useEffect(() => {
    fetchTasks();
  }, []);

  // 更新容器高度
  useEffect(
    () => {
      const updatePosition = () => {
        if (deliverContainerRef.current) {
          const height = deliverContainerRef.current.offsetHeight;
          setTopPosition(TOP_OFFSET + height);
        }
      };

      // 初始更新
      updatePosition();

      // 監聽視窗大小變化
      window.addEventListener('resize', updatePosition);

      // 監聽任務狀態變化，以更新位置
      updatePosition();

      // 清理函數
      return () => {
        window.removeEventListener('resize', updatePosition);
      };
    },
    // 依賴 tasks 狀態來重新計算位置
    [tasks],
  );

  // 更新任務狀態
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) => {
      // 如果新狀態是 ongoing，檢查是否已經有進行中的任務
      if (newStatus === 'ongoing') {
        const hasOngoingTask = prevTasks.some(
          (task) => task.status === 'ongoing' && task.id !== taskId,
        );

        // 如果已經有進行中的任務，則不允許更改狀態
        if (hasOngoingTask) {
          return prevTasks;
        }
      }

      // 更新任務狀態
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      );
      return updatedTasks;
    });
  };

  // 切換分類分類
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  //過濾任務類型，find取得對應物件; filter取得對應物件組成的陣列
  const scheduledTasks = tasks.filter((task) => task.status === 'scheduled'); //已排定(待前往)
  const ongoingTask = tasks.filter(
    (task) => task.status === 'ongoing' || task.status === 'arrived',
  ); //前往中(一次只會有一個)
  const completedTasks = tasks.filter((task) => task.status === 'completed'); //已完成
  const abnormalTasks = tasks.filter((task) => task.status === 'abnormal'); //異常

  console.log('待前往任務:', scheduledTasks);
  console.log('異常任務:', abnormalTasks);

  const getFilteredTasks = () => {
    // 先取得對應類別的任務陣列
    let filteredTasks = [];
    switch (activeCategory) {
      case 'scheduled':
        filteredTasks = scheduledTasks;
        break;
      case 'completed':
        filteredTasks = completedTasks;
        break;
      case 'abnormal':
        filteredTasks = abnormalTasks;
        break;
      default: {
        // 分別對待等待中和已完成的任務，進行時間排序
        const sortedScheduledTasks = [...scheduledTasks].sort((a, b) => {
          const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
          const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
          return timeA - timeB; // 升序排列（早 -> 晚）
        });

        const sortedCompletedTasks = [...completedTasks].sort((a, b) => {
          const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
          const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
          return timeA - timeB; // 升序排列（早 -> 晚）
        });
        return [...sortedScheduledTasks, ...sortedCompletedTasks];
      }
    }

    return filteredTasks.sort((a, b) => {
      const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
      const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
      return timeA - timeB; // 升序排列（早 -> 晚）
    });
  };

  // 取得當前日期
  const currentDate = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // 根據時間返回問候語
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = currentHour * 100 + currentMinute;

    if (currentTime >= 900 && currentTime < 1200) {
      return '早安，汪汪員';
    } else if (currentTime >= 1200 && currentTime < 1400) {
      return '吃午餐了嗎，汪汪員';
    } else if (currentTime >= 1400 && currentTime < 1800) {
      return '奮鬥吧，汪汪員';
    } else {
      return '燃燒吧，汪汪員';
    }
  };

  return (
    <TaskSectionStyled $topPosition={topPosition}>
      {isLoading && <CommonLoading />}

      {/* 外送員卡片 */}
      <DeliverContainer ref={deliverContainerRef}>
        <DeliverCard>
          <DeliverGreeting>
            <TaskGreetingItem>
              {getGreeting()}
              <span> {driverData?.DriverName}</span>
            </TaskGreetingItem>
            <TaskId>汪汪員編號: {driverData?.Number}</TaskId>
          </DeliverGreeting>

          {/* 進行中的任務 */}
          {ongoingTask && ongoingTask.length > 0 && (
            <OngoingTaskContainer>
              <OngoingTaskTitle>進行中的任務</OngoingTaskTitle>
              <TaskCard
                taskId={ongoingTask[0].id}
                number={ongoingTask[0].orderNumber}
                status={ongoingTask[0].status}
                time={ongoingTask[0].time}
                address={ongoingTask[0].address}
                notes={ongoingTask[0].notes}
                onStatusChange={handleTaskStatusChange}
                photos={ongoingTask[0].photos}
              />
            </OngoingTaskContainer>
          )}

          <ProgressTitle>
            <div>本日收運進度</div>
          </ProgressTitle>

          <DeliverProgress>
            <DeliverProgressHeader>
              <DeliverDate>
                <IconWrapper>
                  <MdCalendarToday />
                </IconWrapper>
                <div>{currentDate}</div>
              </DeliverDate>

              <ProgressStatus>
                <StatusItem $isEmpty={completedTasks.length === 0}>
                  <Label>已完成:</Label>
                  <span>
                    {completedTasks.length}/{tasks.length}
                  </span>
                </StatusItem>

                <StatusItem $isEmpty={true}>
                  <Label>異常:</Label>
                  <span>{abnormalTasks.length}</span>
                </StatusItem>
              </ProgressStatus>
            </DeliverProgressHeader>

            <DeliverProgressBarContainer>
              <DeliverProgressBarFill
                $progress={(completedTasks.length / tasks.length) * 100 || 0}
              />
            </DeliverProgressBarContainer>
          </DeliverProgress>
        </DeliverCard>
      </DeliverContainer>

      {/* 任務卡片列表 */}
      <TaskCardsSection $topPosition={topPosition}>
        {/* 分類標籤 */}
        <TaskCategoryWrapper $topPosition={topPosition}>
          <TaskCategoryContainer>
            <CategoryTab
              $isActive={activeCategory === 'scheduled'}
              onClick={() => handleCategoryChange('scheduled')}
            >
              待前往({scheduledTasks.length})
            </CategoryTab>

            <CategoryTab
              $isActive={activeCategory === 'completed'}
              onClick={() => handleCategoryChange('completed')}
            >
              已完成({completedTasks.length})
            </CategoryTab>

            <CategoryTab
              $isActive={activeCategory === 'abnormal'}
              onClick={() => handleCategoryChange('abnormal')}
            >
              異常回報({abnormalTasks.length})
            </CategoryTab>
          </TaskCategoryContainer>
        </TaskCategoryWrapper>

        {/* 錯誤訊息 */}

        {/* 任務卡片 */}
        <TaskCardsContainer>
          {error && <ErrorReport title="錯誤" error={error} />}
          {getFilteredTasks().length === 0 ? (
            <ErrorReport
              title="目前沒有任務，是個輕鬆的工作天"
              titleColor="var(--color-primary)"
              error=""
              showImage={true}
            />
          ) : (
            getFilteredTasks().map((task) => (
              <TaskCard
                key={task.id}
                taskId={task.id}
                number={task.orderNumber}
                status={task.status}
                time={task.time}
                address={task.address}
                notes={task.notes}
                onStatusChange={handleTaskStatusChange}
                photos={task.photos}
                isDisabled={
                  ongoingTask && ongoingTask[0] && task.status === 'scheduled'
                }
              />
            ))
          )}
        </TaskCardsContainer>
      </TaskCardsSection>
    </TaskSectionStyled>
  );
}

export default Task;
