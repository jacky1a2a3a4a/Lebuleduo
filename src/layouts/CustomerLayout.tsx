//CustomerLayout 顧客頁面佈局
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles.ts';

import CustomerHeader from '../components/customer/Header';
import CustomerFooter from '../components/customer/Footer';

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

function CustomerLayout() {
  return (
    <>
      <GlobalStyles />
      <AppLayoutStyled>
        <CustomerHeader />
        <Main>
          <Outlet />
        </Main>
        <CustomerFooter />
      </AppLayoutStyled>
    </>
  );
}

export default CustomerLayout;
