import styled from 'styled-components';

// 載入中訊息
export const LoadingMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  color: var(--color-red-500);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
`;

// 空訊息
export const EmptyMessage = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

// === 頁面 最外層大容器 ===
export const OrderEditContainer = styled.div`
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
  border-radius: var(--border-radius-round);

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
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 訂單卡片
export const OrderCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  padding: var(--spacing-md);
  margin: 0 var(--spacing-md) var(--spacing-md);
  flex-shrink: 0; // 防止卡片被壓縮
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
  padding: var(--spacing-lg) var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

// 收運列表 白色容器
export const OrderListContainer = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-neutral-400);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md) var(--spacing-sm);
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

// 表單區塊
export const FormSection = styled.div`
  margin-bottom: var(--spacing-lg);
`;

// 表單群組
export const FormGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 輸入標籤
export const InputLabel = styled.label`
  color: var(--color-neutral-600);
  display: block;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 輸入框
export const StyledInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-12);
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-neutral-400)'};
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(68, 93, 179, 0.2);
  }

  &::placeholder {
    color: var(--color-neutral-500);
  }
`;

// 文字區域
export const StyledTextarea = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-12);
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-neutral-400)'};
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(68, 93, 179, 0.2);
  }

  &::placeholder {
    color: var(--color-neutral-500);
  }
`;

// 收運選項容器
export const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

// 收運選項
export const DeliveryOption = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-12);
  padding: var(--spacing-md);
  border: 1px solid
    ${(props) =>
      props.$active ? 'var(--color-primary)' : 'var(--color-neutral-400)'};
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: var(--color-primary);
  }
`;

// 單選按鈕
export const RadioButton = styled.div<{ $active?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
      props.$active ? 'var(--color-primary)' : 'var(--color-neutral-400)'};
  border-radius: var(--border-radius-round);
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: ${(props) =>
      props.$active ? 'var(--color-primary)' : 'transparent'};
    border-radius: var(--border-radius-round);
  }
`;

// 收運選項內容
export const DeliveryOptionContent = styled.div`
  flex: 1;
`;

// 收運選項文字
export const DeliveryOptionText = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 收運選項標題
export const DeliveryOptionTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--color-text-primary);
`;

// 收運選項描述
export const DeliveryOptionDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
  line-height: 1.5;
`;

// 收運選項圖片容器
export const DeliveryOptionImageContainer = styled.div`
  margin-top: var(--spacing-md);
`;

// 收運選項圖片列表
export const DeliveryOptionImages = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
`;

// 收運選項圖片
export const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
`;

// 收運選項圖片照片
export const DeliveryOptionImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

// 刪除圖片按鈕
export const DeleteImageButton = styled.button`
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: var(--border-radius-round);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-white);
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

// 上傳圖片按鈕
export const DeliveryOptionImageUpload = styled.div`
  width: 100px;
  height: 100px;
  border: 1px dashed var(--color-neutral-400);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

// 照片說明文字
export const PhotoInstructions = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0;
`;
