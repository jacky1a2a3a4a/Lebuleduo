import styled from 'styled-components';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { ActionButton } from '../../common/Header';

export const SubscribeButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.tertiary.main};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: ${({ theme }) => theme.spacing[20]};
  height: 30px;

  transition: all 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  line-height: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiary.hover};
    transform: translateY(-1px);
  }
`;

export const StyledPlusIcon = styled(MdOutlineAddShoppingCart)`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;
