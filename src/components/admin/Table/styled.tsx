import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  overflow: hidden; /* 容器本身不滾動 */
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  table-layout: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const StyledThead = styled.thead`
  background: ${({ theme }) => theme.colors.neutral[100]};
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: table;
  table-layout: fixed;

  tr {
    th {
      padding: ${({ theme }) => theme.spacing.sm};
      font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
      font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
      color: ${({ theme }) => theme.colors.neutral[700]};
      text-align: center;
      border-bottom: 2px solid ${({ theme }) => theme.colors.neutral[200]};
      white-space: nowrap;

      &:first-child {
        padding-left: ${({ theme }) => theme.spacing.lg};
      }

      &:last-child {
        padding-right: ${({ theme }) => theme.spacing.lg};
      }
    }
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-color: ${({ theme }) => theme.colors.primary.main};

      &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: 0;
        width: 4px;
        height: 7px;
        border: solid ${({ theme }) => theme.colors.white};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(68, 93, 179, 0.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.neutral[100]};
    }
  }
`;

export const StyledTbody = styled.tbody`
  max-height: calc(100vh - 260px);
  overflow-y: auto;
  display: block;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-300) var(--color-neutral-100);
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-neutral-100);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-neutral-300);
    border-radius: 3px;
    transition: background 0.2s ease;

    &:hover {
      background: var(--color-neutral-400);
    }
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-neutral-50);
    }

    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;

export const StyledTd = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  color: ${({ theme }) => theme.colors.neutral[600]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  &:first-child {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  &:last-child {
    padding-right: ${({ theme }) => theme.spacing.lg};
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
      background-color: ${({ theme }) => theme.colors.neutral[50]};
    }

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary.main};
      border-color: ${({ theme }) => theme.colors.primary.main};

      &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: 0;
        width: 4px;
        height: 7px;
        border: solid ${({ theme }) => theme.colors.white};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(68, 93, 179, 0.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.neutral[100]};
    }
  }
`;

export const ViewDetailsButton = styled.button`
  color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.xs};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};
  }
`;
