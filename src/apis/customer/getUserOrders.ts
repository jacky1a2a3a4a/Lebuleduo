import { getUsersID } from '../../utils/getUserLocalData';
import { ApiCurrentOrder } from '../../pages/customer/MyOrder/types';

interface UserOrdersResponse {
  result: ApiCurrentOrder[];
}

export const getUserOrders = async (): Promise<UserOrdersResponse> => {
  const userID = getUsersID();
  const response = await fetch(`/api/GET/user/orders/${userID}`);
  
  if (!response.ok) {
    throw new Error(`當前訂單API請求失敗：${response.status}`);
  }
  
  const data = await response.json();
  if (!data || !data.result) {
    throw new Error('當前訂單數據格式錯誤');
  }
  
  return data;
}; 