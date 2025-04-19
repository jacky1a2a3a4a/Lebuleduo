import { DetailList, DetailItem, Label, Value } from './styled';

interface DetailItem {
  label: string;
  value: string;
}

interface OrderTaskStatusRecordDetailProps {
  details: DetailItem[];
}

const OrderTaskStatusRecordDetail = ({
  details,
}: OrderTaskStatusRecordDetailProps) => {
  return (
    <DetailList>
      {details.map((detail, index) => (
        <DetailItem key={index}>
          <Label>{detail.label}</Label>
          <Value>{detail.value}</Value>
        </DetailItem>
      ))}
    </DetailList>
  );
};

export default OrderTaskStatusRecordDetail;
