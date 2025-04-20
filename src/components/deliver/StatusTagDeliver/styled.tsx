import styled from 'styled-components';

const getStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (['異常', 'abnormal'].includes(normalizedStatus)) {
    return 'var(--color-error)';
  }
  if (['已排定', 'scheduled'].includes(normalizedStatus)) {
    return 'var(--color-tertiary)';
  }
  if (['前往中', 'ongoing'].includes(normalizedStatus)) {
    return '#1976D2';
  }
  if (['已抵達', 'arrived'].includes(normalizedStatus)) {
    return '#9DDACE';
  }
  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return 'var(--color-white)';
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return 'var(--color-neutral-200)';
  }
  return 'var(--color-white)';
};

const getStatusTextColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (['異常', 'abnormal'].includes(normalizedStatus)) {
    return 'var(--color-white)';
  }
  if (['已排定', 'scheduled'].includes(normalizedStatus)) {
    return 'var(--color-text-primary)';
  }
  if (['前往中', 'ongoing'].includes(normalizedStatus)) {
    return 'var(--color-white)';
  }
  if (['已抵達', 'arrived'].includes(normalizedStatus)) {
    return 'var(--color-text-primary)';
  }
  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return 'var(--color-secondary)';
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return 'var(--color-text-tertiary)';
  }
  return 'var(--color-text-primary)';
};

const getStatusBorderColor = (status: string) => {
  const normalizedStatus = status.toLowerCase();

  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return 'var(--color-secondary)';
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return 'var(--color-neutral-400)';
  }
  return 'none';
};

export const StatusTagContainer = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-round);
  background-color: ${({ $status }) => getStatusColor($status)};
  border: 1px solid ${({ $status }) => getStatusBorderColor($status)};
`;

export const StatusTagText = styled.span<{ $status: string }>`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: ${({ $status }) => getStatusTextColor($status)};
`;
