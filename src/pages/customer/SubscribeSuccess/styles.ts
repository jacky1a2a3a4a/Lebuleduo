import styled from 'styled-components';

// 最外層容器
export const PageWrapper = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  height: 100vh;
  max-width: var(--max-mobile-width);
  margin: 0 auto;
`;

// 成功訊息容器
export const SuccessContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg);
`;

// 成功圖片
export const SuccessImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: var(--spacing-sm);
`;

// 成功標題
export const SuccessTitle = styled.h1`
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-md);
`;

// 成功副標題
export const SuccessSubtitle = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
  text-align: center;
  margin-bottom: var(--spacing-md);
`;

// 訂單信息容器
export const OrderInfoContainer = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-gray-200);
  box-shadow: var(--card-shadow);
  width: 100%;
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
`;

// 訂單號碼
export const OrderNumber = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  text-align: center;
`;

// 訂單詳情項
export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訂單項目標籤
export const OrderItemLabel = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
`;

// 訂單項目值
export const OrderItemValue = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  font-weight: var(--font-weight-medium);
`;

// 分隔線
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--color-gray-200);
  margin: var(--spacing-md) 0;
`;

// QR碼容器
export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// QR碼提示文字容器
export const QRcodeTextItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

// QR碼提示文字項目
export const QRCodeTextItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
`;

// 提示文字圖標
export const TextIcon = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-md);
`;

// QR碼提示文字
export const QRCodeText = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  text-align: left;
`;

// 返回按鈕
export const HomeButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-gray-700);
  }
`;
