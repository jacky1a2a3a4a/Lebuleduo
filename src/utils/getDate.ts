/**
 * 取得當日日期
 * @returns {Date} 當日的日期物件
 */
export const getTodayDate = (): Date => {
  return new Date();
};

/**
 * 取得明天日期
 * @returns {Date} 明天的日期物件
 */
export const getTomorrowDate = (): Date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};
