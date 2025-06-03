//Demo測試 所以獲取任務跟掃描任務 都使用明日任務
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import { MdQrCodeScanner } from 'react-icons/md';
import {
  ScanOrderSectionStyled,
  ScannerContainer,
  StatusMessage,
  ScanText,
} from './styled';
import { ApiData, OrderInfo } from './types';

import QRScanner from '../../../components/deliver/QRScanner';
// import { getTodayOrders } from '../../../apis/deliver/getTodayOrders'; // 獲取今日任務api
import { getSpecificDayOrders } from '../../../apis/deliver/getSpecificDayOrders'; // 獲取特定日期 任務api
import { updateOrderStatus } from '../../../apis/deliver/updateOrderStatus'; // 更新任務狀態api
import { getTomorrowDate } from '../../../utils/getDate';
import { getFormattedDateDash } from '../../../utils/formatDate';
import { useAppSelector } from '../../../store/hooks';

const tomorrow = getFormattedDateDash(getTomorrowDate());

function ScanOrder() {
  const navigate = useNavigate();
  const [executingOrderData, setExecutingOrderData] = useState<ApiData | null>(
    null,
  ); // 執行中的任務資料
  const [scanError, setScanError] = useState<string | null>(null); // 掃描錯誤訊息

  // 從 Redux 獲取認證狀態
  const { userId, isAuthenticated } = useAppSelector((state) => ({
    userId: state.user.userId,
    isAuthenticated: state.user.isAuthenticated,
  }));

  useEffect(() => {
    const fetchTodayOrders = async () => {
      // 如果用戶未認證或沒有用戶ID，直接返回
      if (!isAuthenticated || !userId) {
        console.log('用戶未認證或ID不存在，跳過API調用');
        return;
      }

      try {
        const userIdNumber = Number(userId);
        console.log('獲取用戶任務，用戶ID:', userIdNumber);

        const ordersData = await getSpecificDayOrders(userIdNumber, tomorrow); //api獲取明日任務(demo用)
        console.log('API 原始資料:', ordersData);

        const executingOrder = ordersData.Orders.find(
          (order: ApiData) =>
            order.Status === '前往中' || order.Status === '已抵達',
        );
        console.log('API 執行中任務:', executingOrder);

        if (executingOrder) {
          setExecutingOrderData(executingOrder);
        }
      } catch (error) {
        console.error('獲取今日訂單失敗:', error);
        setScanError('載入任務資料失敗，請重試');
      }
    };

    fetchTodayOrders();
  }, [userId, isAuthenticated]); // 依賴 userId 和 isAuthenticated

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

  // 如果用戶未認證，顯示提示訊息 (可選：也可以移除這個檢查，讓 ProtectedRoute 處理)
  if (!isAuthenticated || !userId) {
    return (
      <ScanOrderSectionStyled>
        <StatusMessage>
          認證狀態異常，請重新登入
        </StatusMessage>
      </ScanOrderSectionStyled>
    );
  }

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
