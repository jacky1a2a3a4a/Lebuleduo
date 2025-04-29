import styled from 'styled-components';

export const TabContainer = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0 var(--spacing-md);

  position: sticky;
  top: 0;
  z-index: 1;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) =>
    $active ? 'var(--color-tertiary)' : 'var(--color-neutral-200)'};
  color: ${({ $active }) =>
    $active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)'};
  border: ${({ $active }) =>
    $active ? 'none' : '1px solid var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  padding: 8px 16px;

  font-size: var(--font-size-sm);
  font-weight: ${({ $active }) =>
    $active ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)'};
  text-align: center;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s ease;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
