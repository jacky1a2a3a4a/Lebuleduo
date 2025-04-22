// 汪汪員用 狀態標籤

import { StatusTagContainer, StatusTagText } from './styled';

// ===狀態類型表===
// 'abnormal' // 異常
// 'unscheduled' // 未排定(外送員通常不會拿到未排定任務)
// 'scheduled' // 已排定(外送員端顯示為:待前往)
// 'ongoing' // 前往中
// 'arrived' // 已抵達
// 'completed'; // 已完成

interface StatusTagProps {
  status: string;
}

// 顯示用 英轉中(汪汪員版)
const getDisplayStatus = (status: string) => {
  switch (status) {
    case 'abnormal':
      return '有異常';
    case 'unscheduled':
      return '未排定';
    case 'scheduled':
      return '待前往';
    case 'ongoing':
      return '前往中';
    case 'arrived':
      return '已抵達';
    case 'completed':
      return '已完成';
    default:
      return status;
  }
};

//接收英文狀態
const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <StatusTagContainer $status={status}>
      <StatusTagText $status={status}>{getDisplayStatus(status)}</StatusTagText>
    </StatusTagContainer>
  );
};

export default StatusTag;
