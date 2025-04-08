import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/deliver/layout/Header/index';
import Footer from '../components/deliver/layout/Footer/index';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const Main = styled.main`
  background-color: var(--color-gray-100);
  padding: 0.5rem var(--spacing-14);
  height: 100%;
  overflow: hidden;
`;

function DeliverLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </AppLayoutStyled>
  );
}

export default DeliverLayout;
