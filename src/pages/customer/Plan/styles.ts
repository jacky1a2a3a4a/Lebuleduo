import styled from 'styled-components';

////訂閱方案 最大外容器
export const PlanSectionStyled = styled.section`
  background-color: var(--color-background);
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//訂閱方案 容器
export const PlanContainer = styled.div`
  background-color: var(--color-primary);
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

//===方案介紹 最外層容器 ===
export const PlanDescription = styled.div`
  margin: var(--spacing-sm) var(--spacing-lg);
`;

//訂閱方案 方案介紹內容
export const PlanDescriptionContent = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  font-weight: var(--font-weight-medium);
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

  padding-bottom: var(--spacing-12);
`;

//訂閱方案 方案介紹內容項目
export const ContentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

//訂閱方案 打勾icon
export const IconCheckedStyled = styled.div`
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-xs);

  width: 30px;
  height: 30px;

  font-size: var(--font-size-2xl);
`;

//訂閱方案 方案介紹內容項目文字容器
export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

//訂閱方案 方案介紹內容項目主文字
export const ContentMainText = styled.p`
  color: var(--color-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 方案介紹內容項目副文字
export const ContentSubText = styled.p`
  color: var(--color-white);
  font-size: var(--font-size-2xs);
  font-weight: var(--font-weight-normal);
`;

//=== 卡片列表 ===
// 訂閱方案 卡片列表容器
export const PlanCardListContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-md);
  margin-bottom: 0;
`;

//訂閱方案 卡片
export const PlanCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--card-shadow);
  width: 100%;
  padding: var(--spacing-12) var(--spacing-md);
`;

//訂閱方案 卡片標題容器
export const PlanCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//訂閱方案 卡片標題
export const PlanCardTitle = styled.h2`
  color: var(--color-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin: var(--spacing-xs) 0;
`;

//訂閱方案 卡片價格
export const PlanCardPrice = styled.p`
  color: var(--color-text-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 卡片分隔線
export const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-200);
  width: 100%;
  margin: var(--spacing-12) 0 var(--spacing-sm) 0;
`;

//訂閱方案 卡片描述
export const PlanCardDescription = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
`;

//訂閱方案 卡片描述 項目
export const PlanCardDescriptionItem = styled.p`
  margin-bottom: var(--spacing-xs);
`;

////訂閱方案 卡片按鈕容器
export const PlanButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
`;

//訂閱方案 卡片按鈕
export const PlanButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 35%;

  padding: var(--spacing-12) 0;

  &:hover {
    background-color: var(--color-gray-400);
  }
`;

//訂閱方案 卡片按鈕圖示
export const IconStyled = styled.div`
  width: var(--spacing-md);
  height: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
`;
