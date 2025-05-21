import styled from 'styled-components';

export const TabContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} 0 ${theme.spacing.md}`};

  position: sticky;
  top: 0;
  z-index: 1;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.tertiary.main : theme.colors.neutral[200]};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.tertiary};
  border: ${({ $active, theme }) =>
    $active ? 'none' : `1px solid ${theme.colors.neutral[300]}`};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  padding: 8px 16px;

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.typography.fontWeights.bold : theme.typography.fontWeights.normal};
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
