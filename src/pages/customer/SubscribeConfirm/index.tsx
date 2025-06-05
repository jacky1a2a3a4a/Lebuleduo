import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import  CommonLoading  from '@/components/common/CommonLoading';
import { confirmLinePay } from '@/apis/customer/confirmLinePay';

const SubscribeConfirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      const subscriptionData = sessionStorage.getItem('subscriptionData');
      
      if (!subscriptionData) {
        console.error('沒有找到 subscriptionData');
        navigate('/customer/subscribe/fail');
        return;
      }

      const parsedData = JSON.parse(subscriptionData);
      const { orderId, totalPrice, transactionId } = parsedData;
      
      console.log('sessionStorage 中的資料:', parsedData);
      console.log('sessionStorage 中的 transactionId:', transactionId);
      console.log('orderId (原始):', orderId, typeof orderId);
      console.log('totalPrice:', totalPrice, typeof totalPrice);

      // 確保 orderId 轉換為字串
      const orderIdString = String(orderId);
      console.log('orderId (轉換後):', orderIdString, typeof orderIdString);

      // 確保 transactionId 轉換為字串（解決 JavaScript 精度問題）
      const transactionIdString = String(transactionId);
      console.log('transactionId (轉換後):', transactionIdString, typeof transactionIdString);

      // 加強參數驗證
      if (!transactionId || !orderId || !totalPrice) {
        console.error('缺少必要參數:', { transactionId, orderId, totalPrice });
        console.error('完整的 parsedData:', parsedData);
        navigate('/customer/subscribe/fail');
        return;
      }

      // 驗證參數類型
      if (!transactionIdString || transactionIdString === 'undefined' || transactionIdString === 'null') {
        console.error('transactionId 無效:', transactionIdString);
        navigate('/customer/subscribe/fail');
        return;
      }
      
      if (typeof totalPrice !== 'number' || totalPrice <= 0) {
        console.error('totalPrice 應該是正數，實際值:', totalPrice);
        navigate('/customer/subscribe/fail');
        return;
      }

      try {
        console.log('準備呼叫 confirmLinePay，參數:', {
          orderId: orderIdString,
          transactionId: transactionIdString,
          amount: totalPrice,
        });

        const response = await confirmLinePay({
          orderId: orderIdString,
          transactionId: transactionIdString,
          amount: totalPrice,
        });

        console.log('confirmLinePay 回應:', response);

        if (response.success) {
          console.log('付款確認成功，導向成功頁面');
          // 清除 session storage 資料
          sessionStorage.removeItem('subscriptionData');
          
          // 導向成功頁面
          navigate('/customer/subscribe/success', {
            state: { orderId: orderIdString }
          });
        } else {
          console.error('付款確認失敗，回應:', response);
          console.error('失敗訊息:', response.message);
          navigate('/customer/subscribe/fail');
        }
      } catch (error) {
        console.error('付款確認發生例外錯誤:', error);
        if (error.response) {
          console.error('API 回應錯誤:', error.response.data);
          console.error('HTTP 狀態碼:', error.response.status);
        }
        navigate('/customer/subscribe/fail');
      } finally {
        setIsProcessing(false);
      }
    };

    confirmPayment();
  }, [navigate]);

  if (!isProcessing) {
    return null;
  }

  return <CommonLoading text="正在確認您的付款，請稍候..." />;
};

export default SubscribeConfirm; 