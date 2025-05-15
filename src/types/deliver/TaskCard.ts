import { TaskStatus } from './TaskStatus';

export type TaskCardProps = {
  taskId: string;
  number: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  photos?: string[];
  isDisabled?: boolean;
};
