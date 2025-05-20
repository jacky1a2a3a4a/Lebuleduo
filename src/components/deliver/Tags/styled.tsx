import styled from 'styled-components';

type CategoryPositionProps = {
  $topPosition: number;
};

type CategoryTabProps = {
  $isActive?: boolean;
};

export const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;

  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  transition: top 0.3s ease;
`;

export const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    padding-right: ${({ theme }) => theme.spacing.md};
  }
`;

export const CategoryTab = styled.button<CategoryTabProps>`
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.tertiary.main : theme.colors.white};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text.primary : theme.colors.text.secondary};
  border: ${({ $isActive, theme }) =>
    $isActive ? 'none' : `1px solid ${theme.colors.neutral[300]}`};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.typography.fontWeights.medium : theme.typography.fontWeights.normal};
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.colors.tertiary.hover
        : theme.colors.gray[100]};
  }

  &:active {
    transform: scale(0.98);
  }
`;
