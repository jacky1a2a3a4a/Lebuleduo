// 訂閱資料
export interface SubscriptionData {
  planId: string;
  planName: string;
  liter: number;
  price: number;
  kg: number;
  planPeople: number;
  planDescription: string;
  frequency: string;
  days: string;
  qrCodeMethod: 'print' | 'ship';
  startDate: string;
  totalPrice: number;
}

// 圖片類型
export interface FixedPointImage {
  id: string;
  url: string;
  file: File;
}
