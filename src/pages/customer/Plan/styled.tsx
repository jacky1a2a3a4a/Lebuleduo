import styled from 'styled-components';

////訂閱方案 最大外容器
export const PlanSectionStyled = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//訂閱方案 容器
export const PlanContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.main};
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

//===方案介紹 最外層容器 ===
export const PlanDescription = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
`;

//訂閱方案 方案介紹內容
export const PlanDescriptionContent = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

//訂閱方案 方案介紹內容 文字容器
export const PlanDescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

//訂閱方案 方案介紹內容 圖片容器
export const PlanDescriptionImg = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  justify-self: end;
  align-self: end;

  width: 100%;
  max-width: 80px;
  height: 100%;

  padding-bottom: ${({ theme }) => theme.spacing[12]};
`;

//訂閱方案 方案介紹內容項目
export const ContentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

//訂閱方案 打勾icon
export const IconCheckedStyled = styled.div`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing['2xs']};

  width: 30px;
  height: 30px;

  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
`;

//訂閱方案 方案介紹內容項目文字容器
export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xs']};
`;

//訂閱方案 方案介紹內容項目主文字
export const ContentMainText = styled.p`
  color: ${({ theme }) => theme.colors.tertiary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

//訂閱方案 方案介紹內容項目副文字
export const ContentSubText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

//=== 卡片列表 ===
// 訂閱方案 卡片列表容器
export const PlanCardListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  margin-bottom: 0;
`;

//訂閱方案 卡片
export const PlanCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing.md};
`;

//訂閱方案 卡片標題容器
export const PlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//訂閱方案 卡片標題
export const PlanCardTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin: ${({ theme }) => theme.spacing['2xs']} 0;
`;

//訂閱方案 卡片價格
export const PlanCardPrice = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

//訂閱方案 卡片分隔線
export const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  width: 100%;
  margin: ${({ theme }) => theme.spacing[12]} 0 ${({ theme }) => theme.spacing.sm} 0;
`;

//訂閱方案 卡片描述
export const PlanCardDescription = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

//訂閱方案 卡片描述 項目
export const PlanCardDescriptionItem = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing['2xs']};
`;

////訂閱方案 卡片按鈕容器
export const PlanButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

//訂閱方案 卡片按鈕
export const PlanButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 35%;

  padding: ${({ theme }) => theme.spacing[12]} 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

//訂閱方案 卡片按鈕圖示
export const IconStyled = styled.div`
  width: ${({ theme }) => theme.spacing.md};
  height: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
`;
