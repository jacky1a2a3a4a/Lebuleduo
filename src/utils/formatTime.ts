/**
 * 格式化時間顯示
 * @param timeStr - 時間字串 (格式: "HH:mm")
 * @returns 格式化後的時間字串 (格式: "h:mm AM/PM")
 * @example
 * formatTime("09:30") // "9:30 AM"
 * formatTime("14:30") // "2:30 PM"
 */
export const formatTime = (timeStr: string | null) => {
  if (!timeStr) return '-';

  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = hour % 12 || 12; // 將 0 轉換為 12
  return `${formattedHour}:${minutes} ${period}`;
};
