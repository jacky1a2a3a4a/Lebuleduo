import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  max-height: calc(100vh - 50px);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  table-layout: fixed;
`;

export const StyledThead = styled.thead`
  background: var(--color-neutral-100);
  position: sticky;
  top: 0;
  z-index: 1;

  tr {
    th {
      padding: var(--spacing-sm);
      font-size: var(--font-size-3xs);
      font-weight: 600;
      color: var(--color-neutral-700);
      text-align: center;
      border-bottom: 2px solid var(--color-neutral-200);
      white-space: nowrap;

      &:first-child {
        padding-left: var(--spacing-lg);
      }

      &:last-child {
        padding-right: var(--spacing-lg);
      }
    }
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 2px solid var(--color-neutral-300);
    border-radius: 3px;
    background-color: var(--color-white);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: var(--color-primary);
      background-color: var(--color-neutral-50);
    }

    &:checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);

      &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: 0;
        width: 4px;
        height: 7px;
        border: solid var(--color-white);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-neutral-100);
    }
  }
`;

export const StyledTbody = styled.tbody`
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-300) var(--color-neutral-100);

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
  padding: var(--spacing-sm);
  font-size: var(--font-size-3xs);
  color: var(--color-neutral-600);
  border-bottom: 1px solid var(--color-neutral-200);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  &:first-child {
    padding-left: var(--spacing-lg);
  }

  &:last-child {
    padding-right: var(--spacing-lg);
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border: 2px solid var(--color-neutral-300);
    border-radius: 3px;
    background-color: var(--color-white);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: var(--color-primary);
      background-color: var(--color-neutral-50);
    }

    &:checked {
      background-color: var(--color-primary);
      border-color: var(--color-primary);

      &::after {
        content: '';
        position: absolute;
        left: 3px;
        top: 0;
        width: 4px;
        height: 7px;
        border: solid var(--color-white);
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--color-neutral-100);
    }
  }
`;

export const ViewDetailsButton = styled.button`
  color: var(--color-primary);
  padding: var(--spacing-2xs) var(--spacing-xs);
  background: none;
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-3xs);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;
