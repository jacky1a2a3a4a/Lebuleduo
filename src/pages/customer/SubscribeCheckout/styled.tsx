import styled from 'styled-components';

interface StyledProps {
  $active?: boolean;
  $light?: boolean;
  $open?: boolean;
  $error?: boolean;
  selected?: boolean;
}

export const Container = styled.div`
  padding: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

export const Section = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
`;

export const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-md);
`;

export const SubscriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius-md);
`;

export const PaymentMethod = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const PaymentMethodItem = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border: 1px solid
    ${(props) =>
      props.selected ? 'var(--color-primary)' : 'var(--color-gray-200)'};
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;
