import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../../../../src/types/deliver';
import { Html5QrcodeScanner } from 'html5-qrcode';

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

// 最外層 大容器
const ScanOrderSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
`;

// 掃描器容器
const ScannerContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: var(--spacing-lg);
`;

// 掃描按鈕
const ScanButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;
  margin-bottom: var(--spacing-md);

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

// 測試按鈕
const TestButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

// 狀態訊息
const StatusMessage = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-align: center;
  margin-top: var(--spacing-md);
`;

// 訂單資訊容器
const OrderInfoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

// 訂單資訊標題
const OrderInfoTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--color-gray-700);
`;

// 訂單資訊項目
const OrderInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訂單資訊標籤
const OrderInfoLabel = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
`;

// 訂單資訊值
const OrderInfoValue = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
`;

// 分隔線
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-300);
  margin: var(--spacing-md) 0;
`;

// 處理訂單按鈕
const ProcessOrderButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md);
  width: 100%;
  font-size: var(--font-size-md);
  cursor: pointer;
  margin-top: var(--spacing-lg);

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

function ScanOrder() {
  const navigate = useNavigate();
  const [onGoingTask, setOnGoingTask] = useState<TaskItem | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedOrder, setScannedOrder] = useState<OrderInfo | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  // 檢查是否有前往中的訂單
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      const onGoingTask = tasks.find((task) => task.status === 'ongoing');
      // 如果有找到，則設定為前往中的訂單
      setOnGoingTask(onGoingTask);
    }
  }, []);

  // 處理QR碼掃描結果
  const handleScanResult = (decodedText: string) => {
    try {
      // 解析掃描到的JSON數據
      const orderData = JSON.parse(decodedText) as OrderInfo;
      setScannedOrder(orderData);
      setIsScanning(false);
      setScanError(null);

      // 停止掃描
      if (scanner) {
        scanner.clear();
      }

      // 可以在這裡將訂單數據儲存到localStorage或其他狀態管理中
      localStorage.setItem('scannedOrder', decodedText);
    } catch (error) {
      console.error('無效的QR碼格式:', error);
      setScanError('掃描到無效的QR碼格式，請重試');
    }
  };

  // 開始掃描
  const startScanning = () => {
    setIsScanning(true);
    setScanError(null);

    try {
      // 初始化掃描器
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
        },
        false,
      );

      setScanner(html5QrcodeScanner);

      // 開始掃描
      html5QrcodeScanner.render(
        (decodedText) => {
          // 成功回調
          handleScanResult(decodedText);
        },
        (errorMessage) => {
          // 錯誤回調（這裡通常不需處理，因為許多是臨時性的錯誤）
          console.log(errorMessage);
        },
      );
    } catch (error) {
      console.error('掃描器初始化失敗:', error);
      setScanError('掃描器初始化失敗，請檢查相機權限');
      setIsScanning(false);
    }
  };

  // 停止掃描
  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setIsScanning(false);
  };

  // 模擬掃描 QR Code 成功
  const handleTestScan = () => {
    if (onGoingTask) {
      // 模擬訂單數據
      const mockOrderData: OrderInfo = {
        orderNumber: `LBL${Date.now()}${Math.floor(Math.random() * 900000) + 100000}`,
        planName: '標準方案',
        planPeople: '1-2人',
        frequency: '3',
        totalPrice: '1200',
        timestamp: new Date().toISOString(),
      };

      setScannedOrder(mockOrderData);
      localStorage.setItem('scannedOrder', JSON.stringify(mockOrderData));
    }
  };

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

  // 清理掃描器資源
  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  return (
    <ScanOrderSectionStyled>
      {!isScanning && !scannedOrder && (
        <>
          <ScanButton onClick={startScanning}>掃描QR碼</ScanButton>
          <TestButton onClick={handleTestScan}>模擬掃描</TestButton>
          {onGoingTask ? (
            <StatusMessage>已找到前往中的訂單，可以掃描</StatusMessage>
          ) : (
            <StatusMessage>目前沒有確認前往的訂單，無法掃描</StatusMessage>
          )}
        </>
      )}

      {isScanning && (
        <ScannerContainer>
          <div id="qr-reader" style={{ width: '100%' }}></div>
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
