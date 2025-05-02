import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import { MdQrCodeScanner } from 'react-icons/md';
import {
  ScanOrderSectionStyled,
  ScannerContainer,
  StatusMessage,
  ScanText,
} from './styles';
import { ApiData, OrderInfo } from './types';

import QRScanner from '../../../components/deliver/QRScanner';
import { getTodayOrders } from '../../../apis/deliver/getTodayOrders'; // 獲取今日任務api
import { updateOrderStatus } from '../../../apis/deliver/updateOrderStatus'; // 更新任務狀態api
import { getUsersID } from '../../../utils/getUserLocalData';

const userId = getUsersID();

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
        const orders = await getTodayOrders(userId); //api獲取今日任務
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

  // 處理QR碼掃描結果
  const handleScanResult = useCallback(
    async (result: string) => {
      try {
        const orderData = JSON.parse(result) as OrderInfo;
        console.log('掃描到的訂單資料:', orderData);
        setScanError(null);

        // 驗證 QR Code 資料格式
        if (!orderData.OrderDetailID || !orderData.OrderDetailsNumber) {
          setScanError('QR Code 格式不正確，缺少必要欄位');
          return;
        }

        if (!executingOrderData) {
          setScanError(
            `目前沒有進行中的任務\n1. 請點選"今日任務"\n2. 選擇一筆要執行的任務\n3. 點選"確認前往"按鈕`,
          );
          return;
        }

        const currentOrderID = executingOrderData.OrderDetailID;
        const currentOrderNumber = executingOrderData.OrderDetailsNumber;
        const currentOrderStatus = executingOrderData.Status;

        // 只驗證兩個條件
        if (orderData.OrderDetailsNumber !== currentOrderNumber) {
          setScanError(
            `．掃描到的訂單編號 ${orderData.OrderDetailsNumber}\n．當前執行任務的訂單編號 ${currentOrderNumber}\n．兩者編號不相符，請重新確認。`,
          );
          return;
        }

        if (orderData.OrderDetailID !== currentOrderID) {
          setScanError('掃描的任務ID與當前執行中的任務不符，請重新確認。');
          return;
        }

        if (
          currentOrderStatus !== '前往中' &&
          currentOrderStatus !== '已抵達'
        ) {
          setScanError('當前任務狀態不是"前往中"或"已抵達"，無法進行處理');
          return;
        }

        // 所有條件都通過，更新狀態並導航
        await updateOrderStatus(currentOrderID, 3); // api 更新任務狀態為前往中
        localStorage.setItem('scannedOrder', result);
        navigate(`/deliver/scan-order/process-order/${currentOrderID}`);
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
    </ScanOrderSectionStyled>
  );
}

export default ScanOrder;
