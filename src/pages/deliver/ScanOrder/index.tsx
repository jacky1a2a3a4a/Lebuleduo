import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
import { TaskStatus } from '../../../../src/types/deliver';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import {
  ScanOrderSectionStyled,
  ScannerContainer,
  ScanButton,
  StatusMessage,
  OrderInfoContainer,
  OrderInfoTitle,
  OrderInfoItem,
  OrderInfoLabel,
  OrderInfoValue,
  Divider,
  ProcessOrderButton,
  TestQRCodeContainer,
} from './styles';

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
};

// 定義訂單類型
type OrderInfo = {
  orderNumber: string;
  planName: string;
  planPeople: string;
  frequency: string;
  totalPrice: string;
  timestamp: string;
};

// API 回傳的訂單類型
type ApiOrder = {
  OrderDetailID: number;
  ServiceTime: string | null;
  OrderDetailsNumber: string;
  Addresses: string;
  CustomerNumber: string;
  CustomerName: string;
  Notes: string;
  Photo: string[];
  Status: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
};

const userId = localStorage.getItem('UsersID');

function ScanOrder() {
  const navigate = useNavigate();
  const [onGoingTask, setOnGoingTask] = useState<TaskItem | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedOrder, setScannedOrder] = useState<OrderInfo | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ongoingOrderData, setOngoingOrderData] = useState<ApiOrder | null>(
    null,
  );

  // 從 API 獲取今日訂單
  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const response = await axios.get(`api/GET/driver/today/${userId}`);
        const orders = response.data.result.Orders;
        console.log('API 原始資料:', response.data);
        console.log('API 任務資料:', orders);

        // 尋找狀態為"前往中"的訂單
        const ongoingOrder = orders.find(
          (order: ApiOrder) => order.Status === '前往中',
        );
        console.log('API 前往中訂單:', ongoingOrder);

        if (ongoingOrder) {
          setOngoingOrderData(ongoingOrder);
          setOnGoingTask({
            id: ongoingOrder.OrderDetailID.toString(),
            status: 'ongoing',
            time: ongoingOrder.ServiceTime || '',
            address: ongoingOrder.Addresses,
            customer: ongoingOrder.CustomerName,
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
    if (!ongoingOrderData) return null;

    return {
      orderNumber: ongoingOrderData.OrderDetailsNumber,
      planName: ongoingOrderData.PlanName,
      planPeople: `${ongoingOrderData.PlanKG}公斤`,
      frequency: '1', // 假設每次配送為一個月
      totalPrice: '1800', // 這裡可以根據實際情況計算
      timestamp: ongoingOrderData.ServiceTime || new Date().toISOString(),
    };
  }, [ongoingOrderData]);

  // 處理QR碼掃描結果
  const handleScanResult = useCallback((result: string) => {
    try {
      // 解析掃描到的JSON數據
      const orderData = JSON.parse(result) as OrderInfo;
      setScannedOrder(orderData);
      setIsScanning(false);
      setScanError(null);

      // 可以在這裡將訂單數據儲存到localStorage或其他狀態管理中
      localStorage.setItem('scannedOrder', result);
    } catch (error) {
      console.error('無效的QR碼格式:', error);
      setScanError('掃描到無效的QR碼格式，請重試');
    }
  }, []);

  // 掃描 QR Code
  const scanQRCode = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!video || !context) return;

    // 設置 canvas 尺寸與視頻相同
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 繪製視頻幀到 canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 獲取圖像數據
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // 使用 jsQR 解碼
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      handleScanResult(code.data);
    }
  }, [handleScanResult]);

  // 開始掃描
  const startScanning = () => {
    setIsScanning(true);
    setScanError(null);
  };

  // 停止掃描
  const stopScanning = () => {
    setIsScanning(false);
  };

  // 掃描循環
  useEffect(() => {
    let intervalId: number;

    if (isScanning) {
      intervalId = window.setInterval(scanQRCode, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isScanning, scanQRCode]);

  // 處理訂單
  const handleProcessOrder = () => {
    if (scannedOrder && onGoingTask) {
      // 儲存掃描到的訂單與進行中任務的關聯
      localStorage.setItem(
        `order_${onGoingTask.id}`,
        JSON.stringify(scannedOrder),
      );

      // 導航到處理訂單頁面
      navigate(`/deliver/task/${onGoingTask.id}/process-order`);
    }
  };

  // 格式化日期時間
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // 生成測試用的訂單數據
  const testOrderData = {
    orderNumber: 'TEST-123456',
    planName: '測試方案',
    planPeople: '2人',
    frequency: '3',
    totalPrice: '1800',
    timestamp: new Date().toISOString(),
  };

  return (
    <ScanOrderSectionStyled>
      {!isScanning && !scannedOrder && (
        <>
          <ScanButton onClick={startScanning}>掃描QR碼</ScanButton>
          {onGoingTask ? (
            <>
              <StatusMessage>已找到前往中的訂單，可以掃描</StatusMessage>
              <TestQRCodeContainer>
                <StatusMessage>訂單 QR Code：</StatusMessage>
                {generateOrderQRData() && (
                  <QRCodeSVG
                    value={JSON.stringify(generateOrderQRData())}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                )}
                <StatusMessage>請掃描此 QR Code 進行測試</StatusMessage>
              </TestQRCodeContainer>
            </>
          ) : (
            <StatusMessage>目前沒有確認前往的訂單，無法掃描</StatusMessage>
          )}
        </>
      )}

      {isScanning && (
        <ScannerContainer>
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              facingMode: 'environment',
            }}
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <ScanButton onClick={stopScanning}>取消掃描</ScanButton>
          {scanError && <StatusMessage>{scanError}</StatusMessage>}
        </ScannerContainer>
      )}

      {scannedOrder && (
        <OrderInfoContainer>
          <OrderInfoTitle>訂單資訊</OrderInfoTitle>
          <OrderInfoItem>
            <OrderInfoLabel>訂單編號：</OrderInfoLabel>
            <OrderInfoValue>{scannedOrder.orderNumber}</OrderInfoValue>
          </OrderInfoItem>
          <Divider />
          <OrderInfoItem>
            <OrderInfoLabel>方案名稱：</OrderInfoLabel>
            <OrderInfoValue>
              {scannedOrder.planName} ({scannedOrder.planPeople})
            </OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>訂閱時長：</OrderInfoLabel>
            <OrderInfoValue>{scannedOrder.frequency}個月</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>訂單金額：</OrderInfoLabel>
            <OrderInfoValue>NT$ {scannedOrder.totalPrice}</OrderInfoValue>
          </OrderInfoItem>
          <OrderInfoItem>
            <OrderInfoLabel>訂單時間：</OrderInfoLabel>
            <OrderInfoValue>
              {formatDate(scannedOrder.timestamp)}
            </OrderInfoValue>
          </OrderInfoItem>
          <ProcessOrderButton
            onClick={handleProcessOrder}
            disabled={!onGoingTask}
          >
            {onGoingTask ? '處理此訂單' : '請先前往任務'}
          </ProcessOrderButton>
          <ScanButton
            onClick={() => {
              setScannedOrder(null);
              setScanError(null);
            }}
            style={{ marginTop: 'var(--spacing-md)' }}
          >
            重新掃描
          </ScanButton>
        </OrderInfoContainer>
      )}
    </ScanOrderSectionStyled>
  );
}

export default ScanOrder;
