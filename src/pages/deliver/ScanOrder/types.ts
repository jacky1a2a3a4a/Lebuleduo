// API 回傳的任務
export type ApiData = {
  Addresses: string;
  CustomerName: string;
  CustomerNumber: string;
  Liter: number;
  Notes: string;
  OrderDetailID: number;
  OrderDetailsNumber: string; // 訂單編號
  Photo: string[];
  PlanKG: number;
  PlanName: string;
  ServiceTime: string | null;
  Status: string;
};

// 定義任務
export type TaskItem = {
  id: string;
};

// 掃描後獲得的任務
export type OrderInfo = {
  OrderDetailID: number;
  CustomerNumber: string;
  OrderDetailsNumber: string;
  Status?: string;
};
