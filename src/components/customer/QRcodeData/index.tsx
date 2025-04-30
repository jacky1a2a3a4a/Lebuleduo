import React, { useEffect, useState, useRef } from 'react';
import QRCodeGenerator from '../../common/QRCodeGenerator';
import { getOrderDetails } from '../../../apis/customer/getOrderDetails';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import {
  QRCodeContainer,
  QRCodeTitle,
  QRCodeList,
  QRCodeItem,
  TaskInfo,
  DownloadButton,
  QRCodePage,
  PaginationContainer,
  PageButton,
  PageInfo,
} from './styles';
import { OrderResult, OrderDetail } from './types';
import html2canvas from 'html2canvas';

interface QRcodeDataProps {
  orderId: string;
  userId: string;
}

const QRcodeData: React.FC<QRcodeDataProps> = ({ orderId, userId }) => {
  const [orderData, setOrderData] = useState<OrderResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 6;

  // 計算總頁數
  const totalPages = orderData
    ? Math.ceil(orderData.OrderDetails.length / ITEMS_PER_PAGE)
    : 0;

  // 獲取當前頁的QR碼
  const getCurrentPageItems = () => {
    if (!orderData) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return orderData.OrderDetails.slice(startIndex, endIndex);
  };

  // 頁面切換處理
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(userId, orderId);
        if (response.status) {
          // 轉換 API 返回的數據以匹配 OrderResult 類型
          const transformedData: OrderResult = {
            ...response.result[0],
            OrderDetails: response.result[0].OrderDetails.map((detail) => ({
              ...detail,
              OrderDetailsNumber: detail.OrderDetailsNumber || '',
              UserNumber: detail.UserNumber || { Number: 'N/A' },
            })),
          };
          setOrderData(transformedData);
          console.log('api 原始數據', response.result[0]);
        } else {
          setError(response.message || '獲取訂單詳情失敗');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '發生未知錯誤');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, orderId]);

  const handleDownload = async () => {
    if (!orderData) return;

    try {
      const qrCodes = orderData.OrderDetails;
      const qrCodesPerPage = 6;
      const totalPages = Math.ceil(qrCodes.length / qrCodesPerPage);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * qrCodesPerPage;
        const endIndex = Math.min(startIndex + qrCodesPerPage, qrCodes.length);
        const currentPageQRCodes = qrCodes.slice(startIndex, endIndex);

        const printPage = document.createElement('div');
        printPage.className = 'print-page';
        printPage.style.width = '4in';
        printPage.style.height = '6in';
        printPage.style.padding = '0.5in';
        printPage.style.display = 'grid';
        printPage.style.gridTemplateColumns = 'repeat(2, 1fr)';
        printPage.style.gridTemplateRows = 'repeat(3, 1fr)';
        printPage.style.gap = '0.2in';
        printPage.style.backgroundColor = 'white';
        printPage.style.position = 'relative';
        printPage.style.pageBreakAfter = 'always';

        currentPageQRCodes.forEach((task: OrderDetail) => {
          const qrItem = document.createElement('div');
          qrItem.style.display = 'flex';
          qrItem.style.flexDirection = 'column';
          qrItem.style.alignItems = 'center';
          qrItem.style.justifyContent = 'center';
          qrItem.style.padding = '0.1in';

          const qrCode = document.createElement('div');
          qrCode.innerHTML = `
            <div style="width: 1.2in; height: 1.2in;">
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <rect x="0" y="0" width="200" height="200" fill="white"/>
                <text x="100" y="190" text-anchor="middle" font-size="12">
                  ${task.OrderDetailsNumber}
                </text>
              </svg>
            </div>
          `;
          qrItem.appendChild(qrCode);
          printPage.appendChild(qrItem);
        });

        document.body.appendChild(printPage);
        const canvas = await html2canvas(printPage, {
          scale: 2,
          useCORS: true,
          backgroundColor: 'white',
        });
        document.body.removeChild(printPage);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `qrcodes_${orderId}_page_${pageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('下載失敗:', error);
    }
  };

  if (loading) return <div>載入中...</div>;
  if (error) return <div>錯誤: {error}</div>;
  if (!orderData) return <div>未找到訂單詳情</div>;

  return (
    <QRCodePage>
      <QRCodeContainer ref={qrCodeRef}>
        <QRCodeTitle>
          <p className="title">訂單 QR Code</p>
          <p className="order-number">訂單編號: {orderData.OrderNumber}</p>
        </QRCodeTitle>

        <QRCodeList>
          {getCurrentPageItems().map((task: OrderDetail) => (
            <QRCodeItem key={task.OrderDetailID}>
              <QRCodeGenerator
                data={{
                  OrderDetailID: task.OrderDetailID,
                  OrderDetailsNumber: task.OrderDetailsNumber,
                  ServiceDate: task.ServiceDate,
                }}
                size={80}
                showDownloadButton={false}
              />
              <TaskInfo>
                任務編號:
                <br />
                {task.OrderDetailsNumber}
                <br />
                服務日期:
                <br />
                {task.ServiceDate}
                <br />
              </TaskInfo>
            </QRCodeItem>
          ))}
        </QRCodeList>

        {/* 下載按鈕 */}
        <DownloadButton onClick={handleDownload}>
          下載所有 QR Code
        </DownloadButton>

        {/* 分頁器 */}
        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ paddingLeft: '2px' }}
          >
            <MdArrowBackIos />
          </PageButton>
          <PageInfo>
            {currentPage} / {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdArrowForwardIos />
          </PageButton>
        </PaginationContainer>
      </QRCodeContainer>
    </QRCodePage>
  );
};

export default QRcodeData;
