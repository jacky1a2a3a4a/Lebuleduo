import { useRef, useEffect, useState } from 'react';
import { HiTruck, HiCalendar } from 'react-icons/hi2';

import {
  TaskSectionStyled,
  DeliverContainer,
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
  TaskCardsContainer,
  BottomFadeEffect,
} from './styled';
import TaskCard, { TaskStatus } from './Card';

// API 回傳的資料結構
type ApiTask = {
  OrdersID: number;
  OrderName: string;
  OrderPhone: string;
  Addresses: string;
  Longitude: number;
  Latitude: number;
  Notes: string;
  StartDate: string;
  EndDate: string;
  OrderStatus: string | null;
  PaymentStatus: number;
  KG: number;
  IssueDescription: string;
  ReportedAt: string;
};

type ApiResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: ApiTask[];
};

// 修改現有的 TaskItem 型別
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
  phone?: string;
};

// 分類型別定義
type CategoryType = 'all' | 'waiting' | 'completed' | 'error';

// 容器高度偏移量
const TOP_OFFSET = 96; // 6rem

function Task() {
  // 取得容器高度
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(TOP_OFFSET);

  // 新增 API 資料的狀態
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 修改任務列表的初始化和更新邏輯
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // 新增 API 呼叫函數 - 使用 fetch
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 設置請求超時
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/locations', {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log('API 回傳資料:', data);

      if (data.status && Array.isArray(data.result)) {
        // 從 localStorage 獲取已保存的任務狀態
        const savedTasks = localStorage.getItem('tasks');
        const savedTaskStates = savedTasks ? JSON.parse(savedTasks) : [];

        const newTasks = data.result.map((apiTask: ApiTask) => {
          // 查找是否有已保存的任務狀態
          const savedTask = savedTaskStates.find(
            (task: TaskItem) => task.id === apiTask.OrdersID.toString(),
          );

          return {
            id: apiTask.OrdersID.toString(),
            status: savedTask ? savedTask.status : 'waiting',
            time: new Date(apiTask.StartDate || new Date()).toLocaleTimeString(
              'zh-TW',
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            ),
            address: apiTask.Addresses || '',
            customer: apiTask.OrderName || '',
            phone: apiTask.OrderPhone || '',
          };
        });

        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
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

  // 保存任務列表
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      );
      // 立即保存到 localStorage
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // 切換分類分類
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
  };

  //過濾任務類型，find取得對應物件; filter取得對應物件組成的陣列
  const ongoingTask = tasks.find((task) => task.status === 'ongoing');
  const waitingTasks = tasks.filter((task) => task.status === 'waiting');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  const getFilteredTasks = () => {
    // 先取得對應類別的任務陣列
    let filteredTasks = [];
    switch (activeCategory) {
      case 'waiting':
        filteredTasks = waitingTasks;
        break;
      case 'completed':
        filteredTasks = completedTasks;
        break;
      case 'error':
        filteredTasks = []; //暫定 目前沒有異常任務的處理邏輯
        break;
      default:
        // 分別對待等待中和已完成的任務，進行時間排序
        const sortedWaitingTasks = [...waitingTasks].sort((a, b) => {
          const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
          const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
          return timeA - timeB; // 升序排列（早 -> 晚）
        });

        const sortedCompletedTasks = [...completedTasks].sort((a, b) => {
          const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
          const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
          return timeA - timeB; // 升序排列（早 -> 晚）
        });
        return [...sortedWaitingTasks, ...sortedCompletedTasks];
    }

    return filteredTasks.sort((a, b) => {
      const timeA = new Date(`2024-01-01 ${a.time}`).getTime();
      const timeB = new Date(`2024-01-01 ${b.time}`).getTime();
      return timeA - timeB; // 升序排列（早 -> 晚）
    });
  };

  const currentDate = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <TaskSectionStyled>
      {isLoading && <div>載入中...</div>}
      {error && (
        <div>
          錯誤: {error} <button onClick={fetchTasks}>重試</button>
        </div>
      )}

      <DeliverContainer ref={deliverContainerRef}>
        <DeliverGreeting>
          <TaskGreetingItem>早安，汪汪員</TaskGreetingItem>
          <TaskId>ID-158673</TaskId>
        </DeliverGreeting>

        <DeliverDate>
          <IconWrapper>
            <HiCalendar />
          </IconWrapper>
          <div>{currentDate}</div>
        </DeliverDate>

        <DeliverProgress>
          <DeliverProgressHeader>
            <ProgressTitle>
              <IconWrapper>
                <HiTruck />
              </IconWrapper>
              <div>今日收運進度</div>
            </ProgressTitle>

            <ProgressStatus>
              <StatusItem>
                <Label>已完成:</Label>
                <span>
                  {completedTasks.length}/{tasks.length}
                </span>
              </StatusItem>

              <StatusItem>
                <Label>異常:</Label>
                <span>0</span>
              </StatusItem>
            </ProgressStatus>
          </DeliverProgressHeader>

          <DeliverProgressBarContainer>
            <DeliverProgressBarFill
              progress={(completedTasks.length / tasks.length) * 100 || 0}
            />
          </DeliverProgressBarContainer>

          {ongoingTask && (
            <OngoingTaskContainer>
              <OngoingTaskTitle>進行中任務</OngoingTaskTitle>
              <TaskCard
                taskId={ongoingTask.id}
                status={ongoingTask.status}
                time={ongoingTask.time}
                address={ongoingTask.address}
                customer={ongoingTask.customer}
                onStatusChange={handleTaskStatusChange}
              />
            </OngoingTaskContainer>
          )}
        </DeliverProgress>
      </DeliverContainer>

      {/* 分類標籤 */}
      <TaskCategoryWrapper topPosition={topPosition}>
        <TaskCategoryContainer>
          <CategoryTab
            isActive={activeCategory === 'all'}
            onClick={() => handleCategoryChange('all')}
          >
            全部({tasks.length})
          </CategoryTab>

          <CategoryTab
            isActive={activeCategory === 'waiting'}
            onClick={() => handleCategoryChange('waiting')}
          >
            未完成({waitingTasks.length})
          </CategoryTab>

          <CategoryTab
            isActive={activeCategory === 'completed'}
            onClick={() => handleCategoryChange('completed')}
          >
            已完成({completedTasks.length})
          </CategoryTab>

          <CategoryTab
            isActive={activeCategory === 'error'}
            onClick={() => handleCategoryChange('error')}
          >
            異常回報(0)
          </CategoryTab>
        </TaskCategoryContainer>
      </TaskCategoryWrapper>

      <TaskCardsContainer topPosition={topPosition}>
        {getFilteredTasks().map((task) => (
          <TaskCard
            key={task.id}
            taskId={task.id}
            status={task.status}
            time={task.time}
            address={task.address}
            customer={task.customer}
            onStatusChange={handleTaskStatusChange}
            disabled={!!ongoingTask}
          />
        ))}
      </TaskCardsContainer>

      <BottomFadeEffect />
    </TaskSectionStyled>
  );
}

export default Task;
