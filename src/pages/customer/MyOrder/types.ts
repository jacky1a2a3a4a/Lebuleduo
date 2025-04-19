// styled-components 樣式屬性
export interface StyledProps {
  $isActive?: boolean; // 是否為活動狀態
  $isPassed?: boolean; // 是否已經過去
  $light?: boolean; // 顯示較淺色樣式
  $step?: number; // 步驟數字
  $progress?: number; // 進度百分比
  $position?: number; // 位置數值
  $primary?: boolean; // 是否為主色調
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

// API 返回的今日訂單類型
//帶修改 目前有問題
export interface ApiTodayOrder {
  usersID: number;
  number: string;
  name: string;
  date: string;
  status: '未排定' | '已排定' | '前往中' | '已抵達' | '已完成' | '異常' ;
}

// API 返回的當前訂單類型
export interface ApiCurrentOrder {
  OrdersID: number;
  OrderNumber: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  Photos: string[];
  StartDate: string;
  EndDate: string;
  WeekDay: string;
  Address: string;
  TotalCount: number;
  RemainingCount: number;
  NextServiceDate: string;
}

// API 返回的已完成訂單類型
export interface ApiCompletedOrder {
  OrdersID: number;
  OrderNumber: string | null;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  Photos: string[];
  StartDate: string;
  EndDate: string;
  WeekDay: string;
  Address: string;
  TotalCount: number;
}
