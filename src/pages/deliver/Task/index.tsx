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
  // BottomFadeEffect,
} from './styled';
import TaskCard, { TaskStatus } from './Card';

// API 回傳的資料結構
type ApiResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: ApiTask[];
};

// API 個別任務資料結構
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

// TaskItem 型別
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  customerName: string;
  phone?: string;

  //重量 暫存localStorage
  weight?: string;
  //照片 暫存localStorage
  photos?: string[];
};

// 分類型別定義
type CategoryType = 'all' | 'waiting' | 'completed' | 'error';

// 容器高度偏移量
const TOP_OFFSET = 96; // 6rem

function Task() {
  // 取得容器高度
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(TOP_OFFSET);

  // API 資料的狀態
  const [isLoading, setIsLoading] = useState(false); // 是否正在載入
  const [error, setError] = useState<string | null>(null); // 錯誤訊息

  // 初始化 tasks 狀態變數，並從本地存儲（localStorage）中讀取之前保存的任務資料。
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  // 從 localStorage 讀取保存的分類，如果沒有則默認為 'all'
  const [activeCategory, setActiveCategory] = useState<CategoryType>(() => {
    const savedCategory = localStorage.getItem('activeCategory');
    return (savedCategory as CategoryType) || 'all';
  });

  // 當分類改變時，保存到 localStorage
  useEffect(() => {
    localStorage.setItem('activeCategory', activeCategory);
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
      const response = await fetch('/api/locations', {
        method: 'GET',
        signal: controller.signal, //參數連接到AbortController，允許超時中止
      });
      console.log(response); //測試 了解response回傳內容

      //清除超時計時器，因為請求已完成
      clearTimeout(timeoutId);

      ////4. 檢查回應
      //驗證請求是否成功，如果狀態碼不是2xx（例如404、500），拋出錯誤中斷流程
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //將回應主體解析為JSON格式，使用TypeScript類型ApiResponse確保正確的類型檢查
      const data: ApiResponse = await response.json();
      console.log('API 回傳資料:', data); //測試

      ////5. 處理回應資料
      //條件式判斷回傳資料符合陣列結構
      if (data.status && Array.isArray(data.result)) {
        // 從 localStorage 獲取已保存的任務狀態
        const savedTasks = localStorage.getItem('tasks');
        const savedTaskStates = savedTasks ? JSON.parse(savedTasks) : [];

        // 將回應資料轉換為任務列表
        const newTasks = data.result.map((apiTask: ApiTask) => {
          // 查找是否有已保存的任務狀態
          const savedTask = savedTaskStates.find(
            (task: TaskItem) => task.id === apiTask.OrdersID.toString(),
          );

          // 建立任務物件，將API資料轉換為應用程式需要的格式
          return {
            id: apiTask.OrdersID.toString(),
            status: savedTask ? savedTask.status : 'waiting',
            customerName: apiTask.OrderName || '',
            phone: apiTask.OrderPhone || '',
            address: apiTask.Addresses || '',
            notes: apiTask.Notes || '',
            time: new Date(apiTask.StartDate || new Date()).toLocaleTimeString(
              'zh-TW',
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            ),
            // 保留本地端已儲存的 weight 和 photos
            weight: savedTask?.weight || undefined,
            photos: savedTask?.photos || undefined,
          };
        });
        console.log(newTasks); //測試 了解newTasks回傳內容

        // 更新任務列表
        setTasks(newTasks);

        // 保存到localStorage以便後續使用
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      } else {
        throw new Error(data.message || 'API 回傳格式錯誤');
      }

      ////6. 處理錯誤
    } catch (error) {
      console.error('取得任務資料失敗:', error);

      // 區分錯誤類型
      if (error.name === 'AbortError') {
        setError('請求超時，請稍後再試');
      } else {
        setError(error instanceof Error ? error.message : '取得任務資料失敗');
      }

      ////7. 結束載入狀態，完成清理
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
      default: {
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
                notes={ongoingTask.notes}
                customerName={ongoingTask.customerName}
                phone={ongoingTask.phone}
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
            notes={task.notes}
            customerName={task.customerName}
            phone={task.phone}
            onStatusChange={handleTaskStatusChange}
            disabled={!!ongoingTask}
            weight={task.weight}
            photos={task.photos}
          />
        ))}
      </TaskCardsContainer>

      {/* <BottomFadeEffect /> */}
    </TaskSectionStyled>
  );
}

export default Task;
