export const getIssueText = (issue: string): string => {
  switch (issue) {
    case '1':
      return '垃圾量超過方案限制';
    case '2':
      return '未找到垃圾袋，用戶無回應';
    case '3':
      return '無 QR 碼，用戶無回應';
    case '4':
      return '垃圾袋破損嚴重';
    case '5':
      return '面交未見用戶，已聯絡無回應';
    default:
      return issue;
  }
};
