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
  NavItem,
  MainContent,
} from './styles';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === '/admin' || location.pathname.includes(path);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <MdAssignment size={20} />
          Lebu-leduo
        </SidebarHeader>
        <nav>
          <NavItem>
            <MdDescription size={18} />
            <span>訂單管理</span>
          </NavItem>
          <NavItem active={isActive('')} onClick={() => navigate('/admin')}>
            <MdAssignment size={18} />
            <span>任務發派</span>
          </NavItem>
          <NavItem>
            <MdPerson size={18} />
            <span>用戶管理</span>
          </NavItem>
          <NavItem>
            <MdLocalShipping size={18} />
            <span>代收員管理</span>
          </NavItem>
          <NavItem>
            <MdSettings size={18} />
            <span>系統設定</span>
          </NavItem>
        </nav>
      </Sidebar>
      <MainContent assignmentPanelOpen={false}>
        <Outlet />
      </MainContent>
    </Container>
  );
};

export default AdminLayout;
