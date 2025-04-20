import styled from 'styled-components';

interface StyledProps {
  $active?: boolean;
}

// 固定在頂部的進度指示器
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

// 步驟項目容器
export const StepItemContainer = styled.div`
  display: flex;
`;

// 步驟連接器
export const StepConnector = styled.div`
  flex: 1;
  position: relative;
  height: 2px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  z-index: 1;
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
  border-radius: var(--border-radius-round);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  z-index: 3;
  position: relative;
  font-size: var(--font-size-sm);
`;

// 步驟文字
export const StepText = styled.div<StyledProps>`
  color: ${(props) =>
    props.$active ? 'var(--color-white)' : 'var(--color-secondary)'};
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
  text-align: center;
`;
