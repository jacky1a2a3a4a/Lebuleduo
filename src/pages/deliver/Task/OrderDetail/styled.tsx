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
`;

// === 導航 大容器 ===
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: var(--mobile-min-width);

  margin: var(--spacing-sm) 0;
`;

// === 導航 文字容器 ===
export const PageTitle = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  transition: opacity 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

//  導航 圖示
export const IconStyled = styled.div`
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 導航 副標題
export const PageSubtitle = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
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

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
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

export const ErrorMessage = styled.div`
  background-color: var(--color-gray-100);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
