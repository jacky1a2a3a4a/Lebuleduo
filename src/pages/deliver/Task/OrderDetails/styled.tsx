import styled from 'styled-components';

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

// 地圖容器
export const MapContainer = styled.div`
  width: 100%;
  height: 100px;
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
export const Button = styled.button<{ disabled?: boolean; isCancel?: boolean }>`
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
      props.isCancel ? 'var(--color-gray-200)' : 'var(--color-gray-600)'};
    color: ${(props) =>
      props.isCancel ? 'var(--color-gray-600)' : 'var(--color-gray-0)'};
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled
          ? props.isCancel
            ? 'var(--color-gray-300)'
            : 'var(--color-gray-700)'
          : props.isCancel
            ? 'var(--color-gray-400)'
            : 'var(--color-gray-800)'};
    }
  }
`;
