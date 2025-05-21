import styled from 'styled-components';

// ===提醒 容器===
export const Notification = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

// ===提醒 文字===
export const NotificationText = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;
