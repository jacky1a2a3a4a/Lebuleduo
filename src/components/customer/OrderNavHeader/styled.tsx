import styled from 'styled-components';

export const NavHeader = styled.div`
  background-color: var(--color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

export const BackButton = styled.button`
  color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const PageTitle = styled.div`
  color: var(--color-white);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);
  margin: 0;
`;

export const OrderID = styled.div`
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.05em;
`;
