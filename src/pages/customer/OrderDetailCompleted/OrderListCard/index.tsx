import { useNavigate } from 'react-router-dom';
import { MdArticle } from 'react-icons/md';
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
} from './styled';

// 訂單卡片狀態類型
type OrderStatusType = 'abnormal' | 'finished';

// 任務卡片 props 類型
type OrderListCardProps = {
  date: string;
  time: string;
  status: string;
  ordersId: number;
  orderDetailId: number;
};

// ===組件本體===
function OrderListCard({
  date,
  time,
  status,
  ordersId,
  orderDetailId,
}: OrderListCardProps) {
  const navigate = useNavigate();

  // 獲取當前狀態
  const getCurrentStatus = (): OrderStatusType => {
    if (status === '異常') return 'abnormal';
    return 'finished';
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

  // 處理卡片點擊
  const handleCardClick = () => {
    const currentStatus = getCurrentStatus();

    switch (currentStatus) {
      case 'abnormal':
        navigate(
          `/customer/completed-order/order-task/abnormal-task/${ordersId}/${orderDetailId}`,
        );
        break;
      case 'finished':
        navigate(
          `/customer/completed-order/order-task/finished-task/${ordersId}/${orderDetailId}`,
        );
        break;
    }
  };

  const currentStatus = getCurrentStatus();

  return (
    <OrderListCardContainer
      $status={currentStatus}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <CardItems>
        <CardItem>
          <IconStyledLarge>
            <MdArticle />
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

          <ActionButton $status={currentStatus} $disabled={false}>
            <IconStyled>
              <MdArticle />
            </IconStyled>
            查看狀態
          </ActionButton>
        </CardItem>
      </CardItems>
    </OrderListCardContainer>
  );
}

export default OrderListCard;
