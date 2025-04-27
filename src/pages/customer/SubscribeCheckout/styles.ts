import styled from 'styled-components';

//最外層大容器
export const PageWrapper = styled.div`
  background-color: var(--color-background-secondary);

  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
`;

//滾動 大容器
export const ScrollableContent = styled.div`
  flex: 1;
  padding: var(--spacing-lg) var(--spacing-md);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//Section標題
export const SectionTitle = styled.h2`
  color: var(--color-text-primary);

  margin-bottom: var(--spacing-sm);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`;

//Section副標題
export const SectionSubtitle = styled.p`
  color: var(--color-text-tertiary);

  margin-bottom: var(--spacing-md);

  font-size: var(--font-size-sm);
`;

//Section容器
export const Section = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius-lg);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

//訂閱方案標題
export const SubscriptionTitle = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-sm);
`;

//訂閱方案資訊
export const SubscriptionInfo = styled.div`
  color: var(--color-text-tertiary);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  font-size: var(--font-size-xs);
`;

export const SubscriptionInfoItem = styled.div`
  display: flex;
  align-items: center;
`;

//分隔線
export const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-200);
  margin: var(--spacing-md) 0;
`;

//訂閱日期資訊 大容器
export const SubscriptionDateInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

//收運資訊標題
export const DeliverTitle = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-sm);
`;

//訂閱日期資訊 子容器
export const SubscriptionDateInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &:last-child {
    border-left: 1px solid var(--color-gray-200);
    padding-left: var(--spacing-md);
  }
`;

//訂閱日期資訊 標題
export const DateTitle = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
`;

//訂閱日期資訊 日期
export const DateText = styled.div`
  color: var(--color-primary);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export const FixedPointImagesContainer = styled.div``;

export const FixedPointImagesTitle = styled.div`
  margin-bottom: var(--spacing-xs);
`;

export const FixedPointImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);

  padding: var(--spacing-sm);
`;

export const FixedPointImage = styled.img`
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--border-radius-md);
`;
