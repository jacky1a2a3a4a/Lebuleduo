import { Outlet } from 'react-router-dom';

import DeliverHeader from '../../components/deliver/Header';
import DeliverFooter from '../../components/deliver/Footer';
import { AppLayoutStyled, Main } from './styled';

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
