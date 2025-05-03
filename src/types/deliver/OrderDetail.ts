import { TaskStatus } from './TaskStatus';

// API /GET/driver/day/:DriverID/:Date 回傳的資料結構
export type ApiResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: {
    DriverID: number; //汪汪員ID
    Number: string; //汪汪員編號
    DriverName: string; //汪汪員姓名
    Today: string; //汪汪員今日日期
    TodayActiveStatus: {
      UnScheduled: number; //未排定
      Scheduled: number; //已排定
      Ongoing: number; //前往中
      Arrived: number; //已抵達
      Total: number; //總數
    };
    TodayCompletedStatus: {
      Completed: number; //已完成
      Abnormal: number; //異常
      Total: number; //總數
    };
    Orders: ApiTask[]; //任務列表
  };
};

// API 個別任務資料結構
export type ApiTask = {
  OrderDetailID: number; //任務ID
  ServiceTime: string | null; //服務時間
  OrderDetailsNumber: string; //任務編號
  Addresses: string; //地址
  CustomerNumber: string; //客戶電話
  CustomerName: string; //客戶姓名
  Notes: string; //備註
  Photo: string[]; //照片
  Status: string; //狀態
  PlanName: string; //方案名稱
  PlanKG: number; //方案重量
  Liter: number; //方案容量
};

//API 汪汪員資料 型別
export type DriverData = {
  DriverID: number; //汪汪員ID
  Number: string; //汪汪員編號
  DriverName: string; //汪汪員姓名
};

//API 任務 型別
export type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  customerName: string;
  phone?: string;
  weight?: string;
  photos?: string[];
  orderNumber?: string;
  planName?: string;
  planKG?: number;
  liter?: number;
};

// 分類標籤
// scheduled 已排定(待前往)
// completed 已完成
// abnormal 異常
export type CategoryType = 'scheduled' | 'completed' | 'abnormal';
