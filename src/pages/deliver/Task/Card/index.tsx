import { useNavigate } from 'react-router-dom';
import {
  TaskCardWrapper,
  TaskCardItem,
  TaskCardContent,
  TaskImg,
  TaskDetailContainer,
  TaskCardHeader,
  TaskTitle,
  TaskTag,
  TaskAddress,
  TaskUser,
  TaskCardButtons,
  TaskCardButton,
} from './styled';

// TS 任務卡片屬性
//waiting 等待中
//ongoing 進行中
//completed 已完成
export type TaskStatus = 'waiting' | 'ongoing' | 'completed';

export type TaskCardProps = {
  taskId: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
  //void 表示沒有回傳值
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  disabled?: boolean;
};

//函式本體
//傳入參數，同時定義型別
function TaskCard({
  taskId,
  status = 'waiting',
  time,
  address,
  customer,
  onStatusChange,
  disabled = false,
}: TaskCardProps) {
  // 路由 跳轉
  const navigate = useNavigate();

  // 訂單詳情 路由
  const handleOrderDetail = () => {
    navigate(`/deliver/task/${taskId}`);
  };

  // 確認前往/取消前往 按鈕 狀態改變
  const handleStatusChange = () => {
    //返回檢查。如果 disabled 屬性為 true（表示該卡片被禁用），函數會立即返回，不執行後續操作。這防止在卡片被禁用時改變其狀態。
    if (disabled) return;

    //如果狀態為等待中，則改為進行中
    if (status === 'waiting') {
      onStatusChange?.(taskId, 'ongoing');
    } else if (status === 'ongoing') {
      //如果狀態為進行中，則改為等待中
      onStatusChange?.(taskId, 'waiting');
    }
  };

  // 卡片右上角標籤狀態
  const getStatusText = () => {
    switch (status) {
      case 'ongoing':
        return '前往中';
      case 'completed':
        return '已完成';
      default:
        return '等待前往';
    }
  };

  // 卡片按鈕文字
  const getActionButtonText = () => {
    switch (status) {
      case 'ongoing':
        return '取消前往';
      case 'completed':
        return '已完成';
      default:
        return '確認前往';
    }
  };

  return (
    <TaskCardWrapper status={status} disabled={disabled}>
      <TaskCardItem status={status}>
        <TaskCardContent>
          <TaskImg />
          <TaskDetailContainer>
            <TaskCardHeader>
              <TaskTitle>{time}</TaskTitle>
              <TaskTag status={status}>{getStatusText()}</TaskTag>
            </TaskCardHeader>
            <TaskAddress>{address}</TaskAddress>
            <TaskUser>{customer}</TaskUser>
          </TaskDetailContainer>
        </TaskCardContent>

        <TaskCardButtons>
          <TaskCardButton onClick={handleOrderDetail}>訂單詳情</TaskCardButton>
          <TaskCardButton
            styledType={status === 'ongoing' ? 'secondary' : 'primary'}
            onClick={handleStatusChange}
            disabled={disabled || status === 'completed'}
          >
            {getActionButtonText()}
          </TaskCardButton>
        </TaskCardButtons>
      </TaskCardItem>
    </TaskCardWrapper>
  );
}

export default TaskCard;
