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
  background-color: var(--color-primary);
  color: var(--color-white);
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
  padding: var(--spacing-md);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  border-bottom: 1px solid var(--color-white);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

export const NavItems = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 0 var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

export const NavItem = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? 'var(--color-primary-hover)' : 'transparent'};
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  font-size: var(--font-size-3xs);
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
