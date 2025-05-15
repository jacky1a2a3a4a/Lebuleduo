import axios from 'axios';

interface OrderDetailsResponse {
  status: boolean;
  result: Array<{
    OrderNumber: string;
    PlanName: string;
    Liter: string;
    PlanKG: string;
    StartDate: string;
    EndDate: string;
    WeekDay: string;
    Addresses: string;
    Photos: string[];
    OrderDetails: Array<{
      OrderDetailID: number;
      ServiceDate: string;
      ServiceTime: string;
      Status: string;
      DriverTime?: string;
      KG?: string;
      OrderDetailsNumber?: string;
      UserNumber?: {
        Number: string;
      };
    }>;
  }>;
  message?: string;
}

export const getOrderDetails = async (userId: string, orderId: string) => {
  try {
    const path = `/api/GET/user/orders/${userId}/${orderId}`;
    const response = await axios.get<OrderDetailsResponse>(path);
    return response.data;
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(error.response?.data?.message || '獲取方案詳情失敗');
    // }
    throw new Error('獲取方案詳情時發生未知錯誤');
  }
};
