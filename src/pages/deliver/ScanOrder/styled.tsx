import styled from 'styled-components';

// 最外層 大容器
export const ScanOrderSectionStyled = styled.section`
  background-color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100%;
`;

// 掃描器容器
export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 掃描文字
export const ScanText = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  line-height: 1;

  svg {
    display: flex;
    align-items: center;
    margin-bottom: -2px;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    line-height: 1;
  }
`;

// 狀態訊息
export const StatusMessage = styled.div`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  text-align: left;
  white-space: pre-line;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;
