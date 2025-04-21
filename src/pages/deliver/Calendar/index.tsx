import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  FullHeightContainer,
  FixedContainer,
  DeliverContainer,
  DeliverDataItems,
  DeliverName,
  DeliverId,
  CalendarContainer,
  TaskItems,
  TaskRow,
  TaskTitle,
  TaskStatus,
  TaskListContainer,
} from './styled';

const CalendarComponent = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // 自定義日期格式
  const formatDay = (locale: string, date: Date) => {
    return date.getDate().toString();
  };

  return (
    <FullHeightContainer>
      {/* 外送員卡片 */}
      <FixedContainer>
        <DeliverContainer>
          <DeliverDataItems>
            <DeliverName>汪汪員的行事曆</DeliverName>
            <DeliverId>ID-158673</DeliverId>
          </DeliverDataItems>

          {/* 日曆 */}
          <CalendarContainer>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              locale="zh-TW"
              calendarType="gregory"
              formatDay={formatDay}
              showNavigation={true}
            />
          </CalendarContainer>

          {/* 任務項目 */}
          <TaskItems>
            <TaskRow>
              <TaskTitle>收運日期：</TaskTitle>
              <TaskStatus>
                {selectedDate.toLocaleDateString('zh-TW')}
              </TaskStatus>
            </TaskRow>

            <TaskRow>
              <TaskTitle>當日收運件數:</TaskTitle>
              <TaskStatus>
                <p>23件</p>
              </TaskStatus>
            </TaskRow>
          </TaskItems>
        </DeliverContainer>
      </FixedContainer>

      {/* 任務列表 */}
      <TaskListContainer>aaaaa</TaskListContainer>
    </FullHeightContainer>
  );
};

export default CalendarComponent;
