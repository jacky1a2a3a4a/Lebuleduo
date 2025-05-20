import styled from 'styled-components';

export const StatusTagContainer = styled.div<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case '異常':
        return theme.colors.error;
      case '已排定':
        return theme.colors.tertiary.main;
      case '前往中':
        return theme.colors.blue[700];
      case '已抵達':
        return theme.colors.green[200];
      case '未排定':
        return theme.colors.white;
      case '已完成':
        return theme.colors.neutral[200];
    }
  }};
  border: 1px solid
    ${({ $status, theme }) => {
      switch ($status) {
        case '未排定':
          return theme.colors.secondary.main;
        case '已完成':
          return theme.colors.neutral[400];
        default:
          return 'none';
      }
    }};
`;

export const StatusTagText = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case '異常':
        return theme.colors.white;
      case '已排定':
        return theme.colors.text.primary;
      case '前往中':
        return theme.colors.white;
      case '已抵達':
        return theme.colors.text.primary;
      case '未排定':
        return theme.colors.secondary.main;
      case '已完成':
        return theme.colors.text.tertiary;
    }
  }};
`;
