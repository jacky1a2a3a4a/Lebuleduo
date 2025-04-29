export interface Order {
  OrderDetailID: number;
  OrderName: string;
  OrderStatus: number;
  PlanName: string;
  Region: string;
  DriverTimeStart: string | null;
  DriverTimeEnd: string | null;
  ResponsibleDriver: string;
}

export interface TableProps {
  orders: Order[];
  filteredTasks: Order[];
  itemsPerPage: number;
  selectedTasks: string[];
  handleSelectAll: (checked: boolean) => void;
  handleTaskSelection: (taskId: string, checked: boolean) => void;
}
