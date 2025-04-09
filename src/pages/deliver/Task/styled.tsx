import styled from 'styled-components';

// 型別定義
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

// 最外層容器
export const TaskSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 外送員卡片 最外層容器
export const DeliverContainer = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl);

  position: fixed;
  z-index: 20;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: var(--spacing-20) var(--spacing-md);
`;

// 外送員卡片 問候語容器
export const DeliverGreeting = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-md);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 外送員卡片 問候語
export const TaskGreetingItem = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 600;
`;

// 外送員卡片 外送員編號
export const TaskId = styled.div`
  color: var(--color-text-Tertiary);
  font-size: var(--font-size-sm);
`;

// 外送員卡片 本日收運進度
export const ProgressTitle = styled.div`
  color: var(--color-text-secondary);

  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--spacing-xs);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

//外送員卡片 進度 最外層容器
export const DeliverProgress = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

// 外送員卡片 進度 標題容器
export const DeliverProgressHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: var(--spacing-sm);
`;

// 外送員卡片 日期容器
export const IconWrapper = styled.div`
  color: var(--color-text-Primary);

  width: 24px;
  height: 24px;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-xl);
`;

// 外送員卡片 日期容器
export const DeliverDate = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

// 外送員卡片 進度 狀態大容器
export const ProgressStatus = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: var(--font-weight-normal);
`;

// 外送員卡片 進度 狀態個別容器
export const StatusItem = styled.div<{ isEmpty?: boolean }>`
  color: ${(props) =>
    props.isEmpty ? 'var(--color-text-disabled)' : 'var(--color-text-primary)'};
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const Label = styled.span`
  margin-right: 4px;
`;

// 外送員卡片 進度條容器
export const DeliverProgressBarContainer = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-round);

  width: 100%;
  height: 24px;
  margin: 0.5rem 0;

  overflow: hidden;
`;

export const DeliverProgressBarFill = styled.div<ProgressBarProps>`
  background-color: var(--color-gray-900);

  width: ${({ progress }) => progress}%;
  height: 100%;

  border-radius: var(--border-radius-round);
  transition: width 0.3s ease;
`;

export const OngoingTaskContainer = styled.div`
  width: 100%;
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-gray-200);
  padding: var(--spacing-xs);
  background-color: var(--color-gray-50);
`;

export const OngoingTaskTitle = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
`;

export const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: var(--color-gray-100);
  position: fixed;
  z-index: 15;
  top: ${({ topPosition }) => `${topPosition}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  transition: top 0.3s ease;

  /* &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 3rem;
    height: 100%;
    background: linear-gradient(to right, transparent, var(--color-gray-100));
    pointer-events: none;
  } */
`;

// 分類標籤 最外層容器
export const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.75rem 0;
  margin: 0 auto;
  display: flex;
  gap: 0.75rem;

  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    padding-right: 2rem;
  }
`;

export const CategoryTab = styled.button<CategoryTabProps>`
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

  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? 'var(--color-gray-800)' : 'var(--color-gray-300)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TaskCardsContainer = styled.div<TaskCardsContainerProps>`
  position: fixed;
  z-index: 10;
  top: ${({ topPosition }) => `${topPosition + 56}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  height: calc(100vh - ${({ topPosition }) => `${topPosition + 56}px`} - 4rem);
  padding: 0.5rem 0;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transition: top 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//底部淡出效果
// export const BottomFadeEffect = styled.div`
//   background: linear-gradient(to top, var(--color-gray-100) 30%, transparent);

//   position: fixed;
//   z-index: 11;
//   bottom: 4rem;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 100%;
//   max-width: calc(var(--min-width-mobile) - 2rem);
//   height: 8rem;

//   pointer-events: none;
// `;
