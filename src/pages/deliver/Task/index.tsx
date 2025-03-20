import styled from 'styled-components';
import { HiTruck, HiCalendar } from 'react-icons/hi2';
import { useRef, useEffect, useState } from 'react';

import TaskCard, { TaskStatus } from './Card';

// TypeScript 類型定義
type ProgressBarProps = {
  progress: number;
};

type CategoryPositionProps = {
  topPosition: number;
};

type CategoryTabProps = {
  isActive?: boolean;
};

type TaskCardsContainerProps = {
  topPosition: number;
};

type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
};

// 任務大容器
const TaskSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  /* 隱藏滾動條 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 外送員卡片容器
const DeliverContainer = styled.div`
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);

  position: fixed;
  z-index: 20;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 招呼語容器
const DeliverGreeting = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 招呼語文字
const TaskGreetingItem = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

// 任務ID
const TaskId = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

// icon容器
const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

//今日日期
const DeliverDate = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-sm);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
`;

//今日收運進度 容器
const DeliverProgress = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

//今日收運進度 標題+已完成+異常 大容器
const DeliverProgressHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//今日收運進度 標題 容器
const ProgressTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
`;

//今日收運進度 已完成+異常 容器
const ProgressStatus = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: 500;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const Label = styled.span`
  margin-right: 4px;
`;

// 進度條容器
const DeliverProgressBarContainer = styled.div`
  background-color: var(--color-gray-200);

  width: 100%;
  height: 8px;
  margin: 0.5rem 0;

  border-radius: 4px;
  overflow: hidden;
`;

// 進度條填充部分
const DeliverProgressBarFill = styled.div<ProgressBarProps>`
  background-color: var(--color-gray-900);

  width: ${({ progress }) => progress}%;
  height: 100%;

  border-radius: var(--border-radius-round);
  transition: width 0.3s ease;
`;

// 進行中任務容器 - 調整為內嵌式設計
const OngoingTaskContainer = styled.div`
  width: 100%;
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-xs);
  background-color: var(--color-gray-50);
`;

// 進行中任務標題
const OngoingTaskTitle = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
`;

// 分類標籤容器 - 實現右側漸層淡出效果
const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: var(--color-gray-100);
  position: fixed;
  z-index: 15;
  top: ${({ topPosition }) => `${topPosition}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  transition: top 0.3s ease;

  /* 右側漸層淡出效果實現 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 3rem;
    height: 100%;
    background: linear-gradient(to right, transparent, var(--color-gray-100));
    pointer-events: none;
  }
`;

// 分類標籤滾動容器 - 實現橫向滾動
const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.75rem var(--spacing-sm);
  display: flex;
  gap: 0.75rem;

  /* 實現橫向滾動，同時隱藏滾動條 */
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 確保最後一個標籤右側有足夠空間 */
  &::after {
    content: '';
    padding-right: 2rem;
  }
`;

// 分類標籤按鈕 - 實現狀態切換和動畫效果
const CategoryTab = styled.button<CategoryTabProps>`
  background-color: ${({ isActive }) =>
    isActive ? 'var(--color-gray-700)' : 'var(--color-gray-200)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};
  border-radius: var(--border-radius-round);

  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  /* 平滑過渡動畫 */
  transition: all 0.2s ease;

  /* 互動狀態樣式 */
  &:hover {
    background-color: ${(props) =>
      props.isActive ? 'var(--color-gray-800)' : 'var(--color-gray-300)'};
  }

  /* 點擊縮放效果 */
  &:active {
    transform: scale(0.98);
  }
`;

// 任務卡片容器 - 實現動態高度計算和滾動
const TaskCardsContainer = styled.div<TaskCardsContainerProps>`
  position: fixed;
  z-index: 10;
  /* 動態計算頂部位置，考慮分類標籤高度 */
  top: ${({ topPosition }) => `${topPosition + 56}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  /* 動態計算容器高度，確保底部留有空間 */
  height: calc(100vh - ${({ topPosition }) => `${topPosition + 56}px`} - 4rem);
  padding: 0.5rem 0.4rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 實現平滑滾動 */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transition: top 0.3s ease;

  /* 隱藏滾動條 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 底部漸層效果 - 實現內容淡出提示
const BottomFadeEffect = styled.div`
  /* 漸層效果：從底部實色過渡到透明 */
  background: linear-gradient(to top, var(--color-gray-100) 30%, transparent);

  position: fixed;
  z-index: 11;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  height: 8rem;

  pointer-events: none;
`;

//本體
function Task() {
  //HTMLDivElement是TS內建的介面，代表HTML的div元素
  //useRef是React的Hook，用於保存對DOM元素的引用
  //null是TS的型別，代表該元素可能為空
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(96);

  // 從 localStorage 讀取任務狀態，如果沒有則使用初始值
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [
      {
        id: '1',
        status: 'waiting',
        time: '10:00am',
        address: '高雄市三民區和平一路124號5F',
        customer: '林先生',
      },
      {
        id: '2',
        status: 'waiting',
        time: '11:00am',
        address: '高雄市三民區和平一路126號3F',
        customer: '王先生',
      },
      {
        id: '3',
        status: 'waiting',
        time: '13:00pm',
        address: '高雄市三民區和平一路128號2F',
        customer: '張先生',
      },
      {
        id: '4',
        status: 'completed',
        time: '09:00am',
        address: '高雄市三民區和平一路130號1F',
        customer: '李先生',
      },
    ];
  });

  // 當任務狀態改變時，更新 localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const updatePosition = () => {
      if (deliverContainerRef.current) {
        const height = deliverContainerRef.current.offsetHeight;
        setTopPosition(96 + height); // 6rem + 容器高度
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
  }, [tasks]); // 依賴 tasks 狀態來重新計算位置

  // 改變任務狀態
  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // 分類任務
  const ongoingTask = tasks.find((task) => task.status === 'ongoing');
  const waitingTasks = tasks.filter((task) => task.status === 'waiting');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  //取得使用者當地的當日時間 + 格式化 0000-00-00
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

          {/* 顯示進行中的任務 - 移到主容器內 */}
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

      <TaskCategoryWrapper topPosition={topPosition}>
        <TaskCategoryContainer>
          <CategoryTab isActive>全部({tasks.length})</CategoryTab>
          <CategoryTab>未完成({waitingTasks.length})</CategoryTab>
          <CategoryTab>已完成({completedTasks.length})</CategoryTab>
          <CategoryTab>異常回報(0)</CategoryTab>
        </TaskCategoryContainer>
      </TaskCategoryWrapper>

      {/* 所有任務卡片容器 */}
      <TaskCardsContainer topPosition={topPosition}>
        {waitingTasks.map((task) => (
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
        {completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            taskId={task.id}
            status={task.status}
            time={task.time}
            address={task.address}
            customer={task.customer}
            onStatusChange={handleTaskStatusChange}
          />
        ))}
      </TaskCardsContainer>

      {/* 底部漸層效果 */}
      <BottomFadeEffect />
    </TaskSectionStyled>
  );
}

export default Task;
