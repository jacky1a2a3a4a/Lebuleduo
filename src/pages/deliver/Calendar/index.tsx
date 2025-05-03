import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getSpecificDayOrders } from '../../../apis/deliver/getSpecificDayOrders';
import { getUsersID } from '../../../utils/getUserLocalData';
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

interface Task {
  orderId: string;
  // 可以根據 API 回傳的實際資料結構添加更多欄位
}

const CalendarComponent = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState<Task[]>([]);
  const usersId = getUsersID();

  // 休假日期的假資料
  const holidays = [
    new Date(2025, 3, 11), // 4月11日
    new Date(2025, 3, 20), // 4月20日
    new Date(2025, 3, 30), // 4月30日
    new Date(2025, 4, 10), // 5月2日
    new Date(2025, 4, 13), // 5月1日
  ];

  const handleDateChange = async (date: Date) => {
    setSelectedDate(date);
    try {
      if (!usersId) {
        throw new Error('未找到用戶 ID，請重新登入');
      }
      const orders = await getSpecificDayOrders(usersId, date);
      setTasks(orders);
      console.log('api 獲取的任務', orders);
    } catch (error) {
      console.error('獲取任務失敗:', error);
      setTasks([]);
    }
  };

  // 檢查日期是否為休假日
  const isHoliday = (date: Date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear(),
    );
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
              tileClassName={({ date }) => (isHoliday(date) ? 'holiday' : '')}
              tileContent={({ date }) => {
                const isToday = date.toDateString() === today.toDateString();
                return isToday ? (
                  <div>今日</div>
                ) : isHoliday(date) ? (
                  <div>休假</div>
                ) : null;
              }}
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
      <TaskListContainer>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskRow key={index}>
              <TaskTitle>任務 {index + 1}:</TaskTitle>
              <TaskStatus>
                <p>{task.orderId}</p>
              </TaskStatus>
            </TaskRow>
          ))
        ) : (
          <div>當日無任務</div>
        )}
      </TaskListContainer>
    </FullHeightContainer>
  );
};

export default CalendarComponent;
