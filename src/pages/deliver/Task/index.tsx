import { useRef, useEffect, useState } from 'react';
import { HiTruck, HiCalendar } from 'react-icons/hi2';

//組件引用
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

function Task() {
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(96);
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
        address: '高雄市三民區和平一路124號1F',
        customer: '林先生',
      },
      {
        id: '2',
        status: 'waiting',
        time: '11:00am',
        address: '高雄市三民區和平一路126號2F',
        customer: '王先生',
      },
      {
        id: '3',
        status: 'waiting',
        time: '13:00pm',
        address: '高雄市三民區和平一路128號3F',
        customer: '張先生',
      },
      {
        id: '4',
        status: 'waiting',
        time: '14:00am',
        address: '高雄市三民區和平一路130號4F',
        customer: '陳先生',
      },
      {
        id: '5',
        status: 'waiting',
        time: '15:00am',
        address: '高雄市三民區和平一路132號5F',
        customer: '洪先生',
      },
      {
        id: '6',
        status: 'waiting',
        time: '16:00am',
        address: '高雄市三民區和平一路134號6F',
        customer: '黃先生',
      },
    ];
  });

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

      <BottomFadeEffect />
    </TaskSectionStyled>
  );
}

export default Task;
