import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.ts';

import DeliverHeader from '../components/deliver/Header';
import DeliverFooter from '../components/deliver/Footer';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: var(--mobile-min-width);
  height: 100vh;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
`;

const Main = styled.main`
  background-color: var(--color-gray-200);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

function DeliverLayout() {
  return (
    <>
      <GlobalStyles />
      <AppLayoutStyled>
        <DeliverHeader />
        <Main>
          <Outlet />
        </Main>
        <DeliverFooter />
      </AppLayoutStyled>
    </>
  );
}

export default DeliverLayout;
