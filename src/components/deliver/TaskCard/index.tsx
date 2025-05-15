import { useNavigate } from 'react-router-dom';
import {
  HiDocumentText,
  HiMiniTruck,
  HiXCircle,
  HiQrCode,
} from 'react-icons/hi2';
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
} from './styles';

import StatusTagDeliver from '../StatusTagDeliver';
import { TaskStatus } from '../../../types/deliver/TaskStatus';
import { TaskCardProps } from '../../../types/deliver/TaskCard';
import { formatTime } from '../../../utils/formatTime';
import { updateOrderStatus } from '../../../apis/deliver/updateOrderStatus';

// 圖片網址前綴
const BASE_URL = import.meta.env.VITE_API_URL;

//傳入參數，同時定義型別
export const TaskCard = ({
  taskId,
  number,
  status,
  time,
  address,
  notes,
  onStatusChange,
  photos,
  isDisabled = false,
}: TaskCardProps) => {
  // 路由 跳轉
  const navigate = useNavigate();

  // 訂單詳情 路由
  const handleOrderDetail = () => {
    navigate(`/deliver/task/${taskId}`);
  };

  // 更新任務狀態的 API 呼叫
  const handleStatusChange = async () => {
    let newStatus: TaskStatus;
    let orderStatus: number;

    if (status === 'scheduled') {
      newStatus = 'ongoing';
      orderStatus = 2; // 前往中
    } else if (status === 'ongoing') {
      newStatus = 'scheduled';
      orderStatus = 1; // 已排定
    } else {
      return;
    }

    try {
      await updateOrderStatus(Number(taskId), orderStatus);
      onStatusChange?.(taskId, newStatus);
    } catch (error) {
      console.error('更新訂單狀態失敗:', error);
    }
  };

  // 處理掃描訂單按鈕點擊
  const handleScanOrder = () => {
    navigate('/deliver/scan-order');
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
      case 'arrived':
        return '掃描訂單';
      default:
        return '確認前往';
    }
  };

  // 獲取按鈕圖標
  const getActionButtonIcon = () => {
    switch (status) {
      case 'ongoing':
        return <HiXCircle />;
      case 'arrived':
        return <HiQrCode />;
      default:
        return <HiMiniTruck />;
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
              <StatusTagDeliver status={status} />
            </TaskCardHeader>
            <TaskUserContent>
              <MainContent>{address}</MainContent>
              <SubContent>固定放置點: {notes}</SubContent>
              <TertiaryContent>任務編號: {number}</TertiaryContent>
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
            onClick={
              status === 'arrived' ? handleScanOrder : handleStatusChange
            }
            $disabled={
              status === 'completed' || status === 'abnormal' || isDisabled
            }
          >
            {getActionButtonIcon()}
            {getActionButtonText()}
          </TaskCardButton>
        </TaskCardButtons>
      </TaskCardItem>
    </TaskCardWrapper>
  );
};

export default TaskCard;
