import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import  CommonLoading  from '@/components/common/CommonLoading';
import { confirmLinePay } from '@/apis/customer/confirmLinePay';

const SubscribeConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      const transactionId = searchParams.get('transactionId');
      const orderId = searchParams.get('orderId');

      console.log('Transaction ID:', transactionId);
      console.log('Order ID:', orderId);

      if (!transactionId || !orderId) {
        navigate('/customer/subscribe/fail');
        return;
      }

      try {
        const response = await confirmLinePay({
          transactionId,
          orderId
        });

        if (response.success) {
          // 清除 session storage
          sessionStorage.removeItem('subscriptionData');
          
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