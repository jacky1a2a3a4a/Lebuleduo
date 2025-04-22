import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';
// import { TaskStatus } from '../../../../src/types/deliver'; //任務狀態類型
import Webcam from 'react-webcam'; //react相機套件
import jsQR from 'jsqr'; //QR碼解碼套件
import { QRCodeSVG } from 'qrcode.react'; //QR碼生成套件
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
  ProcessOrderButton,
  TestQRCodeContainer,
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
  number: string;
  id: string;
};

// 掃描後獲得的訂單任務類型
type OrderInfo = {
  OrderDetailID: number;
  CustomerNumber: string;
};

const userId = localStorage.getItem('UsersID');

function ScanOrder() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ongoingOrderData, setOngoingOrderData] = useState<ApiData | null>(
    null,
  ); //保存原始數據
  const [onGoingTask, setOnGoingTask] = useState<TaskItem | null>(null); //提取前端需要的數據
  const [isScanning, setIsScanning] = useState(false);
  const [scannedOrder, setScannedOrder] = useState<OrderInfo | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // 從 API 獲取今日訂單，過濾出 前往中 任務
  useEffect(() => {
    const fetchTodayOrders = async () => {
      if (!userId) {
        console.error('用戶ID不存在');
        return;
      }

      try {
        const response = await axios.get(`api/GET/driver/today/${userId}`);
        const orders = response.data.result.Orders;
        console.log('API 原始資料:', response.data);
        console.log('API 任務資料:', orders);

        // 尋找狀態為"前往中"的訂單
        const ongoingOrder = orders.find(
          (order: ApiData) => order.Status === '前往中',
        );
        console.log('API 前往中任務:', ongoingOrder);

        if (ongoingOrder) {
          setOngoingOrderData(ongoingOrder);
          setOnGoingTask({
            number: ongoingOrder.OrderDetailsNumber,
            id: ongoingOrder.OrderDetailID.toString(),
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
      OrderDetailID: ongoingOrderData.OrderDetailID,
      CustomerNumber: ongoingOrderData.OrderDetailsNumber,
    };
  }, [ongoingOrderData]);

  // 處理QR碼掃描結果
  const handleScanResult = useCallback((result: string) => {
    try {
      // 解析掃描到的JSON數據
      const orderData = JSON.parse(result) as OrderInfo;
      setScannedOrder(orderData);
      console.log('掃描到的訂單資料:', orderData);
      setIsScanning(false); //掃描成功後關閉掃描
      setScanError(null); //掃描錯誤訊息清空

      // 可以在這裡將訂單數據儲存到localStorage或其他狀態管理中
      localStorage.setItem('scannedOrder', result);
    } catch (error) {
      console.error('無效的QR碼:', error);
      setScanError('掃描到無效的QR碼格式，請重試');
    }
  }, []);

  // 掃描 QR Code
  const scanQRCode = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { willReadFrequently: true });

    if (!video || !context) {
      console.error('無法訪問相機或畫布');
      return;
    }

    // 確保視頻已經準備好
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error('視頻尚未準備好');
      return;
    }

    // 設置 canvas 尺寸與視頻相同
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 繪製視頻幀到 canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 獲取圖像數據
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // === 使用 jsQR 解碼 ===
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

  // 連續掃描(可以掃描大量訂單)
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
    if (!scannedOrder || !onGoingTask) return;

    try {
      // 儲存掃描到的訂單與進行中任務的關聯
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(
          `order_${onGoingTask.id}`,
          JSON.stringify(scannedOrder),
        );
      } else {
        console.error('localStorage 不可用');
        return;
      }

      // 導航到處理訂單頁面
      navigate(`/deliver/scan-order/process-order/${onGoingTask.id}`);
    } catch (error) {
      console.error('處理訂單時發生錯誤:', error);
    }
  };

  return (
    <ScanOrderSectionStyled>
      {!isScanning && !scannedOrder && (
        <>
          {/* 掃描按鈕 */}
          <ScanButton onClick={startScanning}>掃描QR碼</ScanButton>
          {/* 有前往中的訂單 */}
          {onGoingTask ? (
            <>
              <StatusMessage>已找到前往中的訂單，可以掃描</StatusMessage>
              <TestQRCodeContainer>
                {/* 訂單 QR Code */}
                <StatusMessage>訂單 QR Code：</StatusMessage>
                {generateOrderQRData() && (
                  <QRCodeSVG
                    value={JSON.stringify(generateOrderQRData())}
                    size={200}
                    level="M"
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

      {/* 掃描相機容器 */}
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

      {/* 訂單資訊容器 */}
      {scannedOrder && (
        <OrderInfoContainer>
          <OrderInfoTitle>訂單資訊</OrderInfoTitle>
          <OrderInfoItem>
            <OrderInfoLabel>顧客編號：</OrderInfoLabel>
            <OrderInfoValue>{scannedOrder.CustomerNumber}</OrderInfoValue>
            <OrderInfoLabel>任務編號：</OrderInfoLabel>
            <OrderInfoValue>{scannedOrder.OrderDetailID}</OrderInfoValue>
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
