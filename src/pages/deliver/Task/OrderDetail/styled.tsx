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
  padding: 0 var(--spacing-md);
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
  aspect-ratio: 3/4;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius);
  }
`;

export const DetailAddress = styled.div`
  color: var(--color-neutral-500);
  font-size: var(--font-size-xs);
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

// 方案內容
export const PlanContent = styled.div`
  color: var(--color-neutral-400);
  font-size: var(--font-size-sm);
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

export const PageContent = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-xs);
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
export const PhotoContainer = styled.div`
  color: var(--color-text-tertiary);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
`;

// ===照片 容器===
export const PhotoBox = styled.div`
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  aspect-ratio: 3/4;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

// ===異常回報區塊===
export const ReportBlock = styled.div`
  background-color: var(--color-background-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-md);
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

// 異常回報區塊 內容容器
export const ReportContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

// 異常回報區塊 標題
export const ReportBlockTitle = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding-right: var(--spacing-xl);
`;

// 異常回報區塊 內容
export const ReportBlockContent = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
`;

// 異常回報區塊 描述
export const ReportBlockDescription = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
`;
