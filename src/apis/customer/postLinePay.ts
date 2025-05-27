import axios from 'axios';

type LinePayResponse = {
  paymentUrl: string;
  transactionId: string;
};

export const postLinePay = async (orderId: string): Promise<LinePayResponse> => {
  try {
    // 在開發環境中使用模擬付款頁面
    if (import.meta.env.DEV) {
      return {
        paymentUrl: `/customer/mock-payment?orderId=${orderId}&amount=1000`,
        transactionId: `mock_${Date.now()}`
      };
    }

    // 正式環境使用真實的 LINE Pay API
    const response = await axios.post(`api/Post/linePay/Reserve`, {
      orderId,
    });
    return response.data;
  } catch (error) {
    console.error('LINE Pay API 錯誤:', error);
    throw error;
  }
}; 