import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--color-background-secondary);
`;

export const MainContent = styled.div<{ $assignmentPanelOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  margin-right: ${(props) => (props.$assignmentPanelOpen ? '350px' : '0')};
`;

export const Header = styled.header`
  background-color: var(--color-background-primary);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.div`
  position: relative;
  width: 300px;
  input {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-xs) var(--spacing-xs)
      var(--spacing-xl);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--border-radius-md);
  }
  svg {
    position: absolute;
    left: var(--spacing-12);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-500);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  .avatar {
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    border-radius: var(--border-radius-round);
    background-color: var(--color-neutral-300);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-neutral-600);
  }
`;

export const Content = styled.div`
  padding: var(--spacing-md);
  flex: 1;
  overflow: auto;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  h1 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }
  .date-picker {
    margin-left: var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    input {
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--border-radius-md);
      padding: var(--spacing-xs);
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
`;

export const StatCard = styled.div`
  background-color: var(--color-background-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  .title {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-500);
    margin-bottom: var(--spacing-xs);
  }
  .content {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    .icon {
      background-color: var(--color-indigo-100);
      color: var(--color-primary);
      padding: var(--spacing-xs);
      border-radius: var(--border-radius-sm);
    }
    .numbers {
      .value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
      }
      .subtitle {
        font-size: var(--font-size-xs);
        color: var(--color-neutral-500);
      }
    }
  }
`;

export const TableContainer = styled.div`
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  overflow: hidden;
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
  font-size: var(--font-size-xs);
  background-color: ${(props) =>
    props.$variant === 'warning'
      ? 'var(--color-yellow-100)'
      : 'var(--color-neutral-200)'};
  color: ${(props) =>
    props.$variant === 'warning'
      ? 'var(--color-yellow-700)'
      : 'var(--color-text-primary)'};
`;

export const AssignmentPanel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 350px;
  background-color: var(--color-background-primary);
  box-shadow: var(--shadow-md);
  border-left: 1px solid var(--color-neutral-200);
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

export const PanelHeader = styled.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-neutral-200);
  h2 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--spacing-xs);
  }
  p {
    font-size: var(--font-size-sm);
    color: var(--color-neutral-500);
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: var(--spacing-md);
`;

export const CollectorCard = styled.div`
  background-color: var(--color-background-secondary);
  padding: var(--spacing-12);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    p:first-child {
      font-weight: var(--font-weight-medium);
    }
    p:last-child {
      font-size: var(--font-size-sm);
      color: var(--color-neutral-500);
    }
  }
  .controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    button {
      width: var(--spacing-xl);
      height: var(--spacing-xl);
      border-radius: var(--border-radius-round);
      border: 1px solid var(--color-neutral-300);
      background-color: var(--color-background-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    input {
      width: 4rem;
      height: var(--spacing-xl);
      text-align: center;
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--border-radius-md);
    }
  }
`;

export const PanelFooter = styled.div`
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-xs);
  button {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    &:first-child {
      border: 1px solid var(--color-neutral-300);
      background-color: var(--color-background-primary);
    }
    &:last-child {
      background-color: var(--color-primary);
      color: var(--color-white);
      border: none;
      &:hover {
        background-color: var(--color-primary-hover);
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;
