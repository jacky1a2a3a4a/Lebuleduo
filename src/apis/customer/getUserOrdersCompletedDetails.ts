import { getUsersID } from '../../utils/authUtils';

// 訂單詳情項目型別
export type CompletedOrderDetail = {
  OrderDetailID: number;
  ServiceDate: string;
  ServiceTime: string;
  Status: string;
  DriverTime?: string;
  KG?: string;
};

// 已完成訂單詳情型別
export type CompletedOrderDetailsData = {
  OrdersID: number;
  OrderNumber: string;
  PlanName: string;
  Liter: number;
  PlanKG: number;
  Photos: string[];
  StartDate: string;
  EndDate: string;
  WeekDay: string;
  Addresses: string;
  OrderDetail: CompletedOrderDetail[];
};

// API 回應型別
export type CompletedOrderDetailsResponse = {
  status: boolean;
  result: CompletedOrderDetailsData[];
  message?: string;
};

export const getUserOrdersCompletedDetails = async (
  orderId: string
): Promise<CompletedOrderDetailsResponse> => {
  const usersId = getUsersID();
  
  if (!usersId) {
    throw new Error('使用者 ID 不存在，請重新登入');
  }

  if (!orderId) {
    throw new Error('訂單 ID 不能為空');
  }

  try {
    const response = await fetch(
      `/api/GET/user/orders/completed/${usersId}/${orderId}`
    );

    if (!response.ok) {
      throw new Error(`已完成訂單詳情API請求失敗：${response.status}`);
    }

    const data: CompletedOrderDetailsResponse = await response.json();

    if (!data.status) {
      throw new Error(data.message || '獲取已完成訂單詳情失敗');
    }

    if (!data.result || !Array.isArray(data.result) || data.result.length === 0) {
      throw new Error('已完成訂單詳情數據格式錯誤或無資料');
    }

    return data;
  } catch (error) {
    console.error('getUserOrdersCompletedDetails 錯誤:', error);
    throw error;
  }
}; 