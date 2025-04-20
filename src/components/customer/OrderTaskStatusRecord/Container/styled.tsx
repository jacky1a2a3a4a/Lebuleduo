import styled from 'styled-components';

// ===最外層大容器===
export const StatusCard = styled.div<{ $isOverweight?: boolean }>`
  background-color: var(--color-white);
  border: ${(props) =>
    props.$isOverweight
      ? '2px solid var(--color-error)'
      : '1px solid var(--color-neutral-400)'};
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;
