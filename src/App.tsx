import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { routes } from './routes';

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
import OrderDetailCompleted from './pages/customer/OrderDetailCompleted';
import Plan from './pages/customer/Plan';
import Subscribe from './pages/customer/Subscribe';
import SubscribeData from './pages/customer/SubscribeData';
import SubscribeCheckout from './pages/customer/SubscribeCheckout';
import SubscribeSuccess from './pages/customer/SubscribeSuccess';
import OrderEdit from './pages/customer/OrderEdit';
import AbnormalTask from './pages/customer/OrderTaskStatus/AbnormalTask';
import ScheduledTask from './pages/customer/OrderTaskStatus/ScheduledTask';
import UnScheduledTask from './pages/customer/OrderTaskStatus/unScheduledTask';
import FinishedTask from './pages/customer/OrderTaskStatus/FinishedTask';
import LoadingMessage from './components/common/LoadingMessage';
import CompletedAbnormalTask from './pages/customer/OrderTaskStatus/CompletedAbnormalTask';
import CompletedFinishedTask from './pages/customer/OrderTaskStatus/CompletedFinishedTask';

// 外送員(deliver) 頁面組件
import Task from './pages/deliver/Task';
import OrderDetailDeliver from './pages/deliver/Task/OrderDetail';
// import OrderInProcess from './pages/deliver/Task/_OrderInProcess';
import ScanOrder from './pages/deliver/ScanOrder';
import ProcessOrder from './pages/deliver/ProcessOrder';
import Calendar from './pages/deliver/Calendar';
import MockQRGenerator from './pages/deliver/MockQRGenerator';

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
// const Account = () => <div>帳戶頁面</div>;
const ContactUs = () => <div>聯絡我們</div>;
const PageNotFound = () => <div>404 - 頁面未找到</div>;

// 送貨員(DOG)頁面組件
// const Task = () => <div>任務清單</div>;
// const ScanOrder = () => <div>掃描訂單</div>;
// const Settlement = () => <div>行事曆</div>;
// const ReportBackend = () => <div>回報後台</div>;

// 當獲取官方提供的參數後，重定向到我們指定的line callback頁面
const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 檢查 URL 是否包含 LINE 授權碼
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      // 直接重定向到回調處理路由
      navigate('/auth/line/callback', { replace: true });
    }
  }, []);

  const renderRoutes = (routes) => {
    return routes.map((route) => (
      <Route
        key={route.path || 'index'}
        path={route.path}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
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
