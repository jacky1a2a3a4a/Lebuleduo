import axios from 'axios';

export type OrderReceipt = {
  OrderNumber: string;
  TotalAmount: number;
  PaymentStatus: number;
  LinePayMethod: string;
  Months: number;
  PlanName: string;
  Liter: number;
  PlanKG: number;
  CreatedAt: string;
  UpdatedAt: string;
};

type OrderReceiptResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: OrderReceipt;
};

export const getOrderReceipt = async (orderId: string): Promise<OrderReceiptResponse> => {
  const response = await axios.get<OrderReceiptResponse>(
    `/api/Get/Orders/${orderId}`
  );
  return response.data;
};
