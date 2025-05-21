import styled, { DefaultTheme } from 'styled-components';

// 為styled-components定義類型
export type StyledProps = {
  $active?: boolean;
  $light?: boolean;
  $open?: boolean;
};

// 容器樣式
export const Container = styled.div`
  position: relative;
  width: 100%;
`;

// 狀態訊息
export const StatusMessageItem = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.gray[400]};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

// 輸入框群組
export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

// 帶有圖標的輸入框
export const StyledInputWithIcon = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-right: 40px; /* 為圖標預留空間 */
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.red[500] : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  &:focus {
    outline: 1px solid
      ${({ theme, $error }) =>
        $error ? theme.colors.red[500] : theme.colors.gray[400]};
    outline-offset: 0px;
  }
`;

// 下拉選單圖標
export const InputIcon = styled.div<StyledProps>`
  color: ${({ theme }) => theme.colors.gray[500]};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  cursor: pointer;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center center;
  transition: transform 0.2s ease-in-out;
`;

// 建議下拉選單
export const SuggestionsDropdown = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: 4px;
  z-index: 100;
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
`;

// 建議地址
export const SuggestionItem = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

// 建議文字
export const SuggestionText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// google地圖
export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
`; 