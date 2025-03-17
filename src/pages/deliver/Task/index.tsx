import styled from 'styled-components';
import { HiCalendar, HiCalendarDateRange, HiTruck } from 'react-icons/hi2';

import TaskCard from './TaskCard';

// 任務大容器
const DeliverTaskSectionStyled = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

// 外送員卡片容器
const DeliverContainer = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  box-sizing: border-box;

  position: fixed;
  top: 6rem;

  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  z-index: 10;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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
  margin-bottom: 1rem;
`;

const HiCalendarStyled = styled(HiCalendar)`
  width: 1.5rem;
  height: 1.5rem;

  margin-right: 0.5rem;
`;

const DeliverProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
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

const HiTruckStyled = styled(HiTruck)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
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
  margin: 0.5rem 0 1rem 0;
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

// 詳細班表按鈕
const DeliverDetailButton = styled.button`
  background-color: var(--color-gray-300);
  color: var(--color-gray-700);

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-400);
    color: var(--color-gray-0);
  }
`;

const HiCalendarDateRangeStyled = styled(HiCalendarDateRange)`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

// 任務類型標籤容器
const TaskCategoryContainer = styled.div`
  background-color: transparent;

  position: fixed;
  display: flex;
  gap: 0.5rem;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  top: calc(6rem + 275px); /* 根據 DeliverContainer 調整位置 */
  padding: 0.5rem 0;

  z-index: 10;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  /* 隱藏水平滾動條 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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

  &:hover {
    background-color: ${(props) =>
      props.isActive ? 'var(--color-gray-800)' : 'var(--color-gray-300)'};
  }
`;

const TaskCardsContainer = styled.div`
  position: fixed;
  top: calc(6rem + 330px); /* 調整高度確保在標籤下方 */
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* 改善行動裝置滾動體驗 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 0.5rem;

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
    background: linear-gradient(to top, var(--color-gray-0), transparent);
    pointer-events: none;
  }
`;

function Task() {
  // 計算進度百分比
  const totalItems = 15;
  const completedItems = 4;
  const progressPercentage = (completedItems / totalItems) * 100;

  return (
    <DeliverTaskSectionStyled>
      {/* 外送員卡片 */}
      <DeliverContainer>
        <DeliverGreeting>
          <TaskGreetingItem>早安，汪汪員</TaskGreetingItem>
          <TaskId>ID-158673</TaskId>
        </DeliverGreeting>

        <DeliverDate>
          <HiCalendarStyled />
          <div>2025/03/12</div>
        </DeliverDate>

        <DeliverProgress>
          <DeliverProgressHeader>
            <ProgressTitle>
              <HiTruckStyled />
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

          {/* 新增的進度條 */}
          <DeliverProgressBarContainer>
            <DeliverProgressBarFill progress={progressPercentage} />
          </DeliverProgressBarContainer>
        </DeliverProgress>

        {/* 詳細按鈕 */}
        <DeliverDetailButton>
          <HiCalendarDateRangeStyled />
          詳細班表
        </DeliverDetailButton>
      </DeliverContainer>

      {/* 任務類型標籤 */}
      <TaskCategoryContainer>
        <CategoryTab isActive>全部</CategoryTab>
        <CategoryTab>未完成(11)</CategoryTab>
        <CategoryTab>已完成(4)</CategoryTab>
        <CategoryTab>異常回報(0)</CategoryTab>
      </TaskCategoryContainer>

      {/* 任務卡片 */}
      <TaskCardsContainer>
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </TaskCardsContainer>
    </DeliverTaskSectionStyled>
  );
}

export default Task;
