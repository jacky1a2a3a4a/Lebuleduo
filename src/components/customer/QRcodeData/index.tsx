import React, { useEffect, useState, useRef } from 'react';
import QRCodeGenerator from '../../common/QRCodeGenerator';
import QRCodeDownloader from '../../common/QRCodeDownloader';
import { getOrderDetails } from '../../../apis/customer/getOrderDetails';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import {
  QRCodeContainer,
  QRCodeTitle,
  QRCodeList,
  QRCodeItem,
  TaskInfo,
  QRCodePage,
  PaginationContainer,
  PageButton,
  PageInfo,
  CustomQRCodeDownloadButton,
} from './styles';
import { OrderResult, OrderDetail } from './types';

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
                  OrderDetailID: Number(task.OrderDetailID),
                  OrderDetailsNumber: task.OrderDetailsNumber,
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

        <CustomQRCodeDownloadButton as="div">
          <QRCodeDownloader
            orderNumber={orderData.OrderNumber}
            orderDetails={orderData.OrderDetails}
            buttonText="下載所有 QR Code"
          />
        </CustomQRCodeDownloadButton>

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
