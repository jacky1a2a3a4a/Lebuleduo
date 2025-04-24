/**
 * 格式化日期與時間
 * @param dateString ISO 格式的日期時間字串 (e.g. "2025-04-24T07:39:41.32")
 * @returns 格式化後的日期時間字串 (e.g. "2025/04/24 07:39")
 */
export const getFormattedDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  // 如果日期無效，返回原始字串
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * 格式化日期
 * @param dateString ISO 格式的日期時間字串
 * @returns 格式化後的日期字串 (e.g. "2025/04/24")
 */
export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

/**
 * 格式化時間
 * @param dateString ISO 格式的日期時間字串
 * @returns 格式化後的時間字串 (e.g. "07:39")
 */
export const getFormattedTime = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};
