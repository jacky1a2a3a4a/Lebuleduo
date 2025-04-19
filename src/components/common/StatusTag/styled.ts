import styled from 'styled-components';

export const StatusTagContainer = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-round);
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'pending':
        return 'var(--color-warning)';
      case 'completed':
        return 'var(--color-success)';
      case 'cancelled':
        return 'var(--color-error)';
      default:
        return 'var(--color-neutral-100)';
    }
  }};
  border: 2px solid var(--color-neutral-300);
`;

export const StatusTagText = styled.span<{ $status: string }>`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: ${({ $status }) => {
    switch ($status) {
      case 'pending':
        return 'var(--color-warning)';
      case 'completed':
        return 'var(--color-success)';
      case 'cancelled':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-primary)';
    }
  }};
`;
