import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { HiCalendar, HiTruck } from 'react-icons/hi2';

//flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css';

// 最外層容器
const FullHeightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

// 外送員卡片
const DeliverContainer = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  top: 6rem;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);

  padding: 1rem;
`;

// 外送員資料
const DeliverDataItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: var(--spacing-sm);
`;

const DeliverName = styled.div`
  color: var(--color-gray-900);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
`;

const DeliverId = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
`;

// 圖示容器
const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
`;

// 日曆容器
const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;

  /* 自定義 flatpickr 樣式 */
  .flatpickr-calendar {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box;
  }

  .dayContainer {
    width: 100% !important;
    min-width: auto !important;
    max-width: 100% !important;
  }
`;

// 日曆輸入容器
const CalendarInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
`;

// 日期輸入框
const DateInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
`;

// 任務項目容器
const TaskItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: var(--spacing-lg);
`;

// 任務行
const TaskRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  font-size: var(--font-size-md);

  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 任務標題
const TaskTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 任務狀態
const TaskStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: var(--font-weight-bold);
`;

const Calendar = () => {
  const calendarRef = useRef(null);
  // 使用當前日期作為默認值
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // 格式化為 YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(formattedToday);

  useEffect(() => {
    // 初始化 Flatpickr
    const fpInstance = flatpickr(calendarRef.current, {
      // 基本配置
      dateFormat: 'Y-m-d',
      inline: true, // 永遠顯示日曆
      static: true, // 防止日曆位置偏移
      defaultDate: today, // 設置默認日期為今天
      
      // 當日期選擇變更時觸發
      onChange: function (selectedDates, dateStr) {
        setSelectedDate(dateStr);
      },
    });

    // 組件卸載時清理
    return () => {
      fpInstance.destroy();
    };
  }, []);

  return (
    <FullHeightContainer>
      <DeliverContainer>
        <DeliverDataItems>
          <DeliverName>汪汪員</DeliverName>
          <DeliverId>ID-158673</DeliverId>
        </DeliverDataItems>

        <CalendarContainer>
          <CalendarInputContainer>
            <DateInput ref={calendarRef} type="text" placeholder="選擇日期" />
          </CalendarInputContainer>
        </CalendarContainer>

        {/* 任務項目 */}
        <TaskItems>
          <TaskRow>
            <TaskTitle>
              <IconStyled>
                <HiCalendar />
              </IconStyled>
              收運日期：
            </TaskTitle>
            <TaskStatus>{selectedDate}</TaskStatus>
          </TaskRow>

          <TaskRow>
            <TaskTitle>
              <IconStyled>
                <HiTruck />
              </IconStyled>
              當日收運件數:
            </TaskTitle>
            <TaskStatus>
              <p>23件</p>
            </TaskStatus>
          </TaskRow>
        </TaskItems>
      </DeliverContainer>
    </FullHeightContainer>
  );
};

export default Calendar;
