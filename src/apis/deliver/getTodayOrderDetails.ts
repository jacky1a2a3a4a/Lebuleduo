import axios from 'axios';
import { getTodayDate } from '../../utils/getDate';

export interface TodayOrderDetails {
  OrderDetailID: number;
  OrderDetailsNumber: string;
  Status: string;
  ServiceTime: string;
  Addresses: string;
  CustomerName: string;
  Notes: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  Photo?: string[];
  DriverPhotos?: string[];
  KG?: number;
}

export interface TodayOrderResponse {
  status: boolean;
  result: {
    Orders: TodayOrderDetails[];
  };
}

export const getTodayOrderDetails = async (
  userId: string,
  taskId: string,
): Promise<TodayOrderResponse> => {
  try {
    const response = await axios.get(
      `api/GET/driver/day/${userId}/${getTodayDate()}/${taskId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching today order details:', error);
    throw error;
  }
};
