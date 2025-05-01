import styled from 'styled-components';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { ActionButton } from '../../common/Header';

export const SubscribeButton = styled(ActionButton)`
  background-color: var(--color-tertiary);
  color: var(--color-text-primary);
  border-radius: var(--border-radius-round);

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: var(--spacing-md);
  height: 30px;

  transition: all 0.2s ease-in-out;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1;

  &:hover {
    background-color: var(--color-tertiary-hover);
    transform: translateY(-1px);
  }
`;

export const StyledPlusIcon = styled(MdOutlineAddShoppingCart)`
  font-size: var(--font-size-md);
  display: flex;
  align-items: center;
  margin-right: var(--spacing-xs);
`;
