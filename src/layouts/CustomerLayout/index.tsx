//CustomerLayout 顧客頁面佈局
import { Outlet } from 'react-router-dom';

import CustomerHeader from '../../components/customer/Header';
import CustomerFooter from '../../components/customer/Footer';
import { AppLayoutStyled, Main } from './styled';

function CustomerLayout() {
  return (
    <AppLayoutStyled>
      <CustomerHeader />
      <Main>
        <Outlet />
      </Main>
      <CustomerFooter />
    </AppLayoutStyled>
  );
}

export default CustomerLayout;
