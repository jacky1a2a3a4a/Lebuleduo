import styled from 'styled-components';

// === 最外層容器 ===
export const FullHeightContainer = styled.div`
  background-color: var(--color-white);
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
  top: 1px; // 微調垂直位置
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
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const DetailSign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin-right: var(--spacing-xs);
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
`;

export const DetailAddress = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: underline;
  letter-spacing: 0.05em;
`;

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

// 方案標題
export const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
`;

// 卡片內標題
export const PageTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`;

// 卡片內副標題
export const PageSubtitle = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-xs);
  font-weight: 500;
  margin-top: var(--spacing-xs);
`;
// 方案內容
export const PlanContent = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  font-weight: 500;
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
  background-color: var(--color-white);
  color: var(--color-primary);
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
    var(--spacing-md);
  margin-top: var(--spacing-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  transition: border-color 0.2s ease;
  line-height: normal; /* Add this to help with alignment */

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm); /* Match the input font size */
    vertical-align: middle; /* Help with vertical alignment */
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
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? 'var(--color-gray-200)' : 'var(--color-gray-300)'};
    }
  }

  &:last-child {
    background-color: ${(props) =>
      props.$isCancel ? 'var(--color-gray-200)' : 'var(--color-gray-600)'};
    color: ${(props) =>
      props.$isCancel ? 'var(--color-gray-600)' : 'var(--color-gray-0)'};
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

export const PhotoUploadContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  justify-content: center;
`;

export const PhotoUploadBox = styled.div`
  width: 120px;
  height: 160px;
  background-color: #f5f5f5;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
  }
`;

export const PlusIcon = styled.div`
  font-size: 24px;
  color: #8c8c8c;
  margin-bottom: 8px;
`;

export const UploadText = styled.div`
  font-size: 14px;
  color: #8c8c8c;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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
  background-color: #000;
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
  gap: 16px;
  margin-top: 16px;
`;

export const CameraButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;
