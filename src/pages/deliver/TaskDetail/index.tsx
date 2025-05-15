import { useParams } from 'react-router-dom';
import TaskNavHeader from '../../../components/deliver/TaskNavHeader';
import TaskCardDetail from '../../../components/deliver/TaskCardDetail';

function TaskDetail() {
  const { taskId } = useParams();
  const userId = localStorage.getItem('UsersID') || '';

  return (
    <>
      <TaskNavHeader title="任務詳情" orderNumber={taskId || ''} />
      <TaskCardDetail taskId={taskId || ''} userId={userId} />
    </>
  );
}

export default TaskDetail;
