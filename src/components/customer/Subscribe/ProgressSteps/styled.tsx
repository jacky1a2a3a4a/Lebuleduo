import styled from 'styled-components';

interface StyledProps {
  $active?: boolean;
}

// 固定在頂部的進度指示器
export const FixedStepsContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md} 0;
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
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.secondary.main};
  border-radius: ${({ theme }) => theme.borderRadius.round};
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
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.secondary.main};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  z-index: 3;
  position: relative;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// 步驟文字
export const StepText = styled.div<StyledProps>`
  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.secondary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
  text-align: center;
`;
