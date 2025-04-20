import { useNavigate } from 'react-router-dom';
import { HiDocumentText, HiMiniTruck, HiXCircle } from 'react-icons/hi2';
import StatusTag from '../../../../components/deliver/StatusTagDeliver';
import { TaskStatus } from '../../../../types/deliver';

// 添加 BASE_URL 常數
const BASE_URL = 'http://lebuleduo.rocket-coding.com';

import {
  TaskCardWrapper,
  TaskCardItem,
  TaskCardContent,
  TaskImg,
  TaskDetailContainer,
  TaskCardHeader,
  TaskTitle,
  TaskUserContent,
  MainContent,
  SubContent,
  TertiaryContent,
  TaskCardButtons,
  TaskCardButton,
} from './styled';

export type TaskCardProps = {
  taskId: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  photos?: string[];
};

//函式本體
//傳入參數，同時定義型別
export const TaskCard = ({
  taskId,
  status,
  time,
  address,
  notes,
  onStatusChange,
  photos,
}: TaskCardProps) => {
  // 路由 跳轉
  const navigate = useNavigate();

  // 格式化時間顯示
  // "09:30" → "9:30 AM"
  // "14:30" → "2:30 PM"
  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '-';

    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12; // 將 0 轉換為 12
    return `${formattedHour}:${minutes} ${period}`;
  };

  // 訂單詳情 路由
  const handleOrderDetail = () => {
    navigate(`/deliver/task/${taskId}`);
  };

  // 確認前往/取消前往 按鈕 狀態改變
  const handleStatusChange = () => {
    let newStatus: TaskStatus;
    if (status === 'scheduled') {
      newStatus = 'ongoing';
    } else if (status === 'ongoing') {
      newStatus = 'scheduled';
    } else {
      return;
    }

    onStatusChange?.(taskId, newStatus);
  };

  // 卡片按鈕文字
  const getActionButtonText = () => {
    switch (status) {
      case 'ongoing':
        return '取消前往';
      case 'completed':
        return '已完成';
      case 'abnormal':
        return '已回報';
      default:
        return '確認前往';
    }
  };

  return (
    <TaskCardWrapper $status={status}>
      <TaskCardItem $status={status}>
        <TaskCardContent>
          <TaskImg
            $photoUrl={photos?.[0] ? `${BASE_URL}${photos[0]}` : undefined}
          />
          <TaskDetailContainer>
            <TaskCardHeader>
              <TaskTitle>{formatTime(time)}</TaskTitle>
              <StatusTag status={status} />
            </TaskCardHeader>
            <TaskUserContent>
              <MainContent>{address}</MainContent>
              <SubContent>固定放置點: {notes}</SubContent>
              <TertiaryContent>訂單編號: {taskId}</TertiaryContent>
            </TaskUserContent>
          </TaskDetailContainer>
        </TaskCardContent>

        <TaskCardButtons>
          <TaskCardButton onClick={handleOrderDetail}>
            <HiDocumentText />
            訂單詳情
          </TaskCardButton>
          <TaskCardButton
            $styledType={status === 'ongoing' ? 'secondary' : 'primary'}
            onClick={handleStatusChange}
            $disabled={status === 'completed' || status === 'abnormal'}
          >
            {status === 'ongoing' ? <HiXCircle /> : <HiMiniTruck />}
            {getActionButtonText()}
          </TaskCardButton>
        </TaskCardButtons>
      </TaskCardItem>
    </TaskCardWrapper>
  );
};

export default TaskCard;
