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
      const transactionId = searchParams.get('transactionId');
      console.log('transactionId:', transactionId);
      const subscriptionData = sessionStorage.getItem('subscriptionData');
      
      if (!subscriptionData) {
        navigate('/customer/subscribe/fail');
        return;
      }

      const { orderId, price } = JSON.parse(subscriptionData);
      console.log('orderId:', orderId);
      console.log('price:', price);


      if (!transactionId || !orderId || !price) {
        navigate('/customer/subscribe/fail');
        return;
      }

      try {
        const response = await confirmLinePay({
          orderId: orderId,
          transactionId: parseInt(transactionId),
          amount: price,
        });

        if (response.success) {
          // 暫時保留 session storage 資料
          // sessionStorage.removeItem('subscriptionData');
          
          // 導向成功頁面
          navigate('/customer/subscribe/success', {
            state: { orderId }
          });
        } else {
          navigate('/customer/subscribe/fail');
        }
      } catch (error) {
        console.error('付款確認失敗:', error);
        navigate('/customer/subscribe/fail');
      } finally {
        setIsProcessing(false);
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  if (!isProcessing) {
    return null;
  }

  return <CommonLoading text="正在確認您的付款，請稍候..." />;
};

export default SubscribeConfirm; 