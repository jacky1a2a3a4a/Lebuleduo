import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../components/deliver/layout/Footer/index';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-gray-100);
  padding: 1rem;
`;

function DeliverLayout() {
  return (
    <AppLayoutStyled>
      {/* 未來可以添加 DeliverHeader 和 DeliverSideBar */}
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppLayoutStyled>
  );
}

export default DeliverLayout;
