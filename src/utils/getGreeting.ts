/**
 * 根據當前時間返回對應的問候語
 * @returns {string} 問候語
 */
export const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentTime = currentHour * 100 + currentMinute;

  if (currentTime >= 900 && currentTime < 1200) {
    return '早安，汪汪員';
  } else if (currentTime >= 1200 && currentTime < 1400) {
    return '吃午餐了嗎，汪汪員';
  } else if (currentTime >= 1400 && currentTime < 1800) {
    return '奮鬥吧，汪汪員';
  } else {
    return '燃燒吧，汪汪員';
  }
};
