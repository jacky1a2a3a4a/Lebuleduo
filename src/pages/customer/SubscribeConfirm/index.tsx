import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import  CommonLoading  from '@/components/common/CommonLoading';
import { confirmLinePay } from '@/apis/customer/confirmLinePay';

const SubscribeConfirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const handleDebugToggle = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  const testBackendConnection = async () => {
    const subscriptionData = sessionStorage.getItem('subscriptionData');
    if (!subscriptionData) return;
    
    const parsedData = JSON.parse(subscriptionData);
    const { orderId, transactionId, price } = parsedData;
    
    console.log('=== 測試後端連線 ===');
    console.log('測試參數:', { orderId: String(orderId), transactionId, amount: price });
    
    try {
      const response = await confirmLinePay({
        orderId: String(orderId),
        transactionId: transactionId,
        amount: price,
      });
      console.log('測試回應:', response);
    } catch (error) {
      console.error('測試錯誤:', error);
    }
  };

  useEffect(() => {
    const confirmPayment = async () => {
      // 加入短暫延遲，確保後端有時間處理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const subscriptionData = sessionStorage.getItem('subscriptionData');
      
      if (!subscriptionData) {
        console.error('沒有找到 subscriptionData');
        navigate('/customer/subscribe/fail');
        return;
      }

      console.log('完整的 sessionStorage 內容:', subscriptionData);
      const parsedData = JSON.parse(subscriptionData);
      console.log('解析後的資料:', parsedData);
      
      const { orderId, price, transactionId } = parsedData;
      
      console.log('sessionStorage 中的 transactionId:', transactionId, typeof transactionId);
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
        const confirmParams = {
          orderId: orderIdString,
          transactionId: transactionId,
          amount: price,
        };
        
        console.log('準備呼叫 confirmLinePay，參數:', confirmParams);
        console.log('當前時間:', new Date().toISOString());

        const response = await confirmLinePay(confirmParams);

        console.log('confirmLinePay 回應:', response);
        console.log('回應時間:', new Date().toISOString());

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
          console.error('回應的所有欄位:', JSON.stringify(response, null, 2));
          navigate('/customer/subscribe/fail');
        }
      } catch (error) {
        console.error('付款確認發生例外錯誤:', error);
        console.error('錯誤時間:', new Date().toISOString());
        if (error.response) {
          console.error('API 回應錯誤:', error.response.data);
          console.error('HTTP 狀態碼:', error.response.status);
          console.error('完整的錯誤回應:', JSON.stringify(error.response, null, 2));
        }
        if (error.request) {
          console.error('請求詳情:', error.request);
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

  return (
    <div>
      <CommonLoading text="正在確認您的付款，請稍候..." />
      
      {/* 除錯資訊 - 開發時使用 */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 9999,
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '12px'
      }}>
        <button onClick={handleDebugToggle} style={{ marginBottom: '10px' }}>
          {showDebugInfo ? '隱藏除錯' : '顯示除錯'}
        </button>
        
        {showDebugInfo && (
          <div>
            <button onClick={testBackendConnection} style={{ marginBottom: '10px', display: 'block' }}>
              測試後端連線
            </button>
            <div>檢查 Console 日誌</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribeConfirm; 