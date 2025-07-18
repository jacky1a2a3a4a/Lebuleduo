/*根據當前時間返回汪汪員的問候語 */
export const getDeliverGreeting = (): string => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentTime = currentHour * 100 + currentMinute;

  const isMorning = currentTime >= 900 && currentTime < 1200;
  const isAfternoon = currentTime >= 1200 && currentTime < 1400;
  const isEvening = currentTime >= 1400 && currentTime < 1800;

  if (isMorning) {
    return '早安，汪汪員';
  } else if (isAfternoon) {
    return '吃午餐了嗎，汪汪員';
  } else if (isEvening) {
    return '奮鬥吧，汪汪員';
  } else {
    return '燃燒吧，汪汪員';
  }
};

/*根據當前時間返回顧客的問候語（早安、午安、晚安)*/
export const getCustomerGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return '早安';
  } else if (hour >= 12 && hour < 18) {
    return '午安';
  } else {
    return '晚安';
  }
};
