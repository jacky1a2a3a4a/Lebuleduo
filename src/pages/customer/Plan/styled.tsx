import styled from 'styled-components';

//訂閱方案 載入中訊息
export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

//訂閱方案 錯誤訊息
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: red;
`;

//訂閱方案 空訊息
export const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

//訂閱方案 最大外容器
export const PlanSectionStyled = styled.section`
  background-color: var(--color-gray-200);
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

//訂閱方案 容器
export const PlanContainer = styled.div`
  background-color: var(--color-gray-200);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

//方案介紹 最外層容器
export const PlanDescription = styled.div`
  background-color: var(--color-gray-200);
`;

//訂閱方案 方案介紹標題
export const PlanDescriptionTitle = styled.h2`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
`;

//訂閱方案 方案介紹內容
export const PlanDescriptionContent = styled.div`
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 方案介紹內容項目
export const ContentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

//訂閱方案 打勾icon
export const IconCheckedStyled = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-sm);
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
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 方案介紹內容項目副文字
export const ContentSubText = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
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
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin: var(--spacing-xs) 0;
`;

//訂閱方案 卡片價格
export const PlanCardPrice = styled.p`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//訂閱方案 卡片分隔線
export const Divider = styled.div`
  border-bottom: 1px solid var(--color-gray-200);
  width: 100%;
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
`;

//訂閱方案 卡片描述
export const PlanCardDescription = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  display: flex;
  flex-direction: column;
  margin-bottom: var(--spacing-md);
`;

//訂閱方案 卡片描述 項目
export const PlanCardDescriptionItem = styled.p`
  margin-bottom: var(--spacing-sm);
`;

//訂閱方案 卡片按鈕容器
export const PlanButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
`;

//訂閱方案 卡片按鈕
export const PlanButton = styled.button`
  background-color: var(--color-gray-300);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  width: 50%;
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
