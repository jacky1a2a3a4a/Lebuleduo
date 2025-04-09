import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import DeliverHeader from '../components/deliver/Header';
import DeliverFooter from '../components/deliver/Footer';

const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
`;

const Main = styled.main`
  background-color: var(--color-primary);
  padding: 0.5rem var(--spacing-14);
  height: 100%;
  overflow: hidden;
`;

/**
 * 外送員頁面佈局
 * 包含頁首、主內容區域和頁尾
 */
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
