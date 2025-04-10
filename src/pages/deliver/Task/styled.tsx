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
  background-color: var(--color-primary);

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

// 外送員卡片 icon容器
export const IconWrapper = styled.div`
  color: var(--color-text-Primary);

  width: 24px;
  height: 24px;
  margin-right: var(--spacing-xs);

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

  font-size: var(--font-size-sm);
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
  background: linear-gradient(
    to right,
    var(--color-primary),
    var(--color-secondary)
  );

  width: ${({ progress }) => progress}%;
  height: 100%;

  border-radius: var(--border-radius-round);
  transition: width 0.3s ease;
`;

export const OngoingTaskContainer = styled.div`
  background-color: transparent;

  width: 100%;
  margin-bottom: var(--spacing-xs);
  padding: var(--spacing-xs);
`;

export const OngoingTaskTitle = styled.div`
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-secondary);

  width: 100%;

  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
`;

// 分類標籤 最外層容器
export const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

  position: fixed;
  z-index: 15;
  top: ${({ topPosition }) => `${topPosition - 16}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile));

  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md)
    var(--spacing-md);

  transition: top 0.3s ease;
`;

// 分類標籤 最外層容器
export const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
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
    isActive ? 'var(--color-tertiary)' : 'var(--color-white)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  border: ${({ isActive }) =>
    isActive ? 'none' : '1px solid var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: ${({ isActive }) =>
    isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'};
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? 'var(--color-tertiary-hover)' : 'var(--color-gray-100)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TaskCardsContainer = styled.div<TaskCardsContainerProps>`
  background-color: var(--color-white);

  position: fixed;
  z-index: 10;
  top: ${({ topPosition }) => `${topPosition + 56}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: calc(var(--min-width-mobile));
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
