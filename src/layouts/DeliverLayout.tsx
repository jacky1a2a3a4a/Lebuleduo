import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import DeliverHeader from '../components/deliver/Header';
import DeliverFooter from '../components/deliver/Footer';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: var(--mobile-min-width);
  height: 100vh;
  margin: 0 auto;
`;

const Main = styled.main`
  background-color: var(--color-gray-200);
  height: 100%;
  overflow: hidden;
`;

function DeliverLayout() {
  return (
    <AppLayoutStyled>
      <DeliverHeader />
      <Main>
        <Outlet />
      </Main>
      <DeliverFooter />
    </AppLayoutStyled>
  );
}

export default DeliverLayout;
