import { getUsersID } from '../../utils/getUserLocalData';

interface TodayOrderResponse {
  result: {
    usersID: number;
    number: string;
    name: string;
    date: string;
    total: number;
    status: string;
    driverTime: string;
    orderDetailsID: number;
    OrdersID: number;
  };
}

export const getUserTodayData = async (): Promise<TodayOrderResponse> => {
  const userID = getUsersID();
  const response = await fetch(`/api/GET/user/dashboard/today/${userID}`);
  
  if (!response.ok) {
    throw new Error(`使用者今日API請求失敗：${response.status}`);
  }
  
  const data = await response.json();
  if (!data || !data.result) {
    throw new Error('使用者今日數據格式錯誤');
  }
  
  return data;
}; 