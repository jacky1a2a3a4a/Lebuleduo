import styled from 'styled-components';
import { HiTruck, HiCalendar } from 'react-icons/hi2';
import { useRef, useEffect, useState } from 'react';

import TaskCard, { TaskStatus } from './Card';

// 任務大容器
const TaskSectionStyled = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  //height:100vh會有Y軸
  height: 100%;

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

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-sm);
`;

const DeliverGreeting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 1rem;
`;

const TaskGreetingItem = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

const TaskId = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

const DeliverDate = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
`;

const DeliverProgress = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DeliverProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ProgressTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-weight: 600;
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
  width: 100%;
  height: 8px;
  background-color: var(--color-gray-200);
  border-radius: 4px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

// 進度條填充部分
const DeliverProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: var(--color-gray-900);
  width: ${(props) => props.progress}%;
  border-radius: var(--border-radius-round);
  transition: width 0.3s ease;
`;

// 分類標籤 容器 淡出效果
const TaskCategoryWrapper = styled.div<{ topPosition: number }>`
  position: fixed;
  z-index: 15;
  top: ${(props) => `${props.topPosition}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  transition: top 0.3s ease;
  background-color: var(--color-gray-100);

  // 右側淡出效果
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 3rem;
    background: linear-gradient(to right, transparent, var(--color-gray-100));
    pointer-events: none;
    z-index: 1;
  }
`;

//分類標籤 容器
const TaskCategoryContainer = styled.div`
  position: relative;
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem var(--spacing-sm);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  /* 隱藏水平滾動條 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* 確保最後一個標籤有足夠空間 */
  &::after {
    content: '';
    padding-right: 2rem;
  }
`;

//分類標籤
const CategoryTab = styled.button<{ isActive?: boolean }>`
  background-color: ${(props) =>
    props.isActive ? 'var(--color-gray-700)' : 'var(--color-gray-200)'};
  color: ${(props) =>
    props.isActive ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};

  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? 'var(--color-gray-800)' : 'var(--color-gray-300)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// 任務卡片容器 - 移除底部淡出效果的 ::after 偽元素
const TaskCardsContainer = styled.div<{ topPosition: number }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: ${(props) => `${props.topPosition + 56}px`}; // 標籤容器高度約為 56px
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  height: calc(
    100vh - ${(props) => `${props.topPosition + 56}px`} - 4rem
  ); // 減去底部空間
  transition: top 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.4rem;
  padding-bottom: 5rem; // 增加底部內邊距
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 創建一個新的固定在底部的淡出效果組件
const BottomFadeEffect = styled.div<{ topPosition: number }>`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  height: 8rem;
  background: linear-gradient(to top, var(--color-gray-100) 30%, transparent);
  pointer-events: none;
  z-index: 11;
`;

// 新增進行中任務容器
const OngoingTaskContainer = styled.div`
  width: 100%;
  margin-top: var(--spacing-sm);
`;

interface TaskItem {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
}

function Task() {
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(96);
  const [tasks, setTasks] = useState<TaskItem[]>([
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
  ]);

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

    // 清理函數
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const ongoingTask = tasks.find((task) => task.status === 'ongoing');
  const waitingTasks = tasks.filter((task) => task.status === 'waiting');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

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

          {/* 顯示進行中的任務 */}
          {ongoingTask && (
            <OngoingTaskContainer>
              <TaskCard
                taskId={ongoingTask.id}
                status={ongoingTask.status}
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

      <TaskCardsContainer topPosition={topPosition}>
        {waitingTasks.map((task) => (
          <TaskCard
            key={task.id}
            taskId={task.id}
            status={task.status}
            onStatusChange={handleTaskStatusChange}
            disabled={!!ongoingTask}
          />
        ))}
        {completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            taskId={task.id}
            status={task.status}
            onStatusChange={handleTaskStatusChange}
          />
        ))}
      </TaskCardsContainer>

      <BottomFadeEffect topPosition={topPosition} />
    </TaskSectionStyled>
  );
}

export default Task;
