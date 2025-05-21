import styled from 'styled-components';

// ===最外層大容器===
export const StatusCard = styled.div<{ $isOverweight?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({ theme, $isOverweight }) =>
    $isOverweight
      ? `2px solid ${theme.colors.error.main}`
      : `1px solid ${theme.colors.neutral[400]}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
