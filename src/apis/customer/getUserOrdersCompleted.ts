import { getUsersID } from '../../utils/getUserLocalData';
import { ApiCompletedOrder } from '../../pages/customer/MyOrder/types';

interface UserOrdersCompletedResponse {
  result: ApiCompletedOrder[];
}

export const getUserOrdersCompleted = async (): Promise<UserOrdersCompletedResponse> => {
  const userID = getUsersID();
  const response = await fetch(`/api/GET/user/orders/completed/${userID}`);
  
  if (!response.ok) {
    throw new Error(`已完成訂單API請求失敗：${response.status}`);
  }
  
  const data = await response.json();
  if (!data || !data.result) {
    throw new Error('已完成訂單數據格式錯誤');
  }
  
  return data;
}; 