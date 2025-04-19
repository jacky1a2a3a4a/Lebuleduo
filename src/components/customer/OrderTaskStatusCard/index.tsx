import { MdCalendarToday } from 'react-icons/md';
import StatusTag from '../../common/StatusTag';
import {
  OrderTaskStatusCardContainer,
  CardItem,
  IconStyledLarge,
  Date,
  DateDisplay,
  TimeRange,
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
      {/* 日期區塊 */}
      <CardItem>
        <IconStyledLarge>
          <MdCalendarToday />
        </IconStyledLarge>
        <Date>
          <DateDisplay>{date}</DateDisplay>
          <TimeRange>{time}</TimeRange>
        </Date>
      </CardItem>

      {/* 狀態標籤 */}
      <CardItem>
        <StatusTag status={status} />
      </CardItem>
    </OrderTaskStatusCardContainer>
  );
};

export default OrderTaskStatusCard;
