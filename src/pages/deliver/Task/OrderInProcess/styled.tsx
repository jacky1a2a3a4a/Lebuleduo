import styled from 'styled-components';

// 定義按鈕的 props 類型
type ButtonProps = {
  disabled?: boolean;
};

// 定義照片容器的 props 類型
type PhotoContainerProps = {
  hasPhotos: boolean;
};

// 最外層容器
export const FullHeightContainer = styled.div`
  background-color: var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-14);
`;

// 頁面標題容器
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
`;

export const PageTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 700;
`;

export const PageSubtitle = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-xs);
  font-weight: 500;
`;

// 訂單詳情卡片
export const DetailCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  padding: var(--spacing-md);
  margin-bottom: 1rem;
`;

// 訂單詳情容器
export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

export const DetailTime = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

export const DetailStatus = styled.div`
  background-color: var(--color-gray-300);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-xs);
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
`;

export const DetailSign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

export const DetailLabel = styled.div`
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const DetailValue = styled.div`
  font-weight: 600;
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
  margin-top: var(--spacing-sm);
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

// 重量輸入區域
export const WeightInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
`;

export const WeightInput = styled.input`
  padding: var(--spacing-sm);
  padding-left: var(--spacing-md);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: 400;
  height: 100%;

  &::placeholder {
    color: var(--color-gray-300);
  }
`;

// 照片拍攝區域
export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
`;

export const PhotoContainer = styled.div<PhotoContainerProps>`
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
  margin: ${({ hasPhotos }) => (hasPhotos ? '20px 0' : '20px 0 0 0')};
`;

export const PhotoBox = styled.div`
  background-color: var(--color-gray-200);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - var(--spacing-xs));
  aspect-ratio: 9/16;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  background-color: var(--color-gray-900);
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: var(--color-gray-0);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const PhotoButton = styled.button`
  background-color: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: var(--border-radius-round);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

export const PhotoButtonText = styled.div`
  color: var(--color-gray-700);
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
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
export const Button = styled.button<ButtonProps>`
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
    background-color: var(--color-gray-700);
    color: var(--color-gray-0);
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? 'var(--color-gray-700)' : 'var(--color-gray-800)'};
    }
  }
`;

// 相機容器
export const CameraContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-gray-900);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

export const CameraHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-gray-800);
`;

export const CameraTitle = styled.div`
  color: var(--color-gray-0);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

export const CameraCloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-0);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CameraView = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const CameraControls = styled.div`
  padding: var(--spacing-md);
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
`;

export const CameraButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const CameraButtonInner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  border: 2px solid var(--color-gray-700);
`;

export const ErrorText = styled.div`
  color: var(--color-red-600);
  opacity: 0.7;
  font-size: var(--font-size-xs);
  font-weight: 500;
  margin-top: var(--spacing-xs);
  margin-left: var(--spacing-sm);
`;

export const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
`;

export const PlanContent = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;
