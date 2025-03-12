import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;

  @media (min-width: 403px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-100);
`;

function AppLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppLayoutStyled>
  );
}

export default AppLayout;
