import styled from 'styled-components';

// === 最外層容器 ===
export const FullHeightContainer = styled.div`
  background-color: var(--color-background-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--mobile-min-width);
  min-height: 100vh;
  padding: var(--spacing-md);
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
  max-width: var(--mobile-min-width);

  margin: var(--spacing-sm) 0 var(--spacing-lg);
`;

// === 通用大標題文字 ===
export const Title = styled.div`
  color: var(--color-text-primary);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-xs);
`;

// 導航 文字容器
export const NavTitle = styled.div`
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
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
  margin-right: var(--spacing-xs);
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
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
`;

// === 通用容器卡片 ===
export const DetailCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);

  width: 100%;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);

  font-size: var(--font-size-sm);
`;

// 通用容器 卡片內容
export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
`;

// 通用容器 水平分散
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

// 通用容器 普通
export const DetailFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

//時間
export const DetailTime = styled.div`
  color: var(--color-text-primary);

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

export const DetailLabel = styled.div`
  color: var(--color-neutral-600);
  display: flex;
  align-items: center;
  font-weight: var(--font-weight-medium);
`;

export const DetailSign = styled.div`
  color: var(--color-text-primary);

  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-right: var(--spacing-xs);
  font-size: var(--font-size-xl);
`;

export const DetailValue = styled.div`
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  text-align: right;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-gray-300);
  margin: var(--spacing-md) 0;
`;

export const DetailImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  margin-top: var(--spacing-md);
`;

export const DetailImg = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
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
  color: var(--color-neutral-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: underline;
  letter-spacing: 0.05em;
`;

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

// 方案標題
export const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 卡片內標題
export const PageTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 卡片內副標題
export const PageSubtitle = styled.div`
  color: var(--color-neutral-400);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-xs);
`;

// 方案內容
export const PlanContent = styled.div`
  color: var(--color-neutral-400);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 錯誤訊息
export const ErrorMessage = styled.div`
  background-color: var(--color-gray-100);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 重量輸入框
export const WeightInput = styled.input`
  background-color: var(--color-background-primary);
  color: var(--color-primary);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
    var(--spacing-md);
  margin-top: var(--spacing-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  transition: border-color 0.2s ease;
  line-height: normal;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-neutral-400);
    font-size: var(--font-size-sm);
    vertical-align: middle;
  }
`;

// 按鈕容器
export const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  margin-top: auto;
`;

// 按鈕
export const Button = styled.button<{
  disabled?: boolean;
  $isCancel?: boolean;
}>`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: var(--font-weight-medium);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-neutral-600);
    flex: 1;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? 'var(--color-gray-200)' : 'var(--color-gray-300)'};
    }
  }

  &:last-child {
    background-color: ${(props) =>
      props.$isCancel ? 'var(--color-gray-200)' : 'var(--color-neutral-600)'};
    color: ${(props) =>
      props.$isCancel ? 'var(--color-neutral-600)' : 'var(--color-gray-0)'};
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled
          ? props.$isCancel
            ? 'var(--color-gray-300)'
            : 'var(--color-gray-700)'
          : props.$isCancel
            ? 'var(--color-gray-400)'
            : 'var(--color-gray-800)'};
    }
  }
`;

// ===拍照上傳 大容器===
export const PhotoUploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

// ===照片 容器===
export const PhotoUploadBox = styled.div`
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
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
  color: var(--color-neutral-500);
  margin-bottom: var(--spacing-sm);
`;

export const UploadText = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
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
  background-color: var(--color-text-black);
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
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`;

export const CameraButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius-round);
  background-color: var(--color-background-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-2xl);
  color: var(--color-text-black);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background: none;
  border: none;
  color: var(--color-background-primary);
  font-size: var(--font-size-2xl);
  cursor: pointer;
  z-index: 1001;
`;

// 刪除按鈕
export const DeleteButton = styled.button`
  background: var(--color-white);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-round);

  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
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
  color: var(--color-text-disabled);
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
    color: var(--color-error);
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
  background: var(--color-white);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: var(--spacing-lg);
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-out;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
`;

export const ReportModalTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
`;

export const ReportSection = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const ReportSectionTitle = styled.h4`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`;

export const ReportOption = styled.div<{ $selected: boolean }>`
  padding: var(--spacing-md);
  border: 1px solid
    ${({ $selected }) =>
      $selected ? 'var(--color-primary)' : 'var(--color-neutral-300)'};
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-sm);
  cursor: pointer;
  background-color: ${({ $selected }) =>
    $selected ? 'var(--color-background-secondary)' : 'var(--color-white)'};
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

export const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: var(--spacing-md);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-md);
  resize: vertical;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

export const ReportButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

export const ReportSubmitButton = styled.button`
  flex: 1;
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const ReportCancelButton = styled.button`
  flex: 1;
  padding: var(--spacing-md);
  background-color: var(--color-neutral-200);
  color: var(--color-text-tertiary);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

export const ReportBlock = styled.button`
  background-color: var(--color-background-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-md);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--spacing-md);
  margin-top: var(--spacing-sm);
  width: 100%;
  text-align: left;
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
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ReportBlockTitle = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding-right: var(--spacing-xl);
`;

export const ReportBlockContent = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
`;

export const ReportBlockDescription = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
`;

export const EditIcon = styled.div`
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-error);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 完成收運按鈕
export const CompleteButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  padding: var(--spacing-12);
  background-color: ${({ $disabled }) =>
    $disabled ? 'var(--color-neutral-300)' : 'var(--color-primary)'};
  color: var(--color-white);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  margin-top: var(--spacing-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  line-height: 1;
`;

// 完成收運按鈕圖示
export const CompleteIcon = styled.div`
  font-size: var(--font-size-md);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  margin-top: 1px;
`;

export const ValidationMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
`;
