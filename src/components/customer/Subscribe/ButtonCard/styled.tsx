import styled from 'styled-components';
import { StyledProps } from '../../../../pages/customer/Subscribe/types';

export const ButtonCardContainer = styled.div<StyledProps>`
  background-color: var(--color-gray-0);
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-secondary)'};
  border-radius: var(--border-radius-xl);

  display: flex;
  align-items: center;
  padding: var(--spacing-md);

  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? 'var(--color-gray-0)' : 'var(--color-gray-100)'};
  }
`;

export const ButtonCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonCardTitle = styled.div`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
`;

export const ButtonCardSubtitle = styled.div`
  color: var(--color-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
`;

export const ButtonCardIcon = styled.div`
  margin-left: var(--spacing-md);
  font-size: var(--font-size-lg);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonCardRadio = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${({ $active }) =>
      $active ? 'var(--color-secondary)' : 'var(--color-secondary)'};
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--color-gray-600);
    display: ${({ $active }) => ($active ? 'block' : 'none')};
  }
`;
