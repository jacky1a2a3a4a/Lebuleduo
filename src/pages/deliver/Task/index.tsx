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

// 型別定義
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
};

type CategoryType = 'all' | 'waiting' | 'completed' | 'error';

// 容器高度偏移量
const TOP_OFFSET = 96; // 6rem

function Task() {
  // 取得容器高度
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(TOP_OFFSET);

  // 取得任務列表
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: '1',
        status: 'waiting',
        time: '13:00',
        address: '高雄市三民區和平一路124號1F',
        customer: '林先生',
      },
      {
        id: '2',
        status: 'waiting',
        time: '11:00',
        address: '高雄市三民區和平一路126號2F',
        customer: '王先生',
      },
      {
        id: '3',
        status: 'waiting',
        time: '10:00',
        address: '高雄市三民區和平一路128號3F',
        customer: '張先生',
      },
      {
        id: '4',
        status: 'waiting',
        time: '14:00',
        address: '高雄市三民區和平一路130號4F',
        customer: '陳先生',
      },
      {
        id: '5',
        status: 'waiting',
        time: '15:00',
        address: '高雄市三民區和平一路132號5F',
        customer: '洪先生',
      },
      {
        id: '6',
        status: 'waiting',
        time: '16:00',
        address: '高雄市三民區和平一路134號6F',
        customer: '黃先生',
      },
    ];
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
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
              progress={(completedTasks.length / tasks.length) * 100}
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
