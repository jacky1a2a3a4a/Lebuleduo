import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export type TaskStatus = 'waiting' | 'ongoing' | 'completed';

interface TaskCardProps {
  taskId: string;
  status: TaskStatus;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  disabled?: boolean;
}

//容器
const TaskCardWrapper = styled.div<{ status: TaskStatus }>`
  position: relative;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-bottom: 1rem;
  opacity: ${(props) =>
    props.status === 'waiting' && props.disabled ? 0.6 : 1};
`;

const TaskCardItem = styled.div<{ status: TaskStatus }>`
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
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) =>
    props.status === 'completed'
      ? 'var(--color-gray-100)'
      : 'var(--color-gray-0)'};
`;

const TaskCardContent = styled.div`
  display: grid;
  grid-template-columns: minmax(60px, 1fr) minmax(180px, 3fr);
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const TaskImg = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 100%;
  aspect-ratio: 1/1;
`;

const TaskDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
`;

const TaskTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const TaskTag = styled.div<{ status: TaskStatus }>`
  background-color: ${(props) => {
    switch (props.status) {
      case 'ongoing':
        return 'var(--color-gray-700)';
      case 'completed':
        return 'var(--color-gray-400)';
      default:
        return 'var(--color-gray-200)';
    }
  }};
  color: ${(props) =>
    props.status === 'ongoing'
      ? 'var(--color-gray-0)'
      : 'var(--color-gray-600)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 1rem;
  border-radius: var(--border-radius-round);
`;

const TaskAddress = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.25rem;
`;

const TaskUser = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const TaskCardButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const TaskCardButton = styled.button<{
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: ${(props) =>
        !props.disabled && 'var(--color-gray-300)'};
    }
  }

  &:last-child {
    background-color: ${(props) =>
      props.variant === 'primary'
        ? 'var(--color-gray-700)'
        : 'var(--color-gray-200)'};
    color: ${(props) =>
      props.variant === 'primary'
        ? 'var(--color-gray-0)'
        : 'var(--color-gray-600)'};
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        !props.disabled &&
        (props.variant === 'primary'
          ? 'var(--color-gray-800)'
          : 'var(--color-gray-300)')};
    }
  }
`;

function TaskCard({
  taskId,
  status = 'waiting',
  onStatusChange,
  disabled = false,
}: TaskCardProps) {
  const navigate = useNavigate();

  const handleOrderDetail = () => {
    navigate(`/deliver/task/${taskId}`);
  };

  const handleStatusChange = () => {
    if (disabled) return;

    if (status === 'waiting') {
      onStatusChange?.(taskId, 'ongoing');
    } else if (status === 'ongoing') {
      onStatusChange?.(taskId, 'waiting');
    }
  };

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
              <TaskTitle>10:00am</TaskTitle>
              <TaskTag status={status}>{getStatusText()}</TaskTag>
            </TaskCardHeader>
            <TaskAddress>高雄市三民區和平一路124號5F</TaskAddress>
            <TaskUser>林先生</TaskUser>
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
