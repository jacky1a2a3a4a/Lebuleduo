import axios from 'axios';

type LinePayResponse = {
  success: boolean;
  message: string;
  paymentUrl: string;
  transactionId: string;
};

export const postLinePay = async (orderId: string, amount: number): Promise<LinePayResponse> => {
  try {
    const response = await axios.post(`/api/Post/linePay/Reserve`, {
      orderId,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('LINE Pay API 錯誤:', error);
    throw error;
  }
}; 