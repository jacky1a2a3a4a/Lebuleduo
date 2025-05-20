import styled from 'styled-components';

// 最外層容器
export const FullHeightContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// === 固定容器 ===
export const FixedContainer = styled.div`
  position: fixed;
  z-index: 20;
  top: ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
`;

// === 外送員卡片 ===
export const DeliverContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.md};
`;

// 外送員資料
export const DeliverDataItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const DeliverName = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const DeliverId = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
`;

// 圖示容器
export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

// 日曆容器
export const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  /* 自定義 react-calendar 樣式 */
  .react-calendar {
    width: 100%;
    border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
    background: ${({ theme }) => theme.colors.white};
  }

  /* 年月標題樣式 */
  .react-calendar__navigation__label {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* 導航按鈕樣式 */
  .react-calendar__navigation button {
    background: none;
    border: none;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  /* 星期標題樣式 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: ${({ theme }) => theme.spacing.xs};
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* 調整日期格子的樣式 */
  .react-calendar__tile {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
    text-align: center;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing['2xs']};
  }

  /* 確保日期只顯示數字 */
  .react-calendar__tile abbr {
    text-decoration: none;
    display: block;
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 選中日期 */
  .react-calendar__tile--active {
    background-color: ${({ theme }) => theme.colors.tertiary.main};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    transition:
      background-color 0.2s ease,
      border-radius 0.2s ease;
  }

  /* 修改 focus 狀態，保持圓形 */
  .react-calendar__tile--active:enabled:focus {
    background-color: ${({ theme }) => theme.colors.tertiary.hover};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }

  /* 移除選中狀態時的方形過渡 - 確保任何時候都保持圓形 */
  .react-calendar__tile--active:not(:enabled:focus) {
    background-color: ${({ theme }) => theme.colors.tertiary.main};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }

  /* 今天日期 */
  .react-calendar__tile--now {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 3px solid ${({ theme }) => theme.colors.primary.main};
  }

  /* 休假日期的樣式 */
  .react-calendar__tile.holiday {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.secondary.main};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  /* 確保所有互動狀態下都保持圓角 */
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus,
  .react-calendar__tile--active:disabled:hover,
  .react-calendar__tile--active:focus-visible,
  .react-calendar__tile--active:focus-within,
  .react-calendar__tile--active:active {
    border-radius: ${({ theme }) => theme.borderRadius.xl} !important;
    transition: background-color 0.2s ease;
  }

  /* 防止任何可能的閃爍 */
  .react-calendar__tile {
    outline: none !important;
    transition:
      background-color 0.2s ease,
      border-radius 0s;
  }

  /* 防止瀏覽器默認聚焦樣式 */
  .react-calendar__tile:focus {
    outline: none !important;
  }
`;

// 任務項目容器
export const TaskItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// 任務行
export const TaskRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 任務標題
export const TaskTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 任務狀態
export const TaskStatus = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

// === 任務列表 大容器 ===
export const TaskListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;
