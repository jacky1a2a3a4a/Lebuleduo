import { useState } from 'react';
import { MdEditNote, MdArticle, MdCalendarToday } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  OrderListCardContainer,
  CardItems,
  CardItem,
  Date,
  DateDisplay,
  TimeRange,
  OrderStatus,
  StatusText,
  ActionButton,
  IconStyled,
  IconStyledLarge,
  ErrorText,
} from './styled';
import CalendarModal from '../CalendarModal';

// 訂單卡片狀態類型
type OrderStatusType =
  | 'normal' // 未排定
  | 'active' // 已排定
  | 'ongoing' // 前往中
  | 'arrived' // 已抵達
  | 'abnormal' // 異常
  | 'finished'; // 已結束

// 任務卡片 props 類型
type OrderListCardProps = {
  date: string;
  time: string;
  status: string;
  ordersId: number;
  orderDetailId: number;
  usersId: number;
  onDateModified?: (date?: string) => void;
};

// ===組件本體===
function OrderListCard({
  date,
  time,
  status,
  ordersId,
  orderDetailId,
  usersId,
  onDateModified,
}: OrderListCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(date);

  // 獲取當前狀態
  const getCurrentStatus = (): OrderStatusType => {
    if (status === '異常') return 'abnormal';
    if (status === '已排定') return 'active';
    if (status === '前往中') return 'ongoing';
    if (status === '已抵達') return 'arrived';
    if (status === '未排定') return 'normal';
    if (status === '已完成') return 'finished';
  };

  // 轉換狀態顯示文字
  const getDisplayStatus = (status: string) => {
    switch (status) {
      case '異常':
        return '有異常';
      case '已完成':
        return '已結束';
      default:
        return status;
    }
  };

  // 檢查是否可以修改（必須在兩天前）
  const canModify = () => {
    try {
      // 處理api獲得的收運日期date
      const [year, month, day] = date.split('/').map(Number);
      const serviceDate = new globalThis.Date(year, month - 1, day);

      //獲取當天日期
      const today = new globalThis.Date();

      // 將收運日期和當天日期設置為午夜時間
      serviceDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      // 計算收運日期和當天日期的差值
      const diffTime = serviceDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 如果差值大於等於2天，則可以修改
      return diffDays >= 2;
    } catch (error) {
      console.error('日期處理錯誤：', error);
      return false;
    }
  };

  // 處理卡片點擊（根據狀態導向不同頁面）
  const handleCardClick = () => {
    const currentStatus = getCurrentStatus();

    switch (currentStatus) {
      case 'abnormal':
        navigate(
          `/customer/order-task/abnormal-task/${ordersId}/${orderDetailId}`,
        );
        break;
      case 'active':
      case 'ongoing':
      case 'arrived':
        navigate(
          `/customer/order-task/scheduled-task/${ordersId}/${orderDetailId}`,
        );
        break;
      case 'normal':
        navigate(
          `/customer/order-task/unscheduled-task/${ordersId}/${orderDetailId}`,
        );
        break;
      case 'finished':
        navigate(
          `/customer/order-task/finished-task/${ordersId}/${orderDetailId}`,
        );
        break;
    }
  };

  // 處理按鈕點擊（修改預約）
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentStatus = getCurrentStatus();

    if (currentStatus === 'normal' && canModify()) {
      setIsModalOpen(true);
    }

    if (
      currentStatus === 'active' ||
      currentStatus === 'ongoing' ||
      currentStatus === 'arrived' ||
      currentStatus === 'finished' ||
      currentStatus === 'abnormal'
    ) {
      navigate(
        `/customer/order-task/scheduled-task/${ordersId}/${orderDetailId}`,
      );
    }
  };

  // 確認修改日期
  const handleConfirmModify = (newDate: globalThis.Date) => {
    const formattedDate = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`;
    setCurrentDate(formattedDate);
    if (onDateModified) {
      onDateModified(formattedDate);
    }
    setIsModalOpen(false);
  };

  const currentStatus = getCurrentStatus();

  return (
    <>
      <OrderListCardContainer
        $status={currentStatus}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <CardItems>
          <CardItem>
            <IconStyledLarge>
              <MdCalendarToday />
            </IconStyledLarge>
            <Date>
              <DateDisplay>{currentDate}</DateDisplay>
              <TimeRange>{time}</TimeRange>
            </Date>
          </CardItem>

          <CardItem>
            <OrderStatus>
              <StatusText $status={currentStatus}>
                {getDisplayStatus(status)}
              </StatusText>
            </OrderStatus>

            <ActionButton
              onClick={handleButtonClick}
              $status={currentStatus}
              $disabled={!canModify() && currentStatus === 'normal'}
            >
              <IconStyled>
                {currentStatus === 'normal' ? <MdEditNote /> : <MdArticle />}
              </IconStyled>
              {currentStatus === 'normal' ? '修改預約' : '查看狀態'}
            </ActionButton>
          </CardItem>
        </CardItems>

        {!canModify() && currentStatus === 'normal' && (
          <ErrorText>※ 已超過可修改時間（請於48小時前完成修改）</ErrorText>
        )}
      </OrderListCardContainer>

      <CalendarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModify}
        usersId={usersId}
        ordersId={ordersId}
        orderDetailId={orderDetailId}
      />
    </>
  );
}

export default OrderListCard;
