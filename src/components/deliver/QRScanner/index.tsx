import { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam'; //react相機套件
import jsQR from 'jsqr'; //QR碼解碼套件
import {
  ScannerContainer,
  ScannerPlaceholder,
  ScannerWebcam,
  ScannerCanvas,
  ShutterTop,
  ShutterBottom,
  ScannerFrame,
} from './styles';

// QRScanner 元件屬性
interface QRScannerProps {
  onScanResult: (result: string) => void;
  onError?: (error: string) => void;
}

// QRScanner 元件
const QRScanner = ({ onScanResult, onError }: QRScannerProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isShutterOpen, setIsShutterOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // 檢查相機權限
  const checkCameraPermission = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices.length === 0) {
        onError?.('未找到可用的相機設備');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error('相機權限檢查失敗:', error);
      onError?.('無法訪問相機，請確保已授予相機權限');
      return false;
    }
  }, [onError]);

  // 掃描 QR Code
  const scanQRCode = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current || !hasPermission) return;

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

    // 使用 jsQR 解碼
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      try {
        // 嘗試解析 JSON 數據
        const parsedData = JSON.parse(code.data);

        // 檢查必要的欄位是否存在
        if (!parsedData.OrderDetailID || !parsedData.OrderDetailsNumber) {
          console.error('QR Code 缺少必要欄位');
          onError?.('QR Code 格式不正確，缺少必要欄位');
          return;
        }

        // 如果成功解析且包含必要欄位，則傳遞結果
        setIsSuccess(true);
        setTimeout(() => {
          onScanResult(code.data);
        }, 1000);
      } catch (error) {
        console.error('QR Code 解析失敗:', error);
        onError?.('無法解析 QR Code 內容');
      }
    }
  }, [onScanResult, onError, hasPermission]);

  // 初始化相機
  useEffect(() => {
    const initCamera = async () => {
      const permissionGranted = await checkCameraPermission();
      setHasPermission(permissionGranted);

      if (permissionGranted) {
        // 先打開快門
        setIsShutterOpen(true);
        // 快門打開後再顯示相機
        setTimeout(() => {
          setShowCamera(true);
        }, 500);
      }
    };

    initCamera();
  }, [checkCameraPermission]);

  // 連續掃描
  useEffect(() => {
    if (!hasPermission) return;

    const intervalId = window.setInterval(scanQRCode, 100);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [scanQRCode, hasPermission]);

  return (
    <ScannerContainer>
      <ScannerWebcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }}
      />
      {!showCamera && (
        <ScannerPlaceholder>
          <ShutterTop isOpen={isShutterOpen} />
          <ShutterBottom isOpen={isShutterOpen} />
        </ScannerPlaceholder>
      )}
      <ScannerFrame isSuccess={isSuccess} />
      <ScannerCanvas ref={canvasRef} />
    </ScannerContainer>
  );
};

export default QRScanner;
