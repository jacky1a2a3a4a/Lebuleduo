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

// 卡片內內容
export const PageContent = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-top: var(--spacing-xs);
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
