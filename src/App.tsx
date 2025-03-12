import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles.js';
import AppLayout from './ui/AppLayout.jsx';

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
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="home" />} />

            <Route path="home" element={<Home />} />
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
    </>
  );
}

export default App;
