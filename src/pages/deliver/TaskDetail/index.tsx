import { useParams } from 'react-router-dom';
import TaskNavHeader from '../../../components/deliver/TaskNavHeader';
import TaskCardDetail from '../../../components/deliver/TaskCardDetail';
import { useUserId } from '../../../store/hooks';

function TaskDetail() {
  const { taskId } = useParams();
  const userId = useUserId();

  return (
    <>
      <TaskNavHeader title="任務詳情" orderNumber={taskId || ''} />
      <TaskCardDetail taskId={taskId || ''} userId={userId?.toString() || ''} />
    </>
  );
}

export default TaskDetail;
