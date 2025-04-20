import { StatusTagContainer, StatusTagText } from './styled';

// ===狀態類型表===
// 'abnormal' // 異常
// 'active' // 已排定
// 'ongoing' // 前往中
// 'arrived' // 已抵達
// 'normal' // 未排定
// 'finished'; // 已完成

interface StatusTagProps {
  status: string;
}

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

//status抓中文字，懶得轉換了
const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <StatusTagContainer $status={status}>
      <StatusTagText $status={status}>{getDisplayStatus(status)}</StatusTagText>
    </StatusTagContainer>
  );
};

export default StatusTag;
