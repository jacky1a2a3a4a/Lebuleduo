import styled from 'styled-components';
import { StyledProps } from '../../../../pages/customer/Subscribe/types';

export const ButtonCardContainer = styled.div<StyledProps>`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary.main : theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};

  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};

  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.gray[0] : theme.colors.gray[100]};
  }
`;

export const ButtonCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ButtonCardTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const ButtonCardSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

export const ButtonCardIcon = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonCardRadio = styled.div<StyledProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary.main : theme.colors.secondary.main};
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary.main};
    display: ${({ $active }) => ($active ? 'block' : 'none')};
  }
`;
