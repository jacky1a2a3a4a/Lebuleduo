import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import QRScanner from '../../../components/deliver/QRScanner';
import QRCodeGenerator from '../../../components/common/QRCodeGenerator';
import { getTodayDate } from '../../../utils/getTodayDate';
import { MdQrCodeScanner } from 'react-icons/md';
import {
  ScanOrderSectionStyled,
  ScannerContainer,
  StatusMessage,
  ScanText,
} from './styles';

// API 回傳的訂單類型(照api順序)
type ApiData = {
  Addresses: string;
  CustomerName: string;
  CustomerNumber: string;
  Liter: number;
  Notes: string;
  OrderDetailID: number;
  OrderDetailsNumber: string; // 訂單編號
  Photo: string[];
  PlanKG: number;
  PlanName: string;
  ServiceTime: string | null;
  Status: string;
};

// 定義任務類型(比對API回傳的任務資料)
type TaskItem = {
  id: string;
};

// 掃描後獲得的訂單任務類型
type OrderInfo = {
  OrderDetailID: number;
  CustomerNumber: string;
  Status?: string; // 新增可選的 Status 欄位
};

const userId = localStorage.getItem('UsersID');
const test = true;

function ScanOrder() {
  const navigate = useNavigate();
  const [executingOrderData, setExecutingOrderData] = useState<ApiData | null>(
    null,
  );
  const [executingTask, setExecutingTask] = useState<TaskItem | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // 從 API 獲取今日訂單，過濾出 前往中/已抵達 任務
  useEffect(() => {
    const fetchTodayOrders = async () => {
      if (!userId) {
        console.error('用戶ID不存在');
        return;
      }

      try {
        const response = await axios.get(
          `api/GET/driver/day/${userId}/${getTodayDate()}`,
        );
        const orders = response.data.result.Orders;
        console.log('API 原始資料:', response.data);
        console.log('API 任務資料:', orders);

        // 尋找狀態為"前往中"或"已抵達"的訂單
        const executingOrder = orders.find(
          (order: ApiData) =>
            order.Status === '前往中' || order.Status === '已抵達',
        );
        console.log('API 執行中任務:', executingOrder);

        if (executingOrder) {
          setExecutingOrderData(executingOrder);
          setExecutingTask({
            id: executingOrder.OrderDetailID.toString(),
          });
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
        // 解析掃描到的JSON數據
        const orderData = JSON.parse(result) as OrderInfo;
        console.log('掃描到的訂單資料:', orderData);
        setScanError(null); //掃描錯誤訊息清空

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

        let response;
        switch (currentOrderStatus) {
          case '已抵達':
            // 如果訂單已經是已抵達狀態，直接跳轉到處理訂單頁面
            navigate(`/deliver/scan-order/process-order/${currentOrderID}`);
            break;
          case '前往中':
            // 更新訂單狀態為已抵達
            response = await axios.put(
              `api/driver/orders/status/${currentOrderID}`,
              {
                OrderStatus: 3, // 3:已抵達
              },
            );
            console.log('訂單狀態更新成功:', response.data);

            // 儲存掃描到的訂單數據
            localStorage.setItem('scannedOrder', result);

            // 跳轉到處理訂單頁面
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
      {test && executingTask && (
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
