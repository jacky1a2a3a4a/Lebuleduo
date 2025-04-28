export interface ApiResponse {
  statusCode: number;
  status: boolean;
  message: string;
  Amount: Amount;
  Drivers: Driver[];
  result: Order[];
}

export interface Amount {
  totalCount: number;
  UnScheduled: number;
  Scheduled: number;
  totalDrivers: number;
  DriverIsOnline: number;
}

export interface Driver {
  UsersID: number;
  LineName: string;
  IsOnline: boolean;
  TodayTaskCount: string;
}

export interface Order {
  OrderDetailID: number;
  OrderName: string;
  OrderStatus: number;
  Region: string;
  PlanName: string;
  DriverTimeStart: string | null;
  DriverTimeEnd: string | null;
  ResponsibleDriver: string;
}

export interface Filters {
  status: string;
  planType: string;
  deliver: string;
  orderDetailId: string;
  region: string;
}
