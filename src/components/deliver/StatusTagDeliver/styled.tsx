import styled from 'styled-components';

const getStatusColor = (status: string, theme: any) => {
  const normalizedStatus = status.toLowerCase();

  if (['異常', 'abnormal'].includes(normalizedStatus)) {
    return theme.colors.error.main;
  }
  if (['已排定', 'scheduled'].includes(normalizedStatus)) {
    return theme.colors.tertiary.main;
  }
  if (['前往中', 'ongoing'].includes(normalizedStatus)) {
    return '#1976D2';
  }
  if (['已抵達', 'arrived'].includes(normalizedStatus)) {
    return '#9DDACE';
  }
  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return theme.colors.white;
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return theme.colors.neutral[200];
  }
  return theme.colors.white;
};

const getStatusTextColor = (status: string, theme: any) => {
  const normalizedStatus = status.toLowerCase();

  if (['異常', 'abnormal'].includes(normalizedStatus)) {
    return theme.colors.white;
  }
  if (['已排定', 'scheduled'].includes(normalizedStatus)) {
    return theme.colors.text.primary;
  }
  if (['前往中', 'ongoing'].includes(normalizedStatus)) {
    return theme.colors.white;
  }
  if (['已抵達', 'arrived'].includes(normalizedStatus)) {
    return theme.colors.text.primary;
  }
  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return theme.colors.secondary.main;
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return theme.colors.text.tertiary;
  }
  return theme.colors.text.primary;
};

const getStatusBorderColor = (status: string, theme: any) => {
  const normalizedStatus = status.toLowerCase();

  if (['未排定', 'unscheduled'].includes(normalizedStatus)) {
    return theme.colors.secondary.main;
  }
  if (['已完成', 'completed'].includes(normalizedStatus)) {
    return theme.colors.neutral[400];
  }
  return 'none';
};

export const StatusTagContainer = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ $status, theme }) => getStatusColor($status, theme)};
  border: 1px solid ${({ $status, theme }) => getStatusBorderColor($status, theme)};
`;

export const StatusTagText = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ $status, theme }) => getStatusTextColor($status, theme)};
`;
