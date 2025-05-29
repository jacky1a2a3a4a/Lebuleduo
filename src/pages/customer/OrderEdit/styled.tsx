import styled from 'styled-components';

// 載入中訊息
export const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing['2xs']};
`;

// 空訊息
export const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

// 成功訊息
export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// === 頁面 最外層大容器 ===
export const OrderEditContainer = styled.div`
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
  border-radius: ${({ theme }) => theme.borderRadius.round};

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
  background-color: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// 訂單卡片
export const OrderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  flex-shrink: 0; // 防止卡片被壓縮
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
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

// 收運列表 白色容器
export const OrderListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

// 收運任務列表
export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
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

// 表單區塊
export const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 表單群組
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 輸入標籤
export const InputLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral[600]};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 輸入框群組
export const SelectGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

// 下拉式選單容器
export const DeliverySelect = styled.select<{ $error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: 40px;
  border: 1px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  transition: all 0.3s;
  appearance: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$error ? props.theme.colors.error : props.theme.colors.gray[400]};
    outline-offset: 0px;
  }

  option {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

// 下拉選單圖標
export const SelectIcon = styled.div`
  color: ${({ theme }) => theme.colors.gray[500]};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  pointer-events: none;
`;

// 文字區域
export const StyledTextarea = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing[12]};
  border: 1px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.neutral[400]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.light};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }
`;

// 刪除圖片按鈕
export const DeleteImageButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

// 上傳圖片按鈕
export const DeliveryOptionImageUpload = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  border: 1px dashed ${({ theme }) => theme.colors.neutral[400]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

// 照片說明文字
export const PhotoInstructions = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin: 0;
`;

// 收運選項圖片容器
export const DeliveryOptionImageContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// 收運選項圖片列表
export const DeliveryOptionImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 收運選項圖片
export const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

// 收運選項圖片照片
export const DeliveryOptionImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

// 輸入框
export const StyledInput = styled.input<{ $error?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid
    ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$error ? props.theme.colors.error : props.theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

// 儲存按鈕
export const SaveButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.hover};
      opacity: 0.8;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;
