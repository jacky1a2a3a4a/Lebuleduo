// 查看 汪汪員 特定日期 所有任務
// lebuleduo.rocket-coding.com/GET/driver/day/:DriverID/:Date

// DriverID:9
// Date:2025-04-24

import axios from 'axios';
import { getFormattedDateDash } from '../../utils/formatDate';

export const getSpecificDayOrders = async (userId: number, date: string) => {
  try {
    const response = await axios.get(
      `api/GET/driver/day/${userId}/${date}`,
    );
    return response.data.result?.Orders || [];
  } catch (error) {
    console.error('獲取特定日期訂單失敗:', error);
    return [];
  }
};
