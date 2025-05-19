import styled from 'styled-components';

export const NavHeader = styled.div`
  background-color: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--mobile-min-width);
  padding: 16px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  color: var(--color-text-primary);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);

  svg {
    margin-top: 2px;
  }
`;

export const PageTitle = styled.div``;

export const OrderID = styled.div`
  color: var(--color-neutral-500);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
`;
