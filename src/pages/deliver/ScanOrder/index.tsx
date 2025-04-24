import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import QRScanner from '../../../components/deliver/QRScanner';
import QRCodeGenerator from '../../../components/common/QRCodeGenerator';
import { getTodayOrders } from '../../../apis/deliver/getTodayOrders'; // 獲取今日任務api
import { updateOrderStatus } from '../../../apis/deliver/updateOrderStatus'; // 更新任務狀態api

import { MdQrCodeScanner } from 'react-icons/md';
import {
  ScanOrderSectionStyled,
  ScannerContainer,
  StatusMessage,
  ScanText,
} from './styles';
import { ApiData, OrderInfo } from './types';

const userId = localStorage.getItem('UsersID');
const test = true;

function ScanOrder() {
  const navigate = useNavigate();
  const [executingOrderData, setExecutingOrderData] = useState<ApiData | null>(
    null,
  ); // 執行中的任務資料
  const [scanError, setScanError] = useState<string | null>(null); // 掃描錯誤訊息

  useEffect(() => {
    const fetchTodayOrders = async () => {
      if (!userId) {
        console.error('用戶ID不存在');
        return;
      }

      try {
        const orders = await getTodayOrders(userId);
        console.log('API 原始資料:', orders);

        const executingOrder = orders.find(
          (order: ApiData) =>
            order.Status === '前往中' || order.Status === '已抵達',
        );
        console.log('API 執行中任務:', executingOrder);

        if (executingOrder) {
          setExecutingOrderData(executingOrder);
        }
      } catch (error) {
        console.error('獲取今日訂單失敗:', error);
      }
    };

    fetchTodayOrders();
  }, []);

  // 生成訂單 QR Code 數據
  const generateOrderQRData = useCallback(() => {
    if (!executingOrderData) return null;

    return {
      OrderDetailID: executingOrderData.OrderDetailID,
      CustomerNumber: executingOrderData.CustomerNumber,
      Status: executingOrderData.Status,
    };
  }, [executingOrderData]);

  // 處理QR碼掃描結果
  const handleScanResult = useCallback(
    async (result: string) => {
      try {
        const orderData = JSON.parse(result) as OrderInfo;
        console.log('掃描到的訂單資料:', orderData);
        setScanError(null);

        if (!executingOrderData) {
          setScanError('找不到對應的訂單資料');
          return;
        }

        const currentOrderStatus = executingOrderData.Status;
        const currentOrderID = executingOrderData.OrderDetailID;
        const currentOrderCustomerNumber =
          executingOrderData.OrderDetailsNumber;

        console.log('訂單ID:', currentOrderID);
        console.log('訂單狀態:', currentOrderStatus);
        console.log('訂單顧客編號:', currentOrderCustomerNumber);

        switch (currentOrderStatus) {
          case '已抵達':
            navigate(`/deliver/scan-order/process-order/${currentOrderID}`);
            break;
          case '前往中':
            await updateOrderStatus(currentOrderID, 3);
            localStorage.setItem('scannedOrder', result);
            navigate(
              `/deliver/scan-order/process-order/${orderData.OrderDetailID}`,
            );
            break;
          default:
            setScanError('目前沒有可處理的任務');
            break;
        }
      } catch (error) {
        console.error('無效的QR碼:', error);
        setScanError('掃描到無效的QR碼格式，請重試');
      }
    },
    [navigate, executingOrderData],
  );

  return (
    <ScanOrderSectionStyled>
      {/* 掃描相機容器 */}
      <ScannerContainer>
        <QRScanner onScanResult={handleScanResult} onError={setScanError} />
      </ScannerContainer>
      <ScanText>
        <MdQrCodeScanner />
        請掃描垃圾袋上的QRCode
      </ScanText>
      {scanError && <StatusMessage>{scanError}</StatusMessage>}

      {/* 有前往中的訂單時顯示 QR Code */}
      {test && executingOrderData && (
        <QRCodeGenerator
          data={generateOrderQRData()}
          size={150}
          level="H"
          includeMargin={true}
          onDownload={(fileName) => {
            console.log(`QR Code downloaded as: ${fileName}`);
          }}
        />
      )}
    </ScanOrderSectionStyled>
  );
}

export default ScanOrder;
