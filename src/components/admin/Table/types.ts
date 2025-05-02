import { Order } from '../../../pages/admin/TaskDispatch/types';

export interface TableProps {
  orders: Order[];
  filteredTasks: Order[];
  itemsPerPage: number;
  selectedTasks: string[];
  handleSelectAll: (checked: boolean) => void;
  handleTaskSelection: (taskId: string, checked: boolean) => void;
}
