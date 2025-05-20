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
  padding: ${({ theme }) => theme.spacing.md};
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  position: relative;
  margin: auto;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const CloseButton = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.background.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  z-index: 1001;
  box-shadow: ${({ theme }) => theme.shadows.button};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.buttonHover};
  }
`;
