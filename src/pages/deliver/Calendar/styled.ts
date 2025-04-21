import styled from 'styled-components';

// 最外層容器
export const FullHeightContainer = styled.div`
  background-color: var(--color-primary);
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
  top: var(--spacing-2xl);
  width: 100%;
  max-width: var(--mobile-min-width);

  padding: var(--spacing-sm) var(--spacing-md);
`;

// === 外送員卡片 ===
export const DeliverContainer = styled.div`
  background-color: var(--color-background-secondary);
  border: var(--border-width) solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: var(--spacing-md);
`;

// 外送員資料
export const DeliverDataItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: var(--spacing-xs);
`;

export const DeliverName = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
`;

export const DeliverId = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

// 圖示容器
export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
`;

// 日曆容器
export const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: var(--spacing-sm);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-lg);

  /* 自定義 react-calendar 樣式 */
  .react-calendar {
    width: 100%;
    border: 2px solid var(--color-neutral-300);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    background: var(--color-white);
  }

  /* 年月標題樣式 */
  .react-calendar__navigation__label {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  /* 導航按鈕樣式 */
  .react-calendar__navigation button {
    background: none;
    border: none;
    font-size: var(--font-size-md);
    padding: var(--spacing-sm);
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: var(--color-primary-100);
  }

  /* 星期標題樣式 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-500);
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: var(--spacing-sm);
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* 調整日期格子的樣式 */
  .react-calendar__tile {
    padding: var(--spacing-sm);
    font-size: var(--font-size-xs);
    text-align: center;
  }

  /* 確保日期只顯示數字 */
  .react-calendar__tile abbr {
    text-decoration: none;
    display: block;
  }

  /* 選中日期 */
  .react-calendar__tile--active {
    background-color: var(--color-tertiary);
    color: var(--color-white);
    border-radius: var(--border-radius-round);
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: var(--color-tertiary-hover);
  }

  /* 今天日期 */
  .react-calendar__tile--now {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--border-radius-lg);
    border: 3px solid var(--color-primary);
  }
`;

// 任務項目容器
export const TaskItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: var(--spacing-md);
`;

// 任務行
export const TaskRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  font-size: var(--font-size-md);

  margin-bottom: var(--spacing-xs);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 任務標題
export const TaskTitle = styled.div`
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
`;

// 任務狀態
export const TaskStatus = styled.div`
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
`;

// === 任務列表 大容器 ===
export const TaskListContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;

  position: fixed;
  z-index: 10;
  top: 500px;
  width: 100%;
  max-width: var(--mobile-min-width);
  height: 100%;
`;
