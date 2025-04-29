import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: var(--spacing-md);
`;

export const ModalContent = styled.div`
  background: var(--color-background-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-xl);
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  position: relative;
  margin: auto;
  box-shadow: var(--shadow-lg);
`;

export const CloseButton = styled.button`
  position: fixed;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-background-primary);
  border: none;
  border-radius: var(--border-radius-round);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: var(--font-size-2xl);
  z-index: 1001;
  box-shadow: var(--btn-shadow);

  &:hover {
    box-shadow: var(--btn-shadow-hover);
  }
`;
