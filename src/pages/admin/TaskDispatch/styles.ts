import styled from 'styled-components';

// === 最外層 ===
export const Container = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  height: 100vh;
`;

// === 主內容容器 ===
export const MainContent = styled.div<{ $assignmentPanelOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  margin-right: ${(props) => (props.$assignmentPanelOpen ? '350px' : '0')};
  height: 100vh;
`;

// === 內容區域 ===
export const ContentWrapper = styled.div`
  height: 100%;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// === 內容區域 ===
export const Content = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// === 統計卡片區域 ===
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  flex: 1;
`;

// === 表格容器 最外層 ===
export const TableContainer = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  width: 100%;
  margin-top: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`;

// 表格標題
export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md) var(--spacing-md) 0;
  flex-shrink: 0;

  h1 {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
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
      gap: var(--spacing-sm);

      select,
      input {
        padding: var(--spacing-xs) var(--spacing-sm);
        border: 1px solid var(--color-neutral-300);
        border-radius: var(--border-radius-sm);
        background-color: var(--color-background-primary);
        font-size: var(--font-size-3xs);
        min-width: 80px;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }

      input {
        width: 150px;
        &::placeholder {
          color: var(--color-neutral-500);
        }
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    p {
      font-size: var(--font-size-3xs);
    }

    select {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--border-radius-sm);
      background-color: var(--color-background-primary);
      font-size: var(--font-size-3xs);

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }
  }
`;

export const Badge = styled.span<{ $variant?: 'default' | 'warning' }>`
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-3xs);
  background-color: ${(props) =>
    props.$variant === 'warning'
      ? 'var(--color-yellow-100)'
      : 'var(--color-neutral-200)'};
  color: ${(props) =>
    props.$variant === 'warning'
      ? 'var(--color-yellow-700)'
      : 'var(--color-text-primary)'};
`;
