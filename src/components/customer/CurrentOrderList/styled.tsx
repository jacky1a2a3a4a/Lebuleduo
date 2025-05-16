import styled from 'styled-components';

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const OrderCard = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-neutral-400);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  padding: var(--spacing-12);
  border-radius: var(--border-radius-lg);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-gray-300);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  &:active {
    background-color: var(--color-gray-50);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px) scale(0.98);
  }
`; 