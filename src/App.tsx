import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import ProtectedRoute from './layouts/ProtectedRoute';
import CustomerLayout from './layouts/CustomerLayout';
import DelivererLayout from './layouts/DelivererLayout';

// 临时页面组件
const Home = () => <div>首页</div>;
const Subscribe = () => <div>订阅页面</div>;
const CheckoutPlan = () => <div>结账计划页面</div>;
const CheckoutUserData = () => <div>用户数据页面</div>;
const CheckoutPayment = () => <div>支付页面</div>;
const CheckoutSuccess = () => <div>支付成功页面</div>;
const Account = () => <div>账户页面</div>;
const Register = () => <div>注册页面</div>;
const Login = () => <div>登录页面</div>;
const PageNotFound = () => <div>404 - 页面未找到</div>;

function App() {
  // 假設這是從認證系統獲取的用戶角色
  const userRole = 'customer'; // 或 "deliverer"

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 公共路由 */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* 顧客路由 */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout">
              <Route path="plan" element={<CheckoutPlan />} />
              <Route path="user-data" element={<CheckoutUserData />} />
              <Route path="payment" element={<CheckoutPayment />} />
              <Route path="success" element={<CheckoutSuccess />} />
            </Route>
          </Route>

          {/* DOG路由 */}
          <Route
            path="/deliverer"
            element={
              <ProtectedRoute role="deliverer">
                <DelivererLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* 重定向和404路由 */}
          <Route
            path="/"
            element={
              <Navigate
                to={userRole === 'customer' ? '/customer' : '/deliverer'}
                replace
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
