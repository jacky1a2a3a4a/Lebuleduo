// 後台任務分派專用
import { StatusTagContainer, StatusTagText } from './styles';

// ===狀態類型表===
// 0 = 未排定 //UnScheduled
// 1 = 已排定 //Scheduled
// 2 = 前往中 //Ongoing
// 3 = 已抵達 //Arrived
// 4 = 已完成 //Completed
// 5 = 異常 //Abnormal

const statusMap: Record<number, string> = {
  0: '未排定',
  1: '已排定',
  2: '前往中',
  3: '已抵達',
  4: '已完成',
  5: '異常',
};

interface StatusTagProps {
  status: number;
}

const StatusTag = ({ status }: StatusTagProps) => {
  const statusNumber = statusMap[status] || '未知狀態';

  return (
    <StatusTagContainer $status={statusNumber}>
      <StatusTagText $status={statusNumber}>{statusNumber}</StatusTagText>
    </StatusTagContainer>
  );
};

export default StatusTag;
