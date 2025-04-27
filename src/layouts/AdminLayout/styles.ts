import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  width: 175px;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  border-bottom: 1px solid var(--color-primary-hover);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

export const NavItem = styled.div<{ active?: boolean }>`
  padding: var(--spacing-12) var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? 'var(--color-primary-hover)' : 'transparent'};
  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const MainContent = styled.main<{ assignmentPanelOpen: boolean }>`
  flex: 1;
  padding: 1.5rem;
  background-color: #fff;
`;
