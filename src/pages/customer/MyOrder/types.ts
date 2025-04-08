// styled-components 樣式屬性
export interface StyledProps {
  $isActive?: boolean; // 是否為活動狀態
  $isPassed?: boolean; // 是否已經過去
  $light?: boolean; // 顯示較淺色樣式
  $step?: number; // 步驟數字
  $progress?: number; // 進度百分比
  $position?: number; // 位置數值
}

// 收運步驟類型
export interface OrderStep {
  label: string;
  position: number;
}

// 標籤類型
export type TabType = 'current' | 'completed';

// 訂單類型
export interface Order {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  lastPickup: string;
  remainingPickups?: number;
  imageUrl?: string;
}

// API 返回的當前訂單類型
export interface ApiOrder {
  OrdersID: number;
  OrderNumber: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  StartDate: string;
  EndDate: string;
  Photos: string[];
  NextServiceDate: string;
  RemainingCount: number;
}

// API 返回的已完成訂單類型
export interface ApiCompletedOrder {
  OrdersID: number;
  OrderNumber: string | null;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  StartDate: string;
  EndDate: string;
  Photos: string[];
}

// API 回應類型
export interface ApiResponse {
  statusCode: number;
  status: boolean;
  message: string;
  result: ApiOrder[] | ApiCompletedOrder[];
}


