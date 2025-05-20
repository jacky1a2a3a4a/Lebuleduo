import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1400px;
  min-height: 100vh;
  margin: 0 auto;
  padding-left: 110px;
`;

export const Sidebar = styled.div`
  width: 110px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`;

export const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const NavItem = styled.div<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.hover : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    line-height: 1;
  }
`;

export const MainContent = styled.main<{ $assignmentPanelOpen: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
