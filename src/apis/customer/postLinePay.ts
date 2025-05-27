import axios from 'axios';

type LinePayResponse = {
  paymentUrl: string;
  transactionId: string;
};

export const postLinePay = async (orderId: string): Promise<LinePayResponse> => {
  try {
    const response = await axios.post(`api/Post/linePay/Reserve`, {
      orderId,
    });
    return response.data;
  } catch (error) {
    console.error('LINE Pay API 錯誤:', error);
    throw error;
  }
}; 