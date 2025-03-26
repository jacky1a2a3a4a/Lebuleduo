//CustomerLayout 顧客頁面佈局
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/customer/layout/Header/index';
import Footer from '../components/customer/layout/Footer/index';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-gray-100);
`;

function CustomerLayout() {
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

export default CustomerLayout;
