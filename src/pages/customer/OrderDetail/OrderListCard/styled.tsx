import styled from 'styled-components';

// OrderListCard 相關樣式
export const OrderListCardContainer = styled.div<{
  $isActive: boolean;
  $isAbnormal?: boolean;
}>`
  background-color: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? 'var(--color-error)'
      : $isActive
        ? 'var(--color-white)'
        : 'var(--color-neutral-200)'};
  border: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? '1px solid var(--color-error-hover)'
      : $isActive
        ? '1px solid var(--color-secondary)'
        : 'none'};
  border-radius: var(--border-radius-lg);
  box-shadow: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal || $isActive ? 'var(--card-shadow)' : 'none'};
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
`;

export const CardItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const DateDisplay = styled.div`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

export const TimeRange = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

export const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--spacing-sm);
`;

export const StatusText = styled.div<{
  $isActive: boolean;
  $isAbnormal?: boolean;
}>`
  color: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? 'var(--color-error-hover)'
      : $isActive
        ? 'var(--color-primary)'
        : 'var(--color-neutral-500)'};
  border: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? '1px solid var(--color-error-hover)'
      : $isActive
        ? '1px solid var(--color-primary)'
        : '1px solid var(--color-neutral-500)'};
  border-radius: var(--border-radius-round);

  padding: var(--spacing-xs) var(--spacing-sm);

  font-size: var(--font-size-sm);
  font-weight: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal || $isActive
      ? 'var(--font-weight-medium)'
      : 'var(--font-weight-normal)'};
`;

export const ActionButton = styled.button<{
  $isActive: boolean;
  $isAbnormal?: boolean;
}>`
  background-color: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? 'var(--color-error-hover)'
      : $isActive
        ? 'var(--color-primary)'
        : 'var(--color-white)'};
  color: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? 'var(--color-white)'
      : $isActive
        ? 'var(--color-white)'
        : 'var(--color-primary)'};
  border: ${({ $isActive, $isAbnormal }) =>
    $isAbnormal
      ? 'none'
      : $isActive
        ? 'none'
        : '1px solid var(--color-primary)'};
  border-radius: var(--border-radius-round);
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $isAbnormal }) =>
      $isAbnormal ? 'var(--color-error)' : 'var(--color-gray-300)'};
    color: var(--color-gray-800);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    font-size: var(--font-size-md);
  }
`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: var(--spacing-xs);

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const IconStyledLarge = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  margin-right: var(--spacing-xs);

  svg { 
    width: 20px;
    height: 20px;
  }
`;

export const ErrorText = styled.div`
  color: var(--color-error-600);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  padding: 0 var(--spacing-md);
`;
