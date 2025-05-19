import styled from 'styled-components';

//最外層大容器
export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};

  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
`;

//滾動 大容器
export const ScrollableContent = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//間隔
export const Spacer = styled.div`
  height: ${({ theme }) => theme.spacing.sm};
`;

//Section標題
export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};

  margin-bottom: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

//Section副標題
export const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};

  margin-bottom: ${({ theme }) => theme.spacing.md};

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

//Section容器
export const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  display: flex;
  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

//訂閱方案標題
export const SubscriptionTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

//訂閱方案資訊
export const SubscriptionInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xs']};

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

export const SubscriptionInfoItem = styled.div`
  display: flex;
  align-items: center;
`;

//分隔線
export const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

//訂閱日期資訊 大容器
export const SubscriptionDateInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

//收運資訊標題
export const DeliverTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

//訂閱日期資訊 子容器
export const SubscriptionDateInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xs']};

  &:last-child {
    border-left: 1px solid ${({ theme }) => theme.colors.gray[200]};
    padding-left: ${({ theme }) => theme.spacing.md};
  }
`;

//訂閱日期資訊 標題
export const DateTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

//訂閱日期資訊 日期
export const DateText = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const FixedPointImagesContainer = styled.div``;

export const FixedPointImagesTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

export const FixedPointImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.sm};
`;

export const FixedPointImage = styled.img`
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
