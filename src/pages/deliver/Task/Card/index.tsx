import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  disabled?: boolean;
};

// 任務卡片外層容器
const TaskCardWrapper = styled.div<{ status: TaskStatus; disabled?: boolean }>`
  // 如果狀態為等待中且 disabled 為 true，則 opacity 為 0.6，否則為 1
  opacity: ${({ status, disabled }) =>
    status === 'waiting' && disabled ? 0.6 : 1};

  position: relative;

  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-bottom: 1rem;
`;

// 任務卡片主體
const TaskCardItem = styled.div<{ status: TaskStatus }>`
  background-color: ${(props) =>
    props.status === 'completed'
      ? 'var(--color-gray-100)'
      : 'var(--color-gray-0)'};

  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  border: 1.5px solid
    ${(props) => {
      switch (props.status) {
        case 'ongoing':
          return 'var(--color-gray-700)';
        case 'completed':
          return 'var(--color-gray-400)';
        default:
          return 'var(--color-gray-300)';
      }
    }};
  border-radius: var(--border-radius-lg);
`;

// 任務卡片內容區
const TaskCardContent = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  display: grid;
  grid-template-columns: minmax(60px, 1fr) minmax(180px, 3fr);
  align-items: start;
  gap: 1rem;
`;

// 任務圖片
const TaskImg = styled.div`
  background-color: var(--color-gray-200);

  width: 100%;
  aspect-ratio: 1/1;

  border-radius: var(--border-radius-lg);
`;

// 任務詳細資訊容器
const TaskDetailContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// 任務卡片標題區
const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
`;

// 任務標題
const TaskTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

// 任務狀態標籤
const TaskTag = styled.div<{ status: TaskStatus }>`
  background-color: ${({ status }) => {
    switch (status) {
      case 'ongoing':
        return 'var(--color-gray-700)';
      case 'completed':
        return 'var(--color-gray-400)';
      default:
        return 'var(--color-gray-200)';
    }
  }};
  color: ${({ status }) =>
    status === 'ongoing' ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};

  padding: 0.25rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--border-radius-round);
`;

// 任務地址
const TaskAddress = styled.div`
  margin-top: 0.25rem;

  font-size: 0.875rem;
  font-weight: 400;
`;

// 任務用戶
const TaskUser = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

// 任務卡片按鈕容器
const TaskCardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

// 任務卡片按鈕
const TaskCardButton = styled.button<{
  //waiting 使用 primary 樣式
  //ongoing 使用 secondary 樣式
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  padding: 0.75rem 1rem;

  border: none;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  // 如果 disabled 不能點擊
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  /* 第一個按鈕樣式 訂單詳情 */
  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);

    flex: 1;

    &:hover {
      background-color: ${({ disabled }) =>
        !disabled && 'var(--color-gray-300)'};
    }
  }

  /* 最後一個按鈕樣式 前往/取消前往 */
  &:last-child {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? 'var(--color-gray-700)'
        : 'var(--color-gray-200)'};
    color: ${({ variant }) =>
      variant === 'primary' ? 'var(--color-gray-0)' : 'var(--color-gray-600)'};

    flex: 2;

    &:hover {
      background-color: ${({ disabled, variant }) =>
        !disabled &&
        (variant === 'primary'
          ? 'var(--color-gray-800)'
          : 'var(--color-gray-300)')};
    }
  }
`;

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
            variant={status === 'ongoing' ? 'secondary' : 'primary'}
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
