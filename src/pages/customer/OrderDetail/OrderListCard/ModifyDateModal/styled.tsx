import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div`
  background-color: var(--color-gray-0);
  width: 100%;
  max-height: 90vh;
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  padding: var(--spacing-lg);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  margin-bottom: var(--spacing-lg);
`;

export const ModalTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  text-align: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

export const DateInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-gray-50);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
`;

export const DateLabel = styled.span`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

export const DateValue = styled.span`
  color: var(--color-gray-900);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export const NoticeText = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
  border-radius: var(--border-radius-md);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

export const Button = styled.button`
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const CancelButton = styled(Button)`
  background-color: var(--color-gray-200);
  color: var(--color-gray-700);

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--color-primary-600);
  color: var(--color-gray-0);

  &:hover {
    background-color: var(--color-primary-700);
  }

  &:disabled {
    background-color: var(--color-gray-300);
    color: var(--color-gray-500);
    cursor: not-allowed;
  }
`;
