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
  TaskUserContent,
  MainContent,
  SubContent,
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
  notes: string;
  customerName: string;
  phone: string;
  //void 表示沒有回傳值
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  disabled?: boolean;

  //重量 暫存localStorage
  weight?: string;
  //照片 暫存localStorage
  photos?: string[];
};

//函式本體
//傳入參數，同時定義型別
function TaskCard({
  taskId,
  status = 'waiting',
  time,
  address,
  notes,
  customerName,
  onStatusChange,
  disabled = false,
  weight,
  photos,
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

    // 從 localStorage 獲取當前任務列表
    const savedTasks = localStorage.getItem('tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];

    // 更新任務狀態
    const updatedTasks = tasks.map((task: any) => {
      if (task.id === taskId) {
        //如果狀態為等待中，則改為進行中
        if (status === 'waiting') {
          return { ...task, status: 'ongoing' };
        } else if (status === 'ongoing') {
          //如果狀態為進行中，則改為等待中（取消前往）
          return { ...task, status: 'waiting' };
        }
      }
      return task;
    });

    // 保存更新後的任務列表到 localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // 通知父組件狀態已更新
    if (status === 'waiting') {
      onStatusChange?.(taskId, 'ongoing');
    } else if (status === 'ongoing') {
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
            <TaskUserContent>
              <MainContent>{address}</MainContent>
              <SubContent>固定放置點: {notes}</SubContent>
            </TaskUserContent>

            <TaskUserContent>
              <MainContent>{customerName}</MainContent>
              <SubContent>訂單編號: {taskId}</SubContent>
            </TaskUserContent>
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
