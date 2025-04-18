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
import ModifyDateModal from './ModifyDateModal'; // 修改日期行事曆

// 訂單卡片狀態類型
type OrderStatusType =
  | 'normal' // 未排定
  | 'active' // 已排定
  | 'ongoing' // 前往中
  | 'arrived' // 已抵達
  | 'abnormal' // 異常
  | 'finished'; // 已結束

// 任務卡片 props 類型
//這些props是從父元件傳遞過來的
type OrderListCardProps = {
  date: string;
  time: string;
  status: string;
  orderDetailId: number;
  ordersId: number;
  usersId: number;
};

// ===組件本體===
function OrderListCard({
  date,
  time,
  status,
  orderDetailId,
  ordersId,
  usersId,
}: OrderListCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const [year, month, day] = date.split('/').map(Number); //收運日期 將字串轉換成數字陣列
      const serviceDate = new globalThis.Date(year, month - 1, day); // 收運日期 將日期數字陣列轉換成Date

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

  // 處理按鈕點擊
  const handleButtonClick = () => {
    const currentStatus = getCurrentStatus();

    if (
      currentStatus === 'active' ||
      currentStatus === 'ongoing' ||
      currentStatus === 'arrived' ||
      currentStatus === 'abnormal' ||
      currentStatus === 'finished'
    ) {
      navigate(`/customer/order-status/${orderDetailId}`);
      return;
    }

    if (currentStatus === 'normal') {
      setIsModalOpen(true);
      return;
    }

    if (canModify()) {
      setIsModalOpen(true);
    }
  };

  // 確認修改日期
  const handleConfirmModify = async (newDate: globalThis.Date) => {
    try {
      // TODO: 實現修改日期的 API 調用
      console.log('修改日期為：', newDate);
      setIsModalOpen(false);
    } catch (error) {
      console.error('修改日期失敗：', error);
    }
  };

  const currentStatus = getCurrentStatus();

  return (
    <>
      <OrderListCardContainer $status={currentStatus}>
        <CardItems>
          <CardItem>
            <IconStyledLarge>
              <MdCalendarToday />
            </IconStyledLarge>
            <Date>
              <DateDisplay>{date}</DateDisplay>
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
              $disabled={!canModify()}
            >
              <IconStyled>
                {currentStatus === 'active' ||
                currentStatus === 'ongoing' ||
                currentStatus === 'arrived' ||
                currentStatus === 'abnormal' ||
                currentStatus === 'finished' ? (
                  <MdArticle />
                ) : (
                  <MdEditNote />
                )}
              </IconStyled>
              {currentStatus === 'finished'
                ? '查看紀錄'
                : currentStatus === 'abnormal' ||
                    currentStatus === 'active' ||
                    currentStatus === 'ongoing' ||
                    currentStatus === 'arrived'
                  ? '查看狀態'
                  : '修改預約'}
            </ActionButton>
          </CardItem>
        </CardItems>

        {!canModify() && (
          <ErrorText>※ 已超過可修改時間（需在兩天前修改）</ErrorText>
        )}
      </OrderListCardContainer>

      {/* 修改日期modal，同時傳遞props */}
      <ModifyDateModal
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
