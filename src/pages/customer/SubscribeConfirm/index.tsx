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
      const { orderId, price, transactionId } = parsedData;
      
      console.log('sessionStorage 中的 transactionId:', transactionId);
      console.log('orderId (原始):', orderId, typeof orderId);
      console.log('price:', price, typeof price);

      // 確保 orderId 轉換為字串
      const orderIdString = String(orderId);
      console.log('orderId (轉換後):', orderIdString, typeof orderIdString);

      if (!transactionId || !orderId || !price) {
        console.error('缺少必要參數:', { transactionId, orderId, price });
        navigate('/customer/subscribe/fail');
        return;
      }

      try {
        console.log('準備呼叫 confirmLinePay，參數:', {
          orderId: orderIdString,
          transactionId: transactionId,
          amount: price,
        });

        const response = await confirmLinePay({
          orderId: orderIdString,
          transactionId: transactionId,
          amount: price,
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