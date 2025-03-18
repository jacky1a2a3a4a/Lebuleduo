import styled from 'styled-components';
import { HiTruck, HiCalendar } from 'react-icons/hi2';
import { useRef, useEffect, useState } from 'react';

import TaskCard from './TaskCard';

// 任務大容器
const TaskSectionStyled = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
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
  margin-bottom: var(--spacing-xs);
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

// 任務類型標籤 容器
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

  // 左側淡入效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1rem;
    background: linear-gradient(to right, var(--color-gray-100), transparent);
    pointer-events: none;
    z-index: 1;
  }

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

const TaskCategoryContainer = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem var(--spacing-sm);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  /* 隱藏水平滾動條 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 確保最後一個標籤有足夠空間 */
  &::after {
    content: '';
    padding-right: 2rem;
  }
`;

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

// 修改任務卡片容器的定位方式
const TaskCardsContainer = styled.div<{ topPosition: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${(props) => `${props.topPosition + 50}px`}; // 加上標籤容器的高度
  bottom: 0;
  width: 100%;
  transition: top 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 0.5rem;
  z-index: 10;

  /* 隱藏原生滾動條但保留功能 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray-300);
    border-radius: 20px;
  }

  /* 添加淡入陰影效果 */
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, var(--color-gray-100), transparent);
    pointer-events: none;
  }
`;

function Task() {
  const deliverContainerRef = useRef<HTMLDivElement>(null);
  const [topPosition, setTopPosition] = useState(96); // 6rem 的預設值

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

  // 計算進度百分比
  const totalItems = 15;
  const completedItems = 4;
  const progressPercentage = (completedItems / totalItems) * 100;

  const currentDate = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <TaskSectionStyled>
      {/* 外送員卡片 */}
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
                <span>4/15</span>
              </StatusItem>

              <StatusItem>
                <Label>異常:</Label>
                <span>0</span>
              </StatusItem>
            </ProgressStatus>
          </DeliverProgressHeader>

          {/* 進度條 */}
          <DeliverProgressBarContainer>
            <DeliverProgressBarFill progress={progressPercentage} />
          </DeliverProgressBarContainer>
        </DeliverProgress>
      </DeliverContainer>

      {/* 任務類型標籤 */}
      <TaskCategoryWrapper topPosition={topPosition}>
        <TaskCategoryContainer>
          <CategoryTab isActive>全部</CategoryTab>
          <CategoryTab>未完成(11)</CategoryTab>
          <CategoryTab>已完成(4)</CategoryTab>
          <CategoryTab>異常回報(0)</CategoryTab>
        </TaskCategoryContainer>
      </TaskCategoryWrapper>

      {/* 任務卡片 */}
      <TaskCardsContainer topPosition={topPosition}>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </TaskCardsContainer>
    </TaskSectionStyled>
  );
}

export default Task;
