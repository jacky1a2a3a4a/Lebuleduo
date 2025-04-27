import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  height: 100vh;
`;

export const MainContent = styled.div<{ $assignmentPanelOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  margin-right: ${(props) => (props.$assignmentPanelOpen ? '350px' : '0')};
`;

export const Content = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-shrink: 0;
`;

export const TableContainer = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  overflow: auto;
  flex: 1;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);

  .header-left {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    h1 {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
    }

    .filters {
      display: flex;
      gap: var(--spacing-sm);

      select,
      input {
        padding: var(--spacing-xs) var(--spacing-sm);
        border: 1px solid var(--color-neutral-300);
        border-radius: var(--border-radius-sm);
        background-color: var(--color-background-primary);
        font-size: var(--font-size-xs);
        min-width: 120px;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }

      input {
        width: 200px;
        &::placeholder {
          color: var(--color-neutral-500);
        }
      }
    }
  }

  .header-right {
    select {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--border-radius-sm);
      background-color: var(--color-background-primary);
      font-size: var(--font-size-xs);

      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: var(--spacing-12) var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-neutral-200);
  }
  th {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  tr:last-child td {
    border-bottom: none;
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
