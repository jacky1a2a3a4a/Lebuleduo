import styled from 'styled-components';

// === 最外層 ===
export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  height: 100vh;
`;

// === 主內容容器 ===
export const MainContent = styled.div<{ $assignmentPanelOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  margin-right: ${(props) => (props.$assignmentPanelOpen ? '300px' : '0')};
  height: 100vh;
`;

// === 內容區域 ===
export const ContentWrapper = styled.div`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.md}`};
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

// === 內容區域 ===
export const Content = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// === 統計卡片區域 ===
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  margin: ${({ theme }) => `${theme.spacing.sm} 0`};
`;

// === 表格容器 最外層 ===
export const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  min-height: 0;
`;

// 表格標題
export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} 0`};
  flex-shrink: 0;

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .header-left {
    display: flex;

    .filters {
      display: flex;
      gap: ${({ theme }) => theme.spacing.sm};

      select,
      input {
        padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
        border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        background-color: ${({ theme }) => theme.colors.background.primary};
        font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
        min-width: 80px;

        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.colors.primary.main};
        }
      }

      input {
        width: 150px;
        &::placeholder {
          color: ${({ theme }) => theme.colors.neutral[500]};
        }
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    p {
      font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
    }

    select {
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      background-color: ${({ theme }) => theme.colors.background.primary};
      font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }
`;
