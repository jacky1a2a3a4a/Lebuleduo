import axios from 'axios';
import type { SubscriptionData } from '@/pages/customer/SubscribeCheckout/types';

type OrderResponse = {
  orders: {
    OrdersID: string;
    [key: string]: any;
  };
};

export const postOrder = async (subscriptionData: SubscriptionData): Promise<OrderResponse> => {
  const userId = localStorage.getItem('UsersID');

  if (!userId) {
    throw new Error('請先登入');
  }

  if (!subscriptionData.planId) {
    throw new Error('方案 ID 不能為空');
  }

  // 確保 paymentMethod 有值
  const paymentMethod = subscriptionData.paymentMethod || 'linePay';

  const formData = new FormData();
  formData.append('UsersID', userId);
  formData.append('PlanID', subscriptionData.planId.toString());
  formData.append('DiscountID', subscriptionData.frequency.toString());
  formData.append('OrderName', subscriptionData.name);
  formData.append('OrderPhone', subscriptionData.phone);
  formData.append('Addresses', subscriptionData.address);
  formData.append('Notes', subscriptionData.notes || '');
  formData.append('WeekDay', subscriptionData.days);
  formData.append('StartDate', subscriptionData.startDate);
  formData.append('QRcodeStatus', subscriptionData.qrCodeMethod.toString());
  formData.append('LinePayMethod', paymentMethod.toString());
  formData.append('TotalAmount', subscriptionData.totalPrice.toString());

  // 處理圖片檔案上傳
  if (
    subscriptionData.deliveryMethod === 'fixedpoint' &&
    subscriptionData.fixedPointImages &&
    subscriptionData.fixedPointImages.length > 0
  ) {
    for (let i = 0; i < subscriptionData.fixedPointImages.length; i++) {
      const image = subscriptionData.fixedPointImages[i];

      if (!image.url) {
        console.warn(`圖片 ${i} 缺少 URL 數據`);
        continue;
      }

      try {
        if (!image.url.includes('data:image')) {
          throw new Error('無效的圖片 URL 格式');
        }

        const base64Data = image.url.split(',')[1];
        if (!base64Data) {
          throw new Error('無法解析 base64 數據');
        }

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);

          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const mimeType = image.url.match(/^data:(.*?);/)?.[1] || 'image/jpeg';
        const blob = new Blob(byteArrays, { type: mimeType });

        if (!(blob instanceof Blob)) {
          throw new Error('Blob 創建失敗');
        }

        formData.append(
          `OrderImage`,
          blob,
          `image_${i}.${mimeType.split('/')[1]}`,
        );
      } catch (error) {
        console.error('無法處理圖片:', error);
        throw new Error('圖片處理失敗，請重新上傳');
      }
    }
  }

  const response = await axios.post('/api/POST/user/orders', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
