/**
 * 將支付方式的代碼轉換為顯示文字
 * @param paymentMethod - 支付方式代碼
 * @returns 轉換後的顯示文字
 */
export const formatPaymentMethod = (paymentMethod: string): string => {
  switch (paymentMethod) {
    case 'linePay':
      return 'LINE Pay';
    case 'creditCard':
      return '信用卡';
    default:
      return paymentMethod;
  }
};

/*default不該把payment丟回去*/
