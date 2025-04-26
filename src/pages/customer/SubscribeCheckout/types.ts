//客戶的訂閱資訊
export interface SubscriptionData {
  // 方案資訊
  planId: number;
  planName: string;
  planPeople: string;
  planKg: number;
  liter: number;
  planDescription: string;
  price: number;

  // 訂閱資訊
  frequency: number;
  days: string;
  startDate: string;
  totalPrice: number;
  qrCodeMethod: number; // 1: print, 2: ship
  paymentMethod: string; // linePay or creditCard

  // 收運資訊
  name: string;
  phone: string;
  address: string;
  deliveryMethod: 'fixedpoint' | 'receipt';
  notes: string;
  fixedPointImages?: Array<{
    id: string;
    url: string;
    file?: File;
  }>;
}

//訂閱步驟
export interface Step {
  number: number;
  text: string;
}
