export interface OrderResponse {
  statusCode: number;
  status: boolean;
  message: string;
  result: OrderResult[];
}

export interface OrderResult {
  OrderNumber: string;
  PlanName: string;
  Liter: string;
  PlanKG: string;
  StartDate: string;
  EndDate: string;
  WeekDay: string;
  Addresses: string;
  Photos: string[];
  OrderDetails: OrderDetail[];
}

export interface OrderDetail {
  OrderDetailID: number;
  ServiceDate: string;
  ServiceTime: string;
  Status: string;
  DriverTime?: string;
  KG?: string;
  OrderDetailsNumber?: string;
  DriverPhoto?: string[];
}
