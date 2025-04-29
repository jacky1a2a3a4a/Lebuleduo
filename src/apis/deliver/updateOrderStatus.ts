//更新 任務狀態
import axios from 'axios';

// 後端要求回傳格式
export interface OrderStatusUpdate {
  OrderStatus: number;
}

// 未排定 = 0 //UnScheduled
// 已排定 = 1 //Scheduled
// 前往中 = 2 //Ongoing
// 已抵達 = 3 //Arrived
// 已完成 = 4 //Completed
// 異常 = 5 //Abnormal

export const updateOrderStatus = async (orderId: number, status: number) => {
  try {
    const updateData: OrderStatusUpdate = {
      OrderStatus: status,
    };
    const response = await axios.put(
      `api/driver/orders/status/${orderId}`,
      updateData,
    );
    return response.data;
  } catch (error) {
    console.error('更新訂單狀態失敗:', error);
    throw error;
  }
};
