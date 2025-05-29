import styled from 'styled-components';

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none'};

  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  padding: 5rem ${({ theme }) => theme.spacing.md};

  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  display: flex;
  align-items: center;

  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const IconStyle = styled.div`
  margin-right: ${({ theme }) => theme.spacing.sm};

  display: flex;
  align-items: center;
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondaryHover};
  }
`;

export const NotificationTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary.main};

  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const NotificationContent = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`; 