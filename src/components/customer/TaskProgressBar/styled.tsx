import styled from 'styled-components';

type StyledProps = {
  $progress?: number;
  $position?: number;
  $isActive?: boolean;
  $isPassed?: boolean;
  $isUnscheduled?: boolean;
};

// 進度條 最外層區塊
export const ProgressBarSection = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-md);
`;

// 進度條 白底圓角容器
export const BackgroundContainer = styled.div`
  background-color: var(--color-background-secondary);
  border: 3px solid var(--color-secondary);
  border-radius: var(--border-radius-round);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-lg) var(--spacing-2xl) var(--spacing-sm);
`;

// 進度條 容器
export const ProgressBarContainer = styled.div`
  background-color: var(--color-neutral-300);
  border-radius: var(--border-radius-round);

  position: relative;
  width: 100%;
  height: 5px;

  padding: 0 var(--spacing-sm);
`;

// 進度條 填充
export const ProgressBarFill = styled.div<StyledProps>`
  background-color: var(--color-primary);
  width: ${({ $progress }) => ($progress ? `${$progress}%` : '0%')};

  height: 100%;

  transition: width 0.3s ease;
`;

// 進度點容器
export const ProgressDotContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// 進度圖標
export const DogTruckImage = styled.img<StyledProps>`
  position: absolute;
  z-index: 3;
  top: -15px;
  left: ${({ $progress }) =>
    $progress === 0 ? '0' : $progress === 50 ? '50%' : '100%'};
  transform: ${({ $progress }) =>
    $progress === 0
      ? 'translateX(-50%)'
      : $progress === 50
        ? 'translateX(-50%)'
        : 'translateX(-50%)'};
  width: 40px;
  object-fit: contain;
`;

// 進度點
export const ProgressDot = styled.div<StyledProps>`
  position: absolute;
  left: ${({ $position }) =>
    $position === 0 ? '0' : $position === 50 ? '50%' : '100%'};
  top: 50%;
  transform: ${({ $position }) =>
    $position === 0
      ? 'translateY(-50%)'
      : $position === 100
        ? 'translate(-100%, -50%)'
        : 'translate(-50%, -50%)'};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed ? 'none' : '2px solid var(--color-secondary)'};
  background-color: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed ? 'var(--color-primary)' : 'var(--color-white)'};
  z-index: 2;
`;

// 進度條 狀態 文字
export const ProgressStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
`;

// 進度狀態 文字
export const ProgressItem = styled.div<StyledProps>`
  // isActive 是否為當前狀態 900
  // isPassed 是否已通過 600
  // 已完成 400
  // isUnscheduled 未排定狀態
  color: ${({ $isActive, $isPassed, $isUnscheduled }) =>
    $isUnscheduled
      ? 'var(--color-gray-400)'
      : $isActive
        ? 'var(--color-primary)'
        : $isPassed
          ? 'var(--color-gray-600)'
          : 'var(--color-gray-400)'};

  font-weight: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed
      ? 'var(--font-weight-bold)'
      : 'var(--font-weight-normal)'};

  z-index: 1;
  position: relative;

  text-align: center;
  padding-top: var(--spacing-sm);

  font-size: var(--font-size-xs);
`; 