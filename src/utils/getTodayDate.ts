/**
 * 取得當日日期，格式為 yyyy-mm-dd
 * @returns {string} 格式化的當日日期字串
 */
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
