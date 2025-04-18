import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import {
  StatusMessage,
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
  CalendarContainer,
} from './styled.tsx';

//日曆組件props
type ModifyDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: globalThis.Date) => void;
  usersId: number;
  ordersId: number;
  orderDetailId: number;
};

//訂單詳細資料 api回應
type OrderDetailResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: {
    OrdersID: number;
    UsersID: number;
    OrderStatus: string;
    OrderDetailID: number;
    OriginalDate: string; // （YYYY/MM/DD 格式）
    DriverTime: string | null;
    EndDate: string; // （YYYY-MM-DDTHH:mm:ss 格式）
  };
  allOrderDates: Array<{
    ServiceDate: string; // （YYYY/MM/DD 格式）
  }>;
};

// ===組件本體 ===
function ModifyDateModal({
  isOpen,
  onClose,
  onConfirm,
  usersId,
  ordersId,
  orderDetailId,
}: ModifyDateModalProps) {
  const [isClosing, setIsClosing] = useState(false); //關閉狀態
  const [isVisible, setIsVisible] = useState(false); //顯示狀態
  const [orderDetail, setOrderDetail] = useState<
    OrderDetailResponse['result'] | null
  >(null); //api獲取的任務時間資料
  const [allOrderDates, setAllOrderDates] = useState<
    OrderDetailResponse['allOrderDates']
  >([]); //所有任務日期
  const [isLoading, setIsLoading] = useState(false); //載入狀態
  const [error, setError] = useState<string | null>(null); //錯誤訊息
  const [selectedDate, setSelectedDate] = useState<globalThis.Date | null>(
    null,
  ); //預設選擇日期為 任務原定日期

  // 初始化今日日期
  const today = new globalThis.Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<OrderDetailResponse>(
          `api/GET/users/${usersId}/orders/${ordersId}/orderDetails/${orderDetailId}`,
        );
        setAllOrderDates(response.data.allOrderDates); // 設定所有任務日期
        setOrderDetail(response.data.result); // 設定任務時間資料
        console.log('該筆方案所有任務日期:', response.data.allOrderDates);
        console.log('任務時間資料:', response.data.result);
      } catch (err) {
        setError('取得訂單資料失敗');
        console.error('Error fetching order detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // 控制modal顯示與關閉
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      fetchOrderDetail();
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible, usersId, ordersId, orderDetailId]);

  // 將日期字符串（YYYY/MM/DD 格式）轉換為 Date 對象
  // const getDateFromString = (dateStr: string) => {
  //   const [year, month, day] = dateStr.split('/').map(Number);
  //   return new globalThis.Date(year, month - 1, day);
  // };

  // 將 ISO 格式的日期字符串（YYYY-MM-DDTHH:mm:ss 格式）轉換為 Date 對象
  const getDateFromISOString = (dateStr: string) => {
    return new globalThis.Date(dateStr);
  };

  //將  Date 物件轉換為"YYYY/MM/DD" 字串格式
  const formatDate = (date: globalThis.Date) => {
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 計算可選擇的日期範圍（今天到 EndDate）
  const getMaxDate = () => {
    if (!orderDetail) return today;
    const endDate = getDateFromISOString(orderDetail.EndDate);
    return endDate;
  };

  // 獲取日期的樣式類名和禁用狀態
  const getDateStatus = (date: globalThis.Date) => {
    if (!orderDetail) return { className: '', isDisabled: false };

    const isOriginalDate = formatDate(date) === orderDetail.OriginalDate;
    const isBookedDate = allOrderDates.some(
      (bookedDate) => formatDate(date) === bookedDate.ServiceDate,
    );

    return {
      className: isOriginalDate
        ? 'original-date'
        : isBookedDate
          ? 'booked-date'
          : '',
      isDisabled: isBookedDate,
    };
  };

  // 確認修改日期
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
          {isLoading ? (
            <StatusMessage>載入中...</StatusMessage>
          ) : error ? (
            <StatusMessage>{error}</StatusMessage>
          ) : orderDetail ? (
            <>
              <DateInfo>
                <DateLabel>原訂日期：</DateLabel>
                <DateValue>{orderDetail.OriginalDate}</DateValue>
                <DateLabel>修改日期：</DateLabel>
                <DateValue>
                  {selectedDate ? formatDate(selectedDate) : '*請選擇新的日期*'}
                </DateValue>
              </DateInfo>

              <CalendarContainer>
                <Calendar
                  onChange={(date) => setSelectedDate(date as globalThis.Date)}
                  value={selectedDate}
                  minDate={today}
                  maxDate={getMaxDate()}
                  locale="zh-TW"
                  defaultView="month"
                  showNeighboringMonth={false}
                  formatDay={(locale, date) => date.getDate().toString()} //讓日曆只顯示日期數字，例如：1, 2, 3...31
                  tileClassName={({ date }) => getDateStatus(date).className} //為日曆中的每一天添加 CSS 類別
                  tileDisabled={({ date }) => getDateStatus(date).isDisabled} //禁用某些日期
                />
              </CalendarContainer>

              <NoticeText>
                ※ 請注意：
                <br />• 可選擇的日期範圍為 今天 到 方案結束日
                <br />• 訂單修改的最終決定權為垃不垃多公司所有
              </NoticeText>

              <ButtonGroup>
                <CancelButton onClick={onClose}>取消</CancelButton>
                <ConfirmButton onClick={handleConfirm} disabled={!selectedDate}>
                  確認修改
                </ConfirmButton>
              </ButtonGroup>
            </>
          ) : null}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ModifyDateModal;
