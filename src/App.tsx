import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

import ProtectedRoute from './layouts/ProtectedRoute';
import CustomerLayout from './layouts/CustomerLayout';
import DeliverLayout from './layouts/DeliverLayout';

// 顧客(customer) 頁面組件

// 外送員(deliver) 頁面組件
import Task from './pages/deliver/Task';
import TaskDetails from './pages/deliver/Task/Details';
import TaskRecord from './pages/deliver/Task/Record';
import Calendar from './pages/deliver/Calendar';

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
// const Task = () => <div>任務清單</div>;
const ScanOrder = () => <div>掃描訂單</div>;
// const Settlement = () => <div>行事曆</div>;
const ReportBackend = () => <div>回報後台</div>;

function App() {
  // 用戶角色類型
  type UserRole = 'customer' | 'deliver';

  // 假設這是從認證系統獲取的用戶角色
  // const userRole: UserRole = 'customer';
  const userRole: UserRole = 'deliver';

  // 導航路徑選擇函數
  const getRedirectPath = (role: UserRole): string => {
    return role === 'customer' ? '/customer' : '/deliver';
  };

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
            <Route path="calendar" element={<Calendar />} />
            <Route path="report" element={<ReportBackend />} />
          </Route>

          {/* 訂單詳情頁面 - 獨立路由，不使用 DeliverLayout */}
          <Route
            path="/deliver/task/:taskId"
            element={
              <ProtectedRoute role="deliver">
                <TaskDetails />
              </ProtectedRoute>
            }
          />

          {/* 任務記錄頁面 */}
          <Route
            path="/deliver/task/:taskId/record"
            element={
              <ProtectedRoute role="deliver">
                <TaskRecord />
              </ProtectedRoute>
            }
          />

          {/* 重新導向和404路由 */}
          <Route
            path="/"
            element={<Navigate to={getRedirectPath(userRole)} replace />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
