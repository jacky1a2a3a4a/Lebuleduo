import axios from 'axios';
import { getTomorrowDate } from '../../utils/getDate';
import { getFormattedDateDash } from '../../utils/formatDate';

interface Order {
  OrderDetailID: number;
  OrderName: string;
  OrderStatus: number;
  Region: string;
  PlanName: string;
  DriverTimeStart: string | null;
  DriverTimeEnd: string | null;
  ResponsibleDriver: string;
}

interface Amount {
  totalCount: number;
  UnScheduled: number;
  Scheduled: number;
  totalDrivers: number;
  DriverIsOnline: number;
}

interface Driver {
  UsersID: number;
  LineName: string;
  IsOnline: boolean;
  TodayTaskCount: string;
}

interface ApiResponse {
  statusCode: number;
  status: boolean;
  message: string;
  Amount: Amount;
  Drivers: Driver[];
  result: Order[];
}

export const getAllTasks = async (): Promise<ApiResponse> => {
  try {
    const tomorrow = getTomorrowDate();
    const formattedDate = getFormattedDateDash(tomorrow.toISOString());

    const response = await axios.get<ApiResponse>(
      `/api/GET/Admin/OrderDetail/Pending?date=${formattedDate}`,
    );
    return response.data;
  } catch (error) {
    console.error('獲取任務列表失敗:', error);
    throw error;
  }
};
