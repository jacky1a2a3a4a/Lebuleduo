import { StatusHeader, StatusText } from './styled';

interface OrderTaskStatusRecordTitleProps {
  title: string;
}

const OrderTaskStatusRecordTitle = ({
  title,
}: OrderTaskStatusRecordTitleProps) => {
  return (
    <StatusHeader>
      <StatusText>{title}</StatusText>
    </StatusHeader>
  );
};

export default OrderTaskStatusRecordTitle;
