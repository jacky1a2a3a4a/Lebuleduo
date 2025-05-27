import { useState, useEffect } from 'react';
import {
  StyledCalendar,
  CalendarHeader,
  CalendarTitle,
  CalendarCloseButton,
  CalendarContent,
  CalendarGrid,
  CalendarDay,
  CalendarWeekday,
  CalendarButtonGroup,
  CalendarSubmitButton,
  CalendarCancelButton,
  CalendarNavButton,
  CalendarNavButtonGroup,
} from './styled';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  qrCodeMethod: 'print' | 'ship';
}

const Calendar = ({
  isOpen,
  onClose,
  selectedDate: initialSelectedDate,
  onDateSelect,
  qrCodeMethod,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(initialSelectedDate);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  // 監聽 qrCodeMethod 的變化
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (qrCodeMethod === 'ship') {
      // 如果是郵寄貼紙，設置為三天後的日期
      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(today.getDate() + 3);
      setSelectedDate(threeDaysLater);
    } else {
      // 如果是自行列印，設置為明天
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      setSelectedDate(tomorrow);
    }
  }, [qrCodeMethod]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 添加前一個月的天數
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(new Date(year, month, -i));
    }

    // 添加當月的天數
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // 添加下一個月的天數
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    onDateSelect(selectedDate);
    onClose();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const isSameMonth = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (qrCodeMethod === 'ship') {
      // 如果是郵寄貼紙，只能選擇從今天起三天後的日期
      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(today.getDate() + 3);
      return date < threeDaysLater;
    }

    // 如果是自行列印，只能選擇明天之後的日期
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return date < tomorrow;
  };

  return (
    <StyledCalendar $isOpen={isOpen}>
      <CalendarHeader>
        <CalendarNavButtonGroup>
          <CalendarNavButton onClick={handlePrevMonth}>←</CalendarNavButton>
          <CalendarTitle>
            {currentMonth.toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
            })}
          </CalendarTitle>
          <CalendarNavButton onClick={handleNextMonth}>→</CalendarNavButton>
        </CalendarNavButtonGroup>
        <CalendarCloseButton onClick={onClose}>×</CalendarCloseButton>
      </CalendarHeader>

      <CalendarContent>
        <CalendarGrid>
          {weekdays.map((day) => (
            <CalendarWeekday key={day}>{day}</CalendarWeekday>
          ))}
          {days.map((day) => (
            <CalendarDay
              key={day.toString()}
              $isCurrentMonth={isSameMonth(day, currentMonth)}
              $isSelected={isSameDay(day, selectedDate)}
              $isToday={isToday(day)}
              $isDisabled={isDateDisabled(day)}
              onClick={() => !isDateDisabled(day) && handleDateClick(day)}
            >
              {day.getDate()}
            </CalendarDay>
          ))}
        </CalendarGrid>
      </CalendarContent>

      <CalendarButtonGroup>
        <CalendarCancelButton onClick={onClose}>取消</CalendarCancelButton>
        <CalendarSubmitButton onClick={handleSubmit}>確認</CalendarSubmitButton>
      </CalendarButtonGroup>
    </StyledCalendar>
  );
};

export default Calendar;
