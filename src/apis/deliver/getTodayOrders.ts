// 查看 汪汪員 特定日期(今日) 所有任務
// lebuleduo.rocket-coding.com/GET/driver/day/:DriverID/:Date

// DriverID:9
// Date:2025-04-24

import axios from 'axios';
import { getTodayDate } from '../../utils/getDate';
import { getFormattedDateDash } from '../../utils/formatDate';

export const getTodayOrders = async (userId: string) => {
  try {
    const response = await axios.get(
      `api/GET/driver/day/${userId}/${getFormattedDateDash(getTodayDate())}`,
    );
    return response.data.result.Orders;
  } catch (error) {
    console.error('獲取今日訂單失敗:', error);
    throw error;
  }
};
