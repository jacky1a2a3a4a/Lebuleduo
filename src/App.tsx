import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import ProtectedRoute from './layouts/ProtectedRoute';
import CustomerLayout from './layouts/CustomerLayout';
import DeliverLayout from './layouts/DeliverLayout';

// 臨時頁面組件
// 顧客(customer) 頁面組件
const Register = () => <div>註冊頁面</div>;
const Login = () => <div>登入頁面</div>;
const MyOrder = () => <div>我的訂單</div>;
const Subscribe = () => <div>開始訂閱</div>;
const CheckoutPlan = () => <div>結帳計劃頁面</div>;
const CheckoutUserData = () => <div>使用者數據頁面</div>;
const CheckoutPayment = () => <div>支付頁面</div>;
const CheckoutSuccess = () => <div>支付成功頁面</div>;
const Account = () => <div>帳戶頁面</div>;
const ContactUs = () => <div>聯絡我們</div>;
const PageNotFound = () => <div>404 - 頁面未找到</div>;

// 送貨員(DOG)頁面組件
const Task = () => <div>任務清單</div>;
const ScanOrder = () => <div>掃描訂單</div>;
const Settlement = () => <div>結算</div>;
const Report = () => <div>回報後台</div>;

function App() {
  // 用戶角色類型
  type UserRole = 'customer' | 'deliver';

  // 假設這是從認證系統獲取的用戶角色
  // const userRole: UserRole = 'customer';
  const userRole: UserRole = 'deliver'; 

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 登入/註冊 */}
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
            <Route index element={<MyOrder />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="checkout">
              <Route path="plan" element={<CheckoutPlan />} />
              <Route path="user-data" element={<CheckoutUserData />} />
              <Route path="payment" element={<CheckoutPayment />} />
              <Route path="success" element={<CheckoutSuccess />} />
            </Route>
            <Route path="account" element={<Account />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>

          {/* DOG路由 */}
          <Route
            path="/deliver"
            element={
              <ProtectedRoute role="deliver">
                <DeliverLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Task />} />
            <Route path="scan-order" element={<ScanOrder />} />
            <Route path="settlement" element={<Settlement />} />
            <Route path="report" element={<Report />} />
          </Route>

          {/* 重新導向和404路由 */}
          <Route
            path="/"
            element={
              <Navigate
                to={userRole === 'customer' ? '/customer' : '/deliver'}
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
