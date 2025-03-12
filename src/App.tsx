import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <div>
      <h1>Hello World</h1>

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/" />} />

            <Route path="/" element={<Home />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="checkoutPlan" element={<CheckoutPlan />} />

            <Route path="checkoutUserData" element={<CheckoutUserData />} />
            <Route path="checkoutPayment" element={<CheckoutPayment />} />
            <Route path="checkoutSuccess" element={<CheckoutSuccess />} />

            <Route path="account" element={<Account />} />

            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
