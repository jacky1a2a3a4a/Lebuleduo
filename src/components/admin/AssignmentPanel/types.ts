import { Driver } from '../../../pages/admin/TaskDispatch/types';

export interface AssignmentPanelProps {
  selectedTasks: string[];
  delivers: Driver[];
  deliverAssignments: Record<number, number>;
  onAssignmentChange: (deliverId: number, count: number) => void;
  onDistributeEvenly: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}
