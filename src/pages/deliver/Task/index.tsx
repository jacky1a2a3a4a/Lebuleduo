import styled from 'styled-components';
import { HiCalendar, HiCalendarDateRange, HiTruck } from 'react-icons/hi2';

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const TaskContainer = styled.div`
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 402px;
  padding: 1rem;
`;

const TaskGreeting = styled.div`
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

const TaskDate = styled.div`
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

const TaskProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const TaskProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TaskProgressTitle = styled.div`
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

const TaskProgressStatus = styled.div`
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
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-gray-200);
  border-radius: 4px;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
`;

// 進度條填充部分
const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #000000; /* 根據圖片使用黑色 */
  border-radius: 4px;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

// 詳細按鈕
const DetailButton = styled.button`
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

function Task() {
  // 計算進度百分比
  const completedItems = 4;
  const totalItems = 15;
  const progressPercentage = (completedItems / totalItems) * 100;

  return (
    <SectionStyled>
      <TaskContainer>
        <TaskGreeting>
          <TaskGreetingItem>早安，汪汪員</TaskGreetingItem>
          <TaskId>ID-158673</TaskId>
        </TaskGreeting>

        <TaskDate>
          <HiCalendarStyled />
          <div>2025/03/12</div>
        </TaskDate>

        <TaskProgress>
          <TaskProgressHeader>
            <TaskProgressTitle>
              <HiTruckStyled />
              <div>今日收運進度</div>
            </TaskProgressTitle>

            <TaskProgressStatus>
              <StatusItem>
                <Label>已完成:</Label>
                <span>4/15</span>
              </StatusItem>

              <StatusItem>
                <Label>異常:</Label>
                <span>0</span>
              </StatusItem>
            </TaskProgressStatus>
          </TaskProgressHeader>

          {/* 新增的進度條 */}
          <ProgressBarContainer>
            <ProgressBarFill progress={progressPercentage} />
          </ProgressBarContainer>
        </TaskProgress>

        {/* 詳細按鈕 */}
        <DetailButton>
          <HiCalendarDateRangeStyled />
          詳細班表
        </DetailButton>
      </TaskContainer>
    </SectionStyled>
  );
}

export default Task;
