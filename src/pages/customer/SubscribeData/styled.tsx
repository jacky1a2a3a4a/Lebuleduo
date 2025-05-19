import styled from 'styled-components';

interface StyledProps {
  $active?: boolean;
  $light?: boolean;
  $open?: boolean;
  $error?: boolean;
}

// 整個頁面的容器
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray[0]};
`;

// 可滾動的內容區域
export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// 區段標題 模板
export const SectionTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 區段主標題 模板
export const SectionMainTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

// 區段副標題 模板
export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

// 表單區段
export const FormSection = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 表單組
export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 輸入標籤
export const InputLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

// 樣式化輸入框
export const StyledInput = styled.input<StyledProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  &:focus {
    outline: 1px solid
      ${({ $error, theme }) =>
        $error ? theme.colors.red[500] : theme.colors.gray[400]};
    outline-offset: 0px;
  }
`;

// 樣式化文本區域
export const StyledTextarea = styled.textarea<StyledProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $error, theme }) =>
      $error ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  min-height: 100px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  &:focus {
    outline: 1px solid
      ${({ $error, theme }) =>
        $error ? theme.colors.red[500] : theme.colors.gray[400]};
    outline-offset: 0px;
  }
`;

// 收貨方式 最外層大容器
export const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

// 收貨方式選項
export const DeliveryOption = styled.div<StyledProps>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.gray[400] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
`;

// 單選按鈕
export const RadioButton = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.gray[600] : theme.colors.gray[300]};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.gray[600]};
    display: ${({ $active }) => ($active ? 'block' : 'none')};
  }
`;

// 選項內容容器 文字+照片
export const DeliveryOptionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 收貨方式文本容器
export const DeliveryOptionText = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 收貨方式標題
export const DeliveryOptionTitle = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

// 收貨方式描述
export const DeliveryOptionDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  line-height: 1.4;
`;

// 收貨方式圖片容器
export const DeliveryOptionImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// 收貨方式圖片區
export const DeliveryOptionImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

// 照片項目容器
export const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100px;
  height: 125px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
`;

// 照片顯示
export const DeliveryOptionImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// 刪除照片按鈕
export const DeleteImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

// 上傳照片按鈕
export const DeliveryOptionImageUpload = styled.div`
  width: 100px;
  height: 125px;
  background-color: var(--color-gray-200);
  border: 2px dashed var(--color-gray-400);
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

// 照片上傳說明
export const PhotoInstructions = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  margin-top: var(--spacing-sm);
`;

// 總計價格
export const TotalPrice = styled.div`
  font-weight: var(--font-weight-bold);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 總計價格文字
export const TotalPriceText = styled.div`
  font-size: var(--font-size-sm);
  line-height: 1;
  margin-right: var(--spacing-sm);
`;

// 總計價格數字
export const TotalPriceTCount = styled.div`
  font-size: var(--font-size-2xl);
`;

// 下一步按鈕
export const NextButton = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  color: var(--color-gray-0);
  border: none;
  border-radius: var(--border-radius-round);
  width: 100%;
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);
  transition: background-color 0.2s;
  cursor: ${(props) => (props.$active ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-gray-700)' : 'var(--color-gray-400)'};
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;
