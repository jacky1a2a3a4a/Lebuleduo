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
 * 格式化日期並加入星期幾
 * @param dateString ISO 格式的日期時間字串
 * @returns 格式化後的日期字串 (e.g. "2025/04/24 (四)")
 */
export const getFormattedDateWithDay = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // 星期幾的中文表示
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const dayOfWeek = weekdays[date.getDay()];

  return `${year}/${month}/${day} (${dayOfWeek})`;
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

/**
 * 將中文星期幾轉換為數字格式
 * @param weekdays 中文星期幾的陣列 (e.g. ['一', '二', '三'])
 * @returns 數字格式的星期幾字串 (e.g. "1,2,3")
 */
export const formatWeekdaysToNumbers = (weekdays: string[]): string => {
  const dayMap: { [key: string]: string } = {
    一: '1',
    二: '2',
    三: '3',
    四: '4',
    五: '5',
    六: '6',
    日: '7',
  };

  return weekdays.map((day) => dayMap[day]).join(',');
};

/**
 * 將數字格式的星期幾轉換為中文
 * @param numbers 數字格式的星期幾字串 (e.g. "1,2,3")
 * @returns 中文星期幾的陣列 (e.g. ['一', '二', '三'])
 */
export const formatNumbersToWeekdays = (numbers: string): string[] => {
  const numberMap: { [key: string]: string } = {
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '日',
  };

  return numbers.split(',').map((num) => numberMap[num]);
};
