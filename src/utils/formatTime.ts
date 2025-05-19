/**
 * 格式化時間顯示
 * @param timeStr - 時間字串 (格式: "HH:mm")
 * @returns 格式化後的時間字串 (格式: "HH:mm AM/PM")
 * @example
 * formatTime("09:30") // "09:30 AM"
 * formatTime("14:30") // "02:30 PM"
 */
export const formatTime = (timeStr: string | null) => {
  if (!timeStr) return '-';

  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const period = hour < 12 ? 'AM' : 'PM';
  const formattedHour = (hour % 12 || 12).toString().padStart(2, '0'); // 確保小時為兩位數
  return `${formattedHour}:${minutes} ${period}`;
};
