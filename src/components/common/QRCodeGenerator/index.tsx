import { useCallback } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { downloadButtonStyles, canvasStyles } from './styles';
import logo from '../../../assets/Lebuledou.png';

interface QRCodeGeneratorProps {
  data: string | object;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H'; // 新增 QR Code 的容錯等級
  includeMargin?: boolean;
  onDownload?: (fileName: string) => void;
  showDownloadButton?: boolean;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
  };
}

const QRCodeGenerator = ({
  data,
  size = 200, //預設qrcode大小
  level = 'H', //預設容錯等級
  includeMargin = true, //預設包含邊框
  onDownload,
  showDownloadButton = true,
  imageSettings = {
    src: logo,
    height: 30,
    width: 30,
    excavate: true,
  },
}: QRCodeGeneratorProps) => {
  const downloadQRCode = useCallback(() => {
    if (!data) return;

    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    const fileName = `qr_code_${Date.now()}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onDownload?.(fileName);
  }, [data, onDownload]);

  if (!data) return null;

  return (
    <div>
      <QRCodeSVG
        value={JSON.stringify(data)}
        size={size}
        level={level}
        includeMargin={includeMargin}
        imageSettings={imageSettings}
      />
      <QRCodeCanvas
        id="qr-canvas"
        value={JSON.stringify(data)}
        size={size}
        level={level}
        includeMargin={includeMargin}
        style={canvasStyles}
        imageSettings={imageSettings}
      />
      {showDownloadButton && (
        <button onClick={downloadQRCode} style={downloadButtonStyles}>
          下載 QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
