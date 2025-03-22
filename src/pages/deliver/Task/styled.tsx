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

// 樣式組件
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

export const DeliverContainer = styled.div`
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
`;

export const DeliverGreeting = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TaskGreetingItem = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

export const TaskId = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

export const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeliverDate = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-sm);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
`;

export const DeliverProgress = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const DeliverProgressHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProgressTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
`;

export const ProgressStatus = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: 500;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const Label = styled.span`
  margin-right: 4px;
`;

export const DeliverProgressBarContainer = styled.div`
  background-color: var(--color-gray-200);

  width: 100%;
  height: 8px;
  margin: 0.5rem 0;

  border-radius: 4px;
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

export const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0.75rem 0;
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

export const BottomFadeEffect = styled.div`
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
