import axios from 'axios';

export type ConfirmPaymentParams = {
  orderId: string;
  transactionId: number;
  amount: number;
};

export type ConfirmPaymentResponse = {
  success: boolean;
  message?: string;
};

export const confirmLinePay = async (
  params: ConfirmPaymentParams
): Promise<ConfirmPaymentResponse> => {
  const response = await axios.post<ConfirmPaymentResponse>(
    '/api/Post/linePay/Confirm',
    params
  );
  return response.data;
};
