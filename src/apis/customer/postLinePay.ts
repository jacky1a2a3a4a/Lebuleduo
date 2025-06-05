import axios from 'axios';

type LinePayResponse = {
  success: boolean;
  message: string;
  paymentUrl: string;
  transactionId: string;
};

export const postLinePay = async (orderId: string, amount: number): Promise<LinePayResponse> => {
  try {
    // 設定回調 URL，讓 LINE Pay 支付完成後回到確認頁面
    const confirmUrl = `${window.location.origin}/customer/subscribe-confirm`;
    const cancelUrl = `${window.location.origin}/customer/subscribe/fail`;
    
    const response = await axios.post(`/api/Post/linePay/Reserve`, {
      orderId,
      amount,
      confirmUrl,
      cancelUrl,
    });
    return response.data;
  } catch (error) {
    console.error('LINE Pay API 錯誤:', error);
    throw error;
  }
}; 