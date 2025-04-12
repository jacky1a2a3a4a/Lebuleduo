import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';

//頁面 排版
import ProtectedRoute from './layouts/ProtectedRoute';
import CustomerLayout from './layouts/CustomerLayout';
import DeliverLayout from './layouts/DeliverLayout';

//line登入 頁面組件
import LineLogin from './pages/auth/LineLogin/index';
import LineCallback from './pages/auth/LineCallback/index';

// 顧客(customer) 頁面組件
import MyOrder from './pages/customer/MyOrder';
import OrderDetail from './pages/customer/OrderDetail';
import Plan from './pages/customer/Plan';
import Subscribe from './pages/customer/Subscribe';
import SubscribeData from './pages/customer/SubscribeData';
import SubscribeCheckout from './pages/customer/SubscribeCheckout';
import SubscribeSuccess from './pages/customer/SubscribeSuccess';

// 外送員(deliver) 頁面組件
import Task from './pages/deliver/Task';
import OrderDetails from './pages/deliver/Task/OrderDetails';
import OrderInProcess from './pages/deliver/Task/OrderInProcess';
import ScanOrder from './pages/deliver/ScanOrder';
import Calendar from './pages/deliver/Calendar';

//// 臨時頁面組件
// line登入 頁面組件
// const Register = () => <div>註冊頁面</div>;
// const Login = () => <div>登入頁面</div>;

// 顧客(customer) 頁面組件
// const MyOrder = () => <div>我的訂單</div>;
// const Subscribe = () => <div>開始訂閱</div>;
// const CheckoutPlan = () => <div>結帳計劃頁面</div>;
// const CheckoutUserData = () => <div>使用者數據頁面</div>;
// const CheckoutPayment = () => <div>支付頁面</div>;
// const CheckoutSuccess = () => <div>支付成功頁面</div>;
const Account = () => <div>帳戶頁面</div>;
const ContactUs = () => <div>聯絡我們</div>;
const PageNotFound = () => <div>404 - 頁面未找到</div>;

// 送貨員(DOG)頁面組件
// const Task = () => <div>任務清單</div>;
// const ScanOrder = () => <div>掃描訂單</div>;
// const Settlement = () => <div>行事曆</div>;
const ReportBackend = () => <div>回報後台</div>;

// 當獲取官方提供的參數後，重定向到我們指定的line callback頁面
const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查 URL 是否包含 LINE 授權碼
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    console.log('code', code);
    console.log('state', state);

    if (code && state) {
      // 直接重定向到回調處理路由
      navigate('/auth/line/callback', { replace: true });
    }
  }, []);

  return (
    <Routes>
      {/* 根路徑重定向到 auth 登入頁面 */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* 登入/註冊 */}
      <Route path="/auth">
        <Route index element={<Navigate to="/auth/line-login" replace />} />
        <Route path="line-login" element={<LineLogin />} />
        <Route path="line/callback" element={<LineCallback />} />
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
        {/* 首頁 */}
        <Route index element={<Navigate to="/customer/my-order" replace />} />
        <Route path="my-order" element={<MyOrder />} />
        <Route path="Plan" element={<Plan />} />
        <Route path="account" element={<Account />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>

      {/* 查看訂單詳情 - 獨立路由，不使用 CustomerLayout */}
      <Route
        path="/customer/order-detail/:orderId"
        element={
          <ProtectedRoute role="customer">
            <OrderDetail />
          </ProtectedRoute>
        }
      />

      {/* 訂閱方案詳情 - 獨立路由，不使用 CustomerLayout */}
      <Route
        path="/customer/subscribe"
        element={
          <ProtectedRoute role="customer">
            <Subscribe />
          </ProtectedRoute>
        }
      />

      {/* 訂閱資料填寫 - 獨立路由，不使用 CustomerLayout */}
      <Route
        path="/customer/subscribe-data"
        element={
          <ProtectedRoute role="customer">
            <SubscribeData />
          </ProtectedRoute>
        }
      />

      {/* 訂閱結帳 - 獨立路由，不使用 CustomerLayout */}
      <Route
        path="/customer/Subscribe-checkout"
        element={
          <ProtectedRoute role="customer">
            <SubscribeCheckout />
          </ProtectedRoute>
        }
      />

      {/* 訂閱成功 - 獨立路由，不使用 CustomerLayout */}
      <Route path="/customer/SubscribeSuccess" element={<SubscribeSuccess />} />

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
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      {/* 訂單處理頁面 - 獨立路由，不使用 DeliverLayout */}
      <Route
        path="/deliver/task/:taskId/process-order"
        element={
          <ProtectedRoute role="deliver">
            <OrderInProcess />
          </ProtectedRoute>
        }
      />

      {/* 404路由 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
