//CustomerLayout 顧客頁面佈局
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';

import CustomerHeader from '../components/customer/Header';
import CustomerFooter from '../components/customer/Footer';

const Wrapper = styled.div`
  background-color: white;
`;

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  width: 402px;
  margin: 0 auto;
`;

const Main = styled.main`
  background-color: var(--color-gray-200);
  padding: 0.5rem var(--spacing-14);
  height: 100%;
  overflow: hidden;
`;

function CustomerLayout() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <AppLayoutStyled>
          <CustomerHeader />
          <Main>
            <Outlet />
          </Main>
          <CustomerFooter />
        </AppLayoutStyled>
      </Wrapper>
    </>
  );
}

export default CustomerLayout;
