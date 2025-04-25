import axios from 'axios';

export const getPlans = async () => {
  try {
    const response = await axios.get('/api/GET/user/plans');
    const data = response.data;

    if (data && data.Plans && Array.isArray(data.Plans)) {
      return data.Plans;
    } else {
      console.warn('API返回的數據結構中沒有Plans數組或格式不正確');
      return [];
    }
  } catch (error) {
    console.error('獲取計劃數據時出錯:', error);
    throw error;
  }
};
