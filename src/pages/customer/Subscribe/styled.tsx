import styled from 'styled-components';
import { StyledProps } from './types';

// 載入訊息
export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: var(--font-size-md);
  color: var(--color-gray-500);
`;

//// 整個頁面的容器
export const PageWrapper = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 480px;
  margin: 0 auto;
`;

//// 固定在頂部的進度指示器
export const FixedStepsContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-primary);
  padding: var(--spacing-lg) 0 var(--spacing-md) 0;
`;

// 步驟包裝器
export const StepWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 80%;
  margin: 0 auto;
`;

// 步驟連接器
export const StepConnector = styled.div`
  flex: 1;
  position: relative;
  height: 2px;
  display: flex;
  align-items: center;
  margin-top: 12px; /* 調整連接器位置，使其與步驟號碼中心對齊 */
  z-index: 1; /* 確保連接線不被遮住 */
`;

// 步驟連接線
export const StepLine = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-white)' : 'var(--color-secondary)'};
  border-radius: var(--border-radius-round);
  height: 2px;
  width: 70px;
`;

// 步驟項目
export const StepItem = styled.div<StyledProps>`
  background-color: transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 2;
  min-width: 50px;

  white-space: nowrap;
`;

// 步驟號碼
export const StepNumber = styled.div<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-white)' : 'var(--color-secondary)'};
  color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-white)'};
  border-radius: 50%;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);

  z-index: 3; /* 確保數字在連接線上方 */
  position: relative; /* 添加相對定位 */
  font-size: var(--font-size-sm);
  line-height: 1; //重置行高，才能完全置中
`;

// 步驟文字
export const StepText = styled.div<StyledProps>`
  color: ${(props) =>
    props.$active ? 'var(--color-white)' : 'var(--color-secondary)'};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-align: center;
`;

// 可滾動的內容區域
export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 區段標題 模板
export const SectionTitle = styled.div`
  margin-bottom: var(--spacing-sm);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 區段主標題 模板
export const SectionMainTitle = styled.h2`
  color: var(--color-text-primary);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  margin-bottom: var(--spacing-xs);
`;

// 區段副標題 模板
export const SectionSubtitle = styled.p`
  color: var(--color-text-tertiary);

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
`;

// 已選定方案 最大容器
export const PlanSelector = styled.div`
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

// 已選定方案 頭部
export const PlanSelectorHeader = styled.div<StyledProps>`
  background-color: var(--color-gray-100);
  border: 2px solid var(--color-secondary);
  border-radius: ${(props) =>
    props.$open
      ? 'var(--border-radius-lg) var(--border-radius-lg) 0 0'
      : 'var(--border-radius-lg)'};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-200);
  }
`;

// 方案信息
export const PlanInfo = styled.div`
  flex: 1;
`;

// 下拉圖標
export const DropdownIcon = styled.div`
  font-size: var(--font-size-lg);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 方案下拉菜單
export const PlanDropdown = styled.div`
  border: 1px solid var(--color-secondary);
  border-top: none;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  overflow: hidden;
`;

// 方案選項
export const PlanOption = styled.div<StyledProps>`
  padding: var(--spacing-md);
  background-color: ${(props) =>
    props.$active ? 'var(--color-gray-200)' : 'var(--color-gray-0)'};
  cursor: pointer;
  border-bottom: 1px solid var(--color-secondary);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-gray-200)' : 'var(--color-gray-100)'};
  }
`;

// 方案選項標題
export const PlanOptionTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-xs) 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 方案選項主標題
export const PlanOptionMainTitle = styled.div`
  color: var(--color-text-tertiary);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
`;

// 方案選項副標題
export const PlanOptionSubtitle = styled.div`
  color: var(--color-secondary);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

// 方案標題
export const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 0 var(--spacing-xs) 0;
`;

// 預定期程 大容器
export const FrequencyOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

// 預定期程 選項
export const FrequencyOption = styled.div<StyledProps>`
  background-color: var(--color-gray-0);
  border: 1px solid
    ${(props) =>
      props.$active ? 'var(--color-secondary)' : 'var(--color-secondary)'};
  border-radius: var(--border-radius-xl);

  display: flex;
  align-items: center;
  padding: var(--spacing-md);

  position: relative;
  cursor: pointer;
`;

// 預定期程 按鈕
export const RadioButton = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$active ? 'var(--color-secondary)' : 'var(--color-secondary)'};
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-gray-600);
    display: ${(props) => (props.$active ? 'block' : 'none')};
  }
`;

// 預定期程 文字容器
export const FrequencyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 預定期程 文字
export const FrequencyText = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 預定期程 子文字
export const FrequencySubtext = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-400);
`;

// 預定期程 折扣標籤
export const DiscountTag = styled.span`
  color: var(--color-white);
  background-color: var(--color-secondary);
  border-radius: var(--border-radius-sm);

  position: absolute;
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-xs);
`;

//// 每周收運日 大容器
export const WeekdaysContainer = styled.div<StyledProps>`
  background-color: var(--color-white);
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-secondary)'};
  border-radius: var(--border-radius-lg);
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) =>
    props.$error ? 'var(--spacing-xs)' : 'var(--spacing-lg)'};
  padding: var(--spacing-md);
`;

// 每周收運日 按鈕
export const WeekdayButton = styled.button<StyledProps>`
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-neutral-200)'};
  color: ${(props) =>
    props.$active ? 'var(--color-white)' : 'var(--color-text-secondary)'};
  border: 1px solid var(--color-secondary);
  border-radius: 50%;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-sm);

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? 'var(--color-primary-hover)'
        : 'var(--color-neutral-300)'};
  }
`;

//// 日期選擇器 大容器
export const DatePickerContainer = styled.div`
  margin-bottom: var(--spacing-md);
`;

// 日期輸入
export const DateInput = styled.input`
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
`;

//// 總計價格與下一步 大容器
export const BottomInfoContainer = styled.div`
  background-color: var(--color-white);
  border-top: 1px solid var(--color-secondary);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: var(--spacing-md);
`;

//// 總計價格 最外容器
export const TotalPrice = styled.div`
  font-weight: var(--font-weight-bold);

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: var(--spacing-md);
`;

// 總計價格 文字
export const TotalPriceText = styled.div`
  font-size: var(--font-size-sm);
  line-height: 1;
  margin-right: var(--spacing-md);
`;

// 價格容器
export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 價格折扣容器
export const PriceDetails = styled.div`
  display: flex;
  align-items: center;
`;

// 總計價格 數字
export const TotalPriceTCount = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
`;

// 原始價格（有刪除線）
export const OriginalPriceText = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-decoration: line-through;

  margin-right: var(--spacing-xs);
`;

// 折扣金額
export const DiscountText = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-red-500);
`;

// 下一步按鈕
export const NextButton = styled.button<StyledProps>`
  width: 100%;
  padding: var(--spacing-sm);
  background-color: ${(props) =>
    props.$active ? 'var(--color-primary)' : 'var(--color-text-disabled)'};
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-md);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? 'var(--color-gray-600)' : 'var(--color-gray-300)'};
  }
`;

// 錯誤提示
export const ErrorMessage = styled.div`
  color: var(--color-red-500);
  font-size: var(--font-size-xs);
  margin-bottom: var(--spacing-lg);
  padding-left: var(--spacing-sm);
`;
