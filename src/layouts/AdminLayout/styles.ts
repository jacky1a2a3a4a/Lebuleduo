import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1400px;
  min-height: 100vh;

  margin: 0 auto;
`;

export const Sidebar = styled.div`
  width: 140px;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarHeader = styled.div`
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  border-bottom: 1px solid var(--color-white);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

export const NavItems = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: var(--spacing-md);
`;

export const NavItem = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? 'var(--color-primary-hover)' : 'transparent'};
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  font-size: var(--font-size-xs);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:active {
    background-color: var(--color-primary-hover);
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  span {
    line-height: 1;
  }
`;

export const MainContent = styled.main<{ assignmentPanelOpen: boolean }>`
  background-color: var(--color-white);
  flex: 1;
`;
