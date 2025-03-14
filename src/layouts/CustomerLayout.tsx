import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import CustomerHeader from '../components/customer/layout/CustomerHeader';
import CustomerFooter from '../components/customer/layout/CustomerFooter';
import CustomerSideBar from '../components/customer/layout/CustomerSideBar';

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
  background-color: var(--color-gray-100);
`;

function CustomerLayout() {
  return (
    <AppLayoutStyled>
      <CustomerHeader />
      <CustomerSideBar />
      <Main>
        <Outlet />
      </Main>
      <CustomerFooter />
    </AppLayoutStyled>
  );
}

export default CustomerLayout;
