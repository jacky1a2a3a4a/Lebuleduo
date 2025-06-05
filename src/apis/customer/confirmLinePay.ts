import axios from 'axios';

export type ConfirmPaymentParams = {
  orderId: string;
  transactionId: string;
  amount: number;
};

export type ConfirmPaymentResponse = {
  statusCode: number;
  status: boolean;
  message: string;
  result: {
    orderId: string;
    transactionId: string;
    amount: number;
    paymentStatus: string;
    orderNumber: string;
    returnCode: string;
    returnMessage: string;
  };
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
