import { useState } from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import { DatePickerContainer, DateDisplay, IconStyled } from './styled';

import Calendar from './Calendar';

import { getFormattedDateWithDay } from '../../../../utils/formatDate'; // 格式化日期2025/04/21(四)

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  qrCodeMethod: 'print' | 'ship';
}

const DatePicker = ({
  selectedDate,
  onDateSelect,
  qrCodeMethod,
}: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateClick = () => {
    setIsCalendarOpen(true);
  };

  return (
    <>
      <DatePickerContainer onClick={handleDateClick}>
        <DateDisplay>
          {getFormattedDateWithDay(selectedDate.toISOString())}
        </DateDisplay>
        <IconStyled>
          <MdCalendarMonth />
        </IconStyled>
      </DatePickerContainer>

      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          onDateSelect(date);
          setIsCalendarOpen(false);
        }}
        qrCodeMethod={qrCodeMethod}
      />
    </>
  );
};

export default DatePicker;
