import { useState } from 'react';
import { HiPencil, HiCalendar, HiQueueList } from 'react-icons/hi2';
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
  ErrorText,
} from './styled';
import ModifyDateModal from './ModifyDateModal'; // 修改日期模態框

// 任務卡片 props 類型
//這些props是從父元件傳遞過來的
type OrderListCardProps = {
  date: string;
  time: string;
  status: string;
  isActive: boolean;
  orderId: string;
};

function OrderListCard({
  date,
  time,
  status,
  isActive,
  orderId,
}: OrderListCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制修改日期模態框的開啟狀態

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

  // 點擊按鈕 isActive? 修改預約 : 查看紀錄
  const handleButtonClick = () => {
    if (isActive) {
      if (canModify()) {
        setIsModalOpen(true);
      }
    } else {
      navigate(`/customer/order-record/${orderId}`);
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

  return (
    <>
      <OrderListCardContainer $isActive={isActive}>
        <CardItems>
          <CardItem>
            <IconStyled>
              <HiCalendar />
            </IconStyled>
            <Date>
              <DateDisplay>{date}</DateDisplay>
              <TimeRange>{time}</TimeRange>
            </Date>
          </CardItem>

          <CardItem>
            <OrderStatus>
              <StatusText $isActive={isActive}>{status}</StatusText>
            </OrderStatus>
            <ActionButton
              onClick={handleButtonClick}
              $isActive={isActive}
              disabled={isActive && !canModify()}
            >
              <IconStyled>
                {isActive ? <HiPencil /> : <HiQueueList />}
              </IconStyled>
              {isActive ? '修改預約' : '查看紀錄'}
            </ActionButton>
          </CardItem>
        </CardItems>
        {isActive && !canModify() && (
          <ErrorText>※ 已超過可修改時間（需在兩天前修改）</ErrorText>
        )}
      </OrderListCardContainer>

      <ModifyDateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModify}
        originalDate={date}
      />
    </>
  );
}

export default OrderListCard;
