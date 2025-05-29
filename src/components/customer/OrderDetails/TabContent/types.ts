export type OrderData = {
  OrdersID: number;
  OrderDetails: OrderDetail[];
};

export type OrderDetail = {
  OrderDetailID: number;
  ServiceDate: string;
  ServiceTime: string;
  Status: string;
};

export type TabContentProps = {
  activeTab: string;
  abnormalOrders: OrderDetail[];
  scheduledOrders: OrderDetail[];
  unscheduledOrders: OrderDetail[];
  completedOrders: OrderDetail[];
  totalOrders: number;
  orderData: OrderData;
}; 