import { useRef, useEffect, useState } from 'react';
import { MdCalendarToday } from 'react-icons/md';

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
  TaskCardsSection,
  TaskCardsContainer,
} from './styles';
import {
  ApiTask,
  TaskItem,
  CategoryType,
  DriverData,
} from '../../../types/deliver/OrderDetail';
import { TaskStatus } from '../../../types/deliver/TaskStatus';

import TaskCard from './Card';
import ErrorReport from '../../../components/common/ErrorReport';
import CommonLoading from '../../../components/common/CommonLoading';
import CategoryTags from '../../../components/deliver/Tags';

import { getUsersID } from '../../../utils/getUserLocalData';
import { getDeliverGreeting } from '../../../utils/getGreeting';
import { getTodayDate, getTomorrowDate } from '../../../utils/getDate';
import { getFormattedDateWithDay } from '../../../utils/formatDate';
import { getSpecificDayOrders } from '../../../apis/deliver/getSpecificDayOrders';
// import { getTodayOrders } from '../../../apis/deliver/getTodayOrders';

// 容器高度偏移量
const TOP_OFFSET = 96; // 6rem

function Task() {
  // 取得容器高度
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(TOP_OFFSET);

  // API 資料的狀態
  const [isLoading, setIsLoading] = useState(false); // 是否正在載入
  const [error, setError] = useState<string | null>(null); // 錯誤訊息
  const [driverInfo, setDriverInfo] = useState<DriverData | null>(null); // 汪汪員資訊
  console.log('汪汪員資訊:', driverInfo);
  const [tasks, setTasks] = useState<TaskItem[]>([]); // 任務列表 // 取得當前日期

  const currentDate = getFormattedDateWithDay(getTodayDate()).toString();
  const tomorrowDate = getFormattedDateWithDay(getTomorrowDate()).toString();

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

      ////3. 發送請求
      const driverId = getUsersID(); // 從 getUserLocalData 獲取使用者ID並轉換為字串
      const apiResult = await getSpecificDayOrders(driverId, tomorrowDate);
      console.log('API 回應資料:', apiResult);

      // 更新汪汪員資訊
      setDriverInfo({
        DriverID: apiResult.DriverID,
        Number: apiResult.Number,
        DriverName: apiResult.DriverName,
      });
      console.log('汪汪員資訊:', driverInfo);

       if (!apiResult || !apiResult.Orders) {
         setTasks([]);
         return;
       }

      ////5. 處理回應資料(將任務轉換為任務列表)
      // 將回應資料轉換為任務列表
      const newTasks = apiResult.Orders.map((apiTask: ApiTask) => {
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
    } catch (error) {
      console.error('取得任務資料失敗:', error);
      setError(error instanceof Error ? error.message : '取得任務資料失敗');
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

  return (
    <TaskSectionStyled $topPosition={topPosition}>
      {isLoading && <CommonLoading />}

      {/* 外送員卡片 */}
      <DeliverContainer ref={deliverContainerRef}>
        <DeliverCard>
          <DeliverGreeting>
            <TaskGreetingItem>
              {getDeliverGreeting()}

              <p>{driverInfo?.DriverName}</p>
            </TaskGreetingItem>
            <TaskId>汪汪員編號: {driverInfo?.Number}</TaskId>
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
        <CategoryTags
          topPosition={topPosition}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          scheduledTasksCount={scheduledTasks.length}
          completedTasksCount={completedTasks.length}
          abnormalTasksCount={abnormalTasks.length}
        />

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
