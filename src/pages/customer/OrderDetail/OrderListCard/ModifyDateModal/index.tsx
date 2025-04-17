import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalContent,
  DateInfo,
  DateLabel,
  DateValue,
  NoticeText,
  ButtonGroup,
  CancelButton,
  ConfirmButton,
} from './styled';

type ModifyDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: globalThis.Date) => void;
  originalDate: string;
};

function ModifyDateModal({
  isOpen,
  onClose,
  onConfirm,
  originalDate,
}: ModifyDateModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // 動畫持續時間
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // 初始化選擇日期為今天
  const today = new globalThis.Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<globalThis.Date | null>(
    today,
  );

  // 將日期字符串轉換為 Date 對象
  const getDateFromString = (dateStr: string) => {
    const [year, month, day] = dateStr.split('/').map(Number);
    return new globalThis.Date(year, month - 1, day);
  };

  const originalDateObj = getDateFromString(originalDate);

  // 計算最早可修改日期（今天）和最晚可修改日期（原始日期前兩天）
  const maxDate = new globalThis.Date(originalDateObj);
  maxDate.setDate(originalDateObj.getDate() - 2);

  const formatDate = (date: globalThis.Date) => {
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onConfirm(selectedDate);
    }
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay $isClosing={isClosing}>
      <ModalContainer $isClosing={isClosing}>
        <ModalHeader>
          <ModalTitle>修改預約日期</ModalTitle>
        </ModalHeader>

        <ModalContent>
          <DateInfo>
            <DateLabel>原訂日期：</DateLabel>
            <DateValue>{originalDate}</DateValue>
            <DateLabel>修改日期：</DateLabel>
            <DateValue>
              {selectedDate ? formatDate(selectedDate) : '請選擇新的日期'}
            </DateValue>
          </DateInfo>

          <Calendar
            onChange={(date) => setSelectedDate(date as globalThis.Date)}
            value={selectedDate}
            minDate={today}
            maxDate={maxDate}
            locale="zh-TW"
            defaultView="month"
            showNeighboringMonth={false}
            formatDay={(locale, date) => date.getDate().toString()}
          />

          <NoticeText>
            ※ 請注意：
            <br />• 最早必須在原訂日期的兩天前修改預約
            <br />• 訂單修改時間將由本公司安排
          </NoticeText>

          <ButtonGroup>
            <CancelButton onClick={onClose}>取消</CancelButton>
            <ConfirmButton onClick={handleConfirm} disabled={!selectedDate}>
              確認修改
            </ConfirmButton>
          </ButtonGroup>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ModifyDateModal;
