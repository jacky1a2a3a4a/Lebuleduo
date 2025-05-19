import styled from 'styled-components';

// 型別定義
type ProgressBarProps = {
  $progress: number;
};

type CategoryPositionProps = {
  $topPosition: number;
};

type CategoryTabProps = {
  $isActive?: boolean;
};

type TaskCardsContainerProps = {
  $topPosition: number;
};

// 最外層容器
export const TaskSectionStyled = styled.section<{ $topPosition: number }>`
  background-color: var(--color-primary);

  position: relative;
  width: 100%;
  max-width: var(--min-width-mobile);
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

// === 外送員卡片 最外層容器 ===
export const DeliverContainer = styled.div`
  position: fixed;
  z-index: 20;
  width: 100%;
  max-width: var(--mobile-min-width);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 0 var(--spacing-md) var(--spacing-md);
`;

// === 外送員卡片 容器===
export const DeliverCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl);

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: var(--spacing-md);
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
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;

  p {
    font-weight: var(--font-weight-bold);
    margin-left: var(--spacing-xs);
  }
`;

// 外送員卡片 外送員編號
export const TaskId = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-3xs);
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
export const StatusItem = styled.div<{ $isEmpty?: boolean }>`
  color: ${(props) =>
    props.$isEmpty
      ? 'var(--color-text-disabled)'
      : 'var(--color-text-primary)'};
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

  width: ${({ $progress }) => $progress}%;
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

// === 任務卡片列表 最外層容器 ===
export const TaskCardsSection = styled.div<TaskCardsContainerProps>`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

  position: fixed;
  z-index: 10;
  top: ${({ $topPosition }) => `${$topPosition - 45}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--mobile-min-width);
  height: calc(100vh - ${({ $topPosition }) => `${$topPosition - 45}px`});
  padding: var(--spacing-xs) var(--spacing-md) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  transition: top 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// === 分類標籤 最外層容器 ===
export const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

  width: 100%;
  max-width: var(--mobile-min-width);
  padding: var(--spacing-md) 0;
  transition: top 0.3s ease;
`;

// 分類標籤 容器
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
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-tertiary)' : 'var(--color-white)'};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  border: ${({ $isActive }) =>
    $isActive ? 'none' : '1px solid var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: ${({ $isActive }) =>
    $isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'};
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? 'var(--color-tertiary-hover)'
        : 'var(--color-gray-100)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// === 任務卡片列表 容器 ===
export const TaskCardsContainer = styled.div`
  width: 100%;
  max-width: calc(var(--min-width-mobile));
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--spacing-2xl); //底部預留空間以免卡片被遮住

  &::-webkit-scrollbar {
    display: none;
  }
`;
