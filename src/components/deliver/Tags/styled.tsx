import styled from 'styled-components';

type CategoryPositionProps = {
  $topPosition: number;
};

type CategoryTabProps = {
  $isActive?: boolean;
};

export const TaskCategoryWrapper = styled.div<CategoryPositionProps>`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

  width: 100%;
  max-width: var(--mobile-min-width);
  padding: var(--spacing-md) 0;
  transition: top 0.3s ease;
`;

export const TaskCategoryContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 0.75rem;

  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    padding-right: 2rem;
  }
`;

export const CategoryTab = styled.button<CategoryTabProps>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-tertiary)' : 'var(--color-white)'};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  border: ${({ $isActive }) =>
    $isActive ? 'none' : '1px solid var(--color-neutral-300)'};
  border-radius: var(--border-radius-round);

  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: ${({ $isActive }) =>
    $isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'};
  white-space: nowrap;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? 'var(--color-tertiary-hover)'
        : 'var(--color-gray-100)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;
