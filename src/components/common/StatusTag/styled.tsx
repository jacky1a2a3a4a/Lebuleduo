import styled from 'styled-components';

export const StatusTagContainer = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-round);
  background-color: ${({ $status }) => {
    switch ($status) {
      case '異常':
        return 'var(--color-error)';
        case '已排定':
        return 'var(--color-tertiary)';
      case '前往中':
        return '#1976D2';
      case '已抵達':
        return '#9DDACE';
      case '未排定':
        return 'var(--color-white)';
      case '已完成':
        return 'var(--color-neutral-200)';
    }
  }};
  border: 1px solid
    ${({ $status }) => {
      switch ($status) {
        case '未排定':
          return 'var(--color-secondary)';
        case '已完成':
          return 'var(--color-neutral-400)';
        default:
          return 'none';
      }
    }};
`;

export const StatusTagText = styled.span<{ $status: string }>`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: ${({ $status }) => {
    switch ($status) {
      case '異常':
        return 'var(--color-white)';
      case '已排定':
        return 'var(--color-text-primary)';
      case '前往中':
        return 'var(--color-white)';
      case '已抵達':
        return 'var(--color-text-primary)';
      case '未排定':
        return 'var(--color-secondary)';
      case '已完成':
        return 'var(--color-text-tertiary)';
    }
  }};
`;
