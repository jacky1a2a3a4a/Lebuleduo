import styled from 'styled-components';

// === 最外層容器 ===
export const FullHeightContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  min-height: 100vh;
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  margin: 0 auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// === 導航 大容器 ===
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.lg};
`;

// === 通用大標題文字 ===
export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// 導航 文字容器
export const NavTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: 1.2;
`;

//  導航 圖示
export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 24px;
  width: 24px;
  position: relative;
  top: 1px;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

// 導航 標題文字
export const NavTitleText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// 導航 副標題
export const NavSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

// === 通用容器卡片 ===
export const DetailCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// 通用容器 卡片內容
export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 通用容器 水平分散
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// 通用容器 普通
export const DetailFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

//時間
export const DetailTime = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const DetailLabel = styled.div`
  color: ${({ theme }) => theme.colors.neutral[600]};
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const DetailSign = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
`;

export const DetailValue = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-align: right;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const DetailImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const DetailImg = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 80px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailAddress = styled.div`
  color: ${({ theme }) => theme.colors.neutral[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: underline;
  letter-spacing: 0.05em;
`;

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
`;

// 方案標題
export const PlanTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 卡片內標題
export const PageTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 卡片內副標題
export const PageSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.neutral[400]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// 方案內容
export const PlanContent = styled.div`
  color: ${({ theme }) => theme.colors.neutral[400]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 重量輸入框
export const WeightInput = styled.input`
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.primary.main};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: border-color 0.2s ease;
  line-height: normal;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral[400]};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    vertical-align: middle;
  }
`;

// 按鈕容器
export const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  margin-top: auto;
`;

// 按鈕
export const Button = styled.button<{
  disabled?: boolean;
  $isCancel?: boolean;
}>`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:first-child {
    background-color: ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.neutral[600]};
    flex: 1;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? props.theme.colors.gray[200] : props.theme.colors.gray[300]};
    }
  }

  &:last-child {
    background-color: ${(props) =>
      props.$isCancel ? props.theme.colors.gray[200] : props.theme.colors.neutral[600]};
    color: ${(props) =>
      props.$isCancel ? props.theme.colors.neutral[600] : props.theme.colors.gray[0]};
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled
          ? props.$isCancel
            ? props.theme.colors.gray[300]
            : props.theme.colors.gray[700]
          : props.$isCancel
            ? props.theme.colors.gray[400]
            : props.theme.colors.gray[800]};
    }
  }
`;

// ===拍照上傳 大容器===
export const PhotoUploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

// ===照片 容器===
export const PhotoUploadBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const PlusIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const UploadText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral[500]};
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const CameraPreview = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const CameraContainer = styled.div`
  width: 100%;
  height: 75vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.text.black};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CameraVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const CameraButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text.black};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.background.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  cursor: pointer;
  z-index: 1001;
`;

// 刪除按鈕
export const DeleteButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.5;

  &:hover {
    opacity: 0.7;
  }
`;

export const ReportButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.disabled};
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  padding: 8px 0;
  margin-top: 8px;
  width: 100%;
  text-align: left;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.error};
    font-size: 18px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ReportModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  padding: ${({ theme }) => theme.spacing.lg};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-out;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const ReportModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ReportSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ReportSectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ReportOption = styled.div<{ $selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ $selected, theme }) =>
    $selected ? theme.colors.primary.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background.secondary : theme.colors.white};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  resize: vertical;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ReportButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ReportSubmitButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const ReportCancelButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  color: ${({ theme }) => theme.colors.text.tertiary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[300]};
  }
`;

// ==異常回報 標題==
export const ReportBlockTitle = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding-right: var(--spacing-xl);
`;

// ==異常回報 內容容器==
export const ReportBlock = styled.button`
  background-color: var(--color-background-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: var(--spacing-sm) var(--spacing-md);
  margin-top: var(--spacing-sm);
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: var(--color-background-error);
    opacity: 0.9;
  }
`;

export const ReportContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// 異常回報 內容
export const ReportBlockContent = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
`;

// 異常回報 編輯按鈕
export const EditIcon = styled.div`
  color: var(--color-error);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 異常回報 其他問題
export const ReportBlockDescription = styled.div`
  color: var(--color-text-tertiary);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: var(--spacing-md) 0;
  font-size: var(--font-size-xs);
  
`;

// 完成收運按鈕
export const CompleteButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]};
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.neutral[300] : theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  margin-top: ${({ theme }) => theme.spacing.sm};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
`;

// 完成收運按鈕圖示
export const CompleteIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin-top: 1px;
`;

export const ValidationMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
