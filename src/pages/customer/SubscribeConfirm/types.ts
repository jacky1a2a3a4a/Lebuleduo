export type ConfirmPaymentParams = {
  transactionId: string;
  orderId: string;
};

export type ConfirmPaymentResponse = {
  success: boolean;
  message?: string;
}; 