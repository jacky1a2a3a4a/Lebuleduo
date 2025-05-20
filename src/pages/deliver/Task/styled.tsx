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
  background-color: ${({ theme }) => theme.colors.primary.main};
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
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
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
`;

// === 外送員卡片 容器===
export const DeliverCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

// 外送員卡片 問候語容器
export const DeliverGreeting = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 外送員卡片 問候語
export const TaskGreetingItem = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;

  p {
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

// 外送員卡片 外送員編號
export const TaskId = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
`;

// 外送員卡片 本日收運進度
export const ProgressTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 外送員卡片 icon容器
export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  width: 24px;
  height: 24px;
  margin-right: ${({ theme }) => theme.spacing.xs};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
`;

// 外送員卡片 日期容器
export const DeliverDate = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

// 外送員卡片 進度 狀態大容器
export const ProgressStatus = styled.div`
  display: flex;
  gap: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

// 外送員卡片 進度 狀態個別容器
export const StatusItem = styled.div<{ $isEmpty?: boolean }>`
  color: ${({ theme, $isEmpty }) =>
    $isEmpty ? theme.colors.text.disabled : theme.colors.text.primary};
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const Label = styled.span`
  margin-right: 4px;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// 外送員卡片 進度條容器
export const DeliverProgressBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 100%;
  height: 24px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

export const DeliverProgressBarFill = styled.div<ProgressBarProps>`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.secondary.main}
  );
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  transition: width 0.3s ease;
`;

export const OngoingTaskContainer = styled.div`
  background-color: transparent;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const OngoingTaskTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  width: 100%;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// === 任務卡片列表 最外層容器 ===
export const TaskCardsSection = styled.div<TaskCardsContainerProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  position: fixed;
  z-index: 10;
  top: ${({ $topPosition }) => `${$topPosition - 45}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  height: calc(100vh - ${({ $topPosition }) => `${$topPosition - 45}px`});
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
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
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: ${({ theme }) => theme.spacing.md} 0;
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
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.tertiary.main : theme.colors.white};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  border: ${({ $isActive, theme }) =>
    $isActive ? 'none' : `1px solid ${theme.colors.neutral[300]}`};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.typography.fontWeights.medium : theme.typography.fontWeights.normal};
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.tertiary.hover : theme.colors.gray[100]};
  }

  &:active {
    transform: scale(0.98);
  }
`;

// === 任務卡片列表 容器 ===
export const TaskCardsContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-overflow-scrolling: touch;
  padding-bottom: ${({ theme }) => theme.spacing['2xl']}; //底部預留空間以免卡片被遮住

  &::-webkit-scrollbar {
    display: none;
  }
`;
