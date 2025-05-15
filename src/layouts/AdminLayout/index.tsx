import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  MdAssignment,
  MdDescription,
  MdPerson,
  MdLocalShipping,
  MdSettings,
} from 'react-icons/md';
import {
  Container,
  Sidebar,
  SidebarHeader,
  NavItems,
  NavItem,
  MainContent,
} from './styled';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === '/admin' || location.pathname.includes(path);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>Lebu-leduo</SidebarHeader>
        <NavItems>
          <NavItem>
            <MdDescription size={13} />
            <span>訂單管理</span>
          </NavItem>
          <NavItem $active={isActive('')} onClick={() => navigate('/admin')}>
            <MdAssignment size={13} />
            <span>任務發派</span>
          </NavItem>
          <NavItem>
            <MdPerson size={13} />
            <span>用戶管理</span>
          </NavItem>
          <NavItem>
            <MdLocalShipping size={13} />
            <span>代收員管理</span>
          </NavItem>
          <NavItem>
            <MdSettings size={13} />
            <span>系統設定</span>
          </NavItem>
        </NavItems>
      </Sidebar>
      <MainContent $assignmentPanelOpen={false}>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default AdminLayout;
