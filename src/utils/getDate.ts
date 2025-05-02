/**
 * 取得當日日期
 * @returns {string} 當日的日期物件 並轉換成字串 (ISO 格式)
 * @example
 * // 輸入: new Date()
 * // 輸出: "2024-03-21T08:30:00.000Z"
 */
export const getTodayDate = (): string => {
  return new Date().toISOString();
};

/**
 * 取得明天日期
 * @returns {string} 明天的日期物件 並轉換成字串 (ISO 格式)
 * @example
 * // 輸入: new Date()
 * // 輸出: "2024-03-22T08:30:00.000Z"
 */
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString();
};
