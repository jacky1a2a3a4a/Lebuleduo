import { MdCalendarToday} from 'react-icons/md';
import {
  OrderTaskStatusCardContainer,
  CardItem,
  IconStyledLarge,
  Date,
  DateDisplay,
  TimeRange,
  OrderStatus,
  OrderStatusText,
} from './styled';

interface OrderTaskStatusCardProps {
  status: string;
  date: string;
  time: string;
  onViewStatus?: () => void;
}

const OrderTaskStatusCard = ({
  status,
  date,
  time,
}: OrderTaskStatusCardProps) => {
  return (
    <OrderTaskStatusCardContainer $status={status}>
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
          <OrderStatusText $status={status}>{status}</OrderStatusText>
        </OrderStatus>
      </CardItem>
    </OrderTaskStatusCardContainer>
  );
};

export default OrderTaskStatusCard;
