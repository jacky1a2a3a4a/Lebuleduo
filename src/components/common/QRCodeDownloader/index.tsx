import React from 'react';
import { createRoot } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { OrderDetail } from '../../customer/QRcodeData/types';
import { DownloadButton } from './styles';
import logo from '../../../assets/icons/Lebuledou_icon.png';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDownloaderProps {
  orderNumber: string;
  orderDetails: OrderDetail[];
}

const QRCodeDownloader: React.FC<QRCodeDownloaderProps> = ({
  orderNumber,
  orderDetails,
}) => {
  const handleDownload = async () => {
    if (!orderDetails.length) return;

    try {
      const qrCodes = orderDetails;
      const qrCodesPerPage = 6;
      const totalPages = Math.ceil(qrCodes.length / qrCodesPerPage);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * qrCodesPerPage;
        const endIndex = Math.min(startIndex + qrCodesPerPage, qrCodes.length);
        const currentPageQRCodes = qrCodes.slice(startIndex, endIndex);

        const printPage = document.createElement('div');
        printPage.style.width = '102mm';
        printPage.style.height = '152mm';
        printPage.style.padding = '10mm';
        printPage.style.backgroundColor = 'white';
        printPage.style.position = 'relative';
        printPage.style.display = 'flex';
        printPage.style.flexDirection = 'column';
        printPage.style.alignItems = 'center';
        printPage.style.justifyContent = 'center';
        printPage.style.pageBreakAfter = 'always';

        const title = document.createElement('div');
        title.style.textAlign = 'center';
        title.style.fontSize = '10px';
        title.style.marginBottom = '10px';
        title.style.fontWeight = 'bold';
        title.style.color = '#1a237e';
        title.innerHTML = `垃不垃多專用 QR Code / 訂單編號: ${orderNumber}`;
        printPage.appendChild(title);

        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        gridContainer.style.gap = '0';
        gridContainer.style.justifyContent = 'center';
        gridContainer.style.alignContent = 'start';

        const renderPromises = currentPageQRCodes.map(
          async (task: OrderDetail) => {
            const qrItem = document.createElement('div');
            qrItem.style.backgroundColor = '#ffffff';
            qrItem.style.border = '1px solid #e0e0e0';
            qrItem.style.borderRadius = '0';
            qrItem.style.padding = '12px';
            qrItem.style.display = 'flex';
            qrItem.style.flexDirection = 'column';
            qrItem.style.alignItems = 'center';
            qrItem.style.gap = '0';
            qrItem.style.boxShadow = 'none';

            const qrCode = document.createElement('div');
            qrCode.style.width = '100px';
            qrCode.style.height = '100px';
            qrCode.style.display = 'flex';
            qrCode.style.justifyContent = 'center';
            qrCode.style.alignItems = 'center';

            const tempDiv = document.createElement('div');
            qrCode.appendChild(tempDiv);

            const root = createRoot(tempDiv);
            root.render(
              <QRCodeCanvas
                value={JSON.stringify({
                  OrderDetailID: task.OrderDetailID,
                  OrderDetailsNumber: task.OrderDetailsNumber,
                })}
                size={100}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: logo,
                  height: 20,
                  width: 20,
                  excavate: true,
                }}
              />,
            );

            const taskInfo = document.createElement('div');
            taskInfo.style.textAlign = 'left';
            taskInfo.style.fontSize = '8px';
            taskInfo.style.color = '#333333';
            taskInfo.style.lineHeight = '1.4';
            taskInfo.style.paddingLeft = '5px';
            taskInfo.style.marginBottom = '5px';
            taskInfo.innerHTML = `
            任務編號:<br/>${task.OrderDetailsNumber}<br/>
            服務日期: ${task.ServiceDate}<br/>
          `;

            qrItem.appendChild(qrCode);
            qrItem.appendChild(taskInfo);
            gridContainer.appendChild(qrItem);

            await new Promise((resolve) => setTimeout(resolve, 100));
          },
        );

        printPage.appendChild(gridContainer);

        // 添加頁碼
        const pageNumber = document.createElement('div');
        pageNumber.style.textAlign = 'center';
        pageNumber.style.fontSize = '8px';
        pageNumber.style.color = '#666666';
        pageNumber.style.marginTop = '5px';
        pageNumber.innerHTML = ` ${pageIndex + 1} / ${totalPages} `;
        printPage.appendChild(pageNumber);

        document.body.appendChild(printPage);
        await Promise.all(renderPromises);

        const canvas = await html2canvas(printPage, {
          scale: 2,
          useCORS: true,
          backgroundColor: 'white',
          logging: true,
          allowTaint: true,
        });
        document.body.removeChild(printPage);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `垃不垃多專用QRcode_訂單編號${orderNumber}_page_${pageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('下載失敗:', error);
    }
  };

  return (
    <DownloadButton onClick={handleDownload}>下載所有 QR Code</DownloadButton>
  );
};

export default QRCodeDownloader;
