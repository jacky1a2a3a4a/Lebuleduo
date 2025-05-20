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
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 進度條 白底圓角容器
export const BackgroundContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 3px solid ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing['2xl']} ${theme.spacing.sm}`};
`;

// 進度條 容器
export const ProgressBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  position: relative;
  width: 100%;
  height: 5px;

  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

// 進度條 填充
export const ProgressBarFill = styled.div<StyledProps>`
  background-color: ${({ theme }) => theme.colors.primary.main};
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
  border: ${({ $isActive, $isPassed, theme }) =>
    $isActive || $isPassed ? 'none' : `2px solid ${theme.colors.secondary.main}`};
  background-color: ${({ $isActive, $isPassed, theme }) =>
    $isActive || $isPassed ? theme.colors.primary.main : theme.colors.white};
  z-index: 2;
`;

// 進度條 狀態 文字
export const ProgressStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// 進度狀態 文字
export const ProgressItem = styled.div<StyledProps>`
  // isActive 是否為當前狀態 900
  // isPassed 是否已通過 600
  // 已完成 400
  // isUnscheduled 未排定狀態
  color: ${({ $isActive, $isPassed, $isUnscheduled, theme }) =>
    $isUnscheduled
      ? theme.colors.gray[400]
      : $isActive
        ? theme.colors.primary.main
        : $isPassed
          ? theme.colors.gray[600]
          : theme.colors.gray[400]};

  font-weight: ${({ $isActive, $isPassed, theme }) =>
    $isActive || $isPassed
      ? theme.typography.fontWeights.bold
      : theme.typography.fontWeights.normal};

  z-index: 1;
  position: relative;

  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`; 