import styled from 'styled-components';
import { useEffect } from 'react';

// 側邊欄容器主體
const SidebarContainer = styled.div`
  background-color: var(--color-gray-100);
  box-shadow: ${({ isOpen }) =>
    isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none'};

  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  padding: 6rem 2rem 2rem;

  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

// 灰色遮色片
const SidebarOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  border-bottom: 1px solid var(--color-gray-200);
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-600);
  }
`;

//從Header傳入isOpen和setIsOpen
function CustomerSideBar({ isOpen, setIsOpen }) {
  // 當側邊欄打開時，禁止body滾動
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
          <MenuItem>首頁</MenuItem>
          <MenuItem>服務</MenuItem>
          <MenuItem>關於我們</MenuItem>
          <MenuItem>聯絡方式</MenuItem>
        </NavMenu>
      </SidebarContainer>
    </>
  );
}

export default CustomerSideBar;
