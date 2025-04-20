import {
  DetailList,
  DetailItem,
  Label,
  Value,
  OverweightWarning,
  WarningTitle,
  IconStyled,
  WarningDescription,
} from './styled';
import { MdReportProblem } from 'react-icons/md';

interface DetailItemData {
  label: string;
  value: string;
  isOverweight?: boolean;
}

interface OrderTaskStatusRecordDetailProps {
  details: DetailItemData[];
  isOverweight?: boolean;
}

const OrderTaskStatusRecordDetail = ({
  details,
  isOverweight,
}: OrderTaskStatusRecordDetailProps) => {
  return (
    <>
      {isOverweight && (
        <OverweightWarning>
          <WarningTitle>
            <IconStyled>
              <MdReportProblem />
            </IconStyled>
            嗶嗶~請補款！
          </WarningTitle>
          <WarningDescription>
            您的垃圾本次超出方案的重量限制，請於
            2025/05/31前完成補款，以避免帳戶限制。
          </WarningDescription>
        </OverweightWarning>
      )}

      <DetailList>
        {details.map((detail, index) => (
          <DetailItem key={index}>
            <Label>{detail.label}</Label>
            <Value $isOverweight={detail.isOverweight}>{detail.value}</Value>
          </DetailItem>
        ))}
      </DetailList>
    </>
  );
};

export default OrderTaskStatusRecordDetail;
