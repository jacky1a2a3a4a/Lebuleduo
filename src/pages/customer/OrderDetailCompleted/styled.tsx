import styled from 'styled-components';


// 錯誤訊息
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.red[500]};
`;

// 空訊息
export const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

// 頁面容器
export const OrderDetailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: ${({ theme }) => theme.breakpoints.mobile};
  height: 100vh;
  overflow: hidden;
`;

// 導航欄
export const NavHeader = styled.div`
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
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
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  padding: ${({ theme }) => theme.spacing['2xs']};
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:active {
    transform: scale(0.95);
  }
`;

// 頁面標題
export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const OrderID = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
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
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
`;

// 訂單卡片頭部
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 訂單標題
export const OrderTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 訂單卡片頭部編輯按鈕
export const CardHeaderEditButtons = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// 編輯按鈕
export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// 訂單照片區域
export const OrderPhotoArea = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 照片容器
export const PhotoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

// 單張照片容器
export const SinglePhotoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
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
  background-color: ${({ theme }) => theme.colors.neutral[300]};
  color: ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
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
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

// 收運 詳情標籤
export const DetailLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

// 收運 詳情值
export const DetailValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// === 收運列表區塊 最外層大容器 ===
export const OrderListSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  padding: ${({ theme }) => theme.spacing[12]};
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// === 收運列表 標籤容器 ===
export const TabContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.md};

  position: sticky;
  top: 0;
  z-index: 1;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

// 收運列表 標籤
export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.tertiary.main : theme.colors.neutral[200]};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.tertiary};
  border: ${({ $active, theme }) =>
    $active ? 'none' : `1px solid ${theme.colors.neutral[300]}`};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  padding: 8px 16px;

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.typography.fontWeights.bold : theme.typography.fontWeights.normal};
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
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 收運任務列表
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing['2xs']};
`;

// 收運列表標題區塊
export const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

// 收運列表標題
export const OrderListTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

// 收運次數
export const OrderListCal = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;
