import styled from 'styled-components';
import { useEffect } from 'react';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: var(--color-grey-100);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 9;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  padding: 6rem 2rem 2rem;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 8;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

const NavMenu = styled.nav`
  margin-top: 2rem;
`;

const MenuItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-600);
  }
`;

function Sidebar({ isOpen, setIsOpen }) {
  // 当侧边栏打开时，禁止body滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer isOpen={isOpen}>
        <NavMenu>
          <MenuItem>首页</MenuItem>
          <MenuItem>产品</MenuItem>
          <MenuItem>服务</MenuItem>
          <MenuItem>关于我们</MenuItem>
          <MenuItem>联系方式</MenuItem>
        </NavMenu>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
