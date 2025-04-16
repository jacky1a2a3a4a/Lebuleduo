import styled from 'styled-components';

// 載入中訊息
export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: red;
`;

// 空訊息
export const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

// 頁面容器
export const OrderDetailContainer = styled.div`
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: var(--mobile-min-width);
  height: 100vh;
  overflow: hidden;
`;

// 導航欄
export const NavHeader = styled.div`
  color: var(--color-white);
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 返回按鈕
export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: var(--font-size-xl);
  padding: var(--spacing-xs);
  border-radius: 50%;

  &:hover {
    background-color: var(--color-gray-100);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 頁面標題
export const PageTitle = styled.h1`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

export const OrderID = styled.h2`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
`;

// ===內容區域 最外層容器
export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

// 訂單卡片
export const OrderCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  padding: var(--spacing-md);
  margin: 0 var(--spacing-md) var(--spacing-md);
`;

// 訂單卡片頭部
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
`;

// 訂單標題
export const OrderTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 訂單卡片頭部編輯按鈕
export const CardHeaderEditButtons = styled.div`
  color: var(--color-primary);
  display: flex;
  gap: var(--spacing-sm);
`;

// 編輯按鈕
export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// 訂單照片區域
export const OrderPhotoArea = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 照片容器
export const PhotoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
`;

// 單張照片容器
export const SinglePhotoContainer = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 25%;
  overflow: hidden;
  aspect-ratio: 3/4;
`;

// 照片
export const Photo = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

// 無照片時的佔位元素
export const NoPhotoPlaceholder = styled.div`
  background-color: var(--color-neutral-300);
  color: var(--color-gray-400);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: var(--font-size-xl);
`;

// 訂單詳情列表
export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
`;

// 收運 詳情項
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
`;

// 收運 詳情標籤
export const DetailLabel = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
`;

// 收運 詳情值
export const DetailValue = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// === 收運列表區塊 最外層大容器 ===
export const OrderListSection = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: var(--spacing-12);
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// === 收運列表 標籤容器 ===
export const TabContainer = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0 var(--spacing-xs);
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--color-background-secondary);

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// 收運列表 標籤
export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) =>
    $active ? 'var(--color-tertiary)' : 'var(--color-neutral-200)'};
  color: ${({ $active }) =>
    $active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'};
  border: ${({ $active }) =>
    $active ? 'none' : '1px solid var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  padding: 8px 16px;

  font-size: var(--font-size-sm);
  font-weight: ${({ $active }) =>
    $active ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)'};
  text-align: center;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

// === 收運列表 任務內容大容器 ===
export const TabContent = styled.div`
  background-color: transparent;
  overflow-y: auto;
  flex: 1;
  height: 100%;
  padding-bottom: var(--spacing-md);

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 收運任務列表
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
  width: 100%;
  padding: 0 var(--spacing-xs);
`;

// 收運列表標題區塊
export const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
`;

// 收運列表標題
export const OrderListTitle = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

// 收運次數
export const OrderListCal = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;
