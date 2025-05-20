import axios from 'axios';

type CreatePaymentResponse = {
  paymentData: {
    PaymentUrl: string;
    MerchantID: string;
    TradeInfo: string;
    TradeSha: string;
    Version?: string;
  };
};

export const createPayment = async (orderId: string): Promise<CreatePaymentResponse> => {
  try {
    // 先檢查藍新金流是否在維護中
    try {
      const maintenanceCheck = await axios.get(
        'https://cwww.newebpay.com/maintain/index',
        {
          timeout: 5000, // 5秒超時
        },
      );
      if (maintenanceCheck.status === 200) {
        throw new Error('藍新金流系統正在維護中，請稍後再試');
      }
    } catch (maintenanceError) {
      // 如果無法訪問維護頁面，表示系統正常運作
      console.log('藍新金流系統正常運作');
    }

    const response = await axios.post<CreatePaymentResponse>(
      'api/Post/bluenew/createPayment',
      {
        orderId: orderId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('藍新金流系統連線逾時，請稍後再試');
      }
      if (error.response) {
        throw new Error(`付款處理失敗: ${error.response.data.message || '請稍後再試'}`);
      }
    }
    throw new Error('付款處理失敗，請稍後再試');
  }
}; 