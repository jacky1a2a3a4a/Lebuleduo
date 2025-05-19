import { RouteConfig } from './types';

import ProtectedRoute from '../layouts/ProtectedRoute'; //保護路由
import CustomerLayout from '../layouts/CustomerLayout'; //顧客頁面佈局

//顧客頁面組件
import MyOrder from '../pages/customer/MyOrder'; //首頁
import Plan from '../pages/customer/Plan'; //訂閱方案
import OrderDetail from '../pages/customer/OrderDetail'; //方案詳情
import OrderDetailCompleted from '../pages/customer/OrderDetailCompleted'; //已完成方案詳情
import OrderEdit from '../pages/customer/OrderEdit'; //訂單編輯
import Subscribe from '../pages/customer/Subscribe'; //訂閱
import SubscribeData from '../pages/customer/SubscribeData'; //訂閱資料
import SubscribeCheckout from '../pages/customer/SubscribeCheckout'; //訂閱結帳
import SubscribeSuccess from '../pages/customer/SubscribeSuccess'; //訂閱成功
import AbnormalTask from '../pages/customer/OrderTaskStatus/AbnormalTask'; //異常訂單
import ScheduledTask from '../pages/customer/OrderTaskStatus/ScheduledTask'; //已排定訂單
import UnScheduledTask from '../pages/customer/OrderTaskStatus/unScheduledTask'; //未排定訂單
import FinishedTask from '../pages/customer/OrderTaskStatus/FinishedTask'; //已完成訂單

import CompletedAbnormalTask from '../pages/customer/OrderTaskStatus/CompletedAbnormalTask'; //已完成異常訂單
import CompletedFinishedTask from '../pages/customer/OrderTaskStatus/CompletedFinishedTask'; //已完成訂單

import AnimationLoading from '../components/common/AnimationLoading'; //載入中

//臨時頁面
import ContactUs from '../pages/customer/ContactUs'; //聯絡我們

export const customerRoutes: RouteConfig[] = [
  {
    path: '/customer',
    element: (
      <ProtectedRoute role="customer">
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <MyOrder /> },
      { path: 'my-order', element: <MyOrder /> },
      { path: 'Plan', element: <Plan /> },
      { path: 'account', element: <AnimationLoading /> },
      { path: 'contact-us', element: <ContactUs /> },
    ],
  },
  {
    path: '/customer/order-detail/current/:orderId', //方案詳情
    element: (
      <ProtectedRoute role="customer">
        <OrderDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order-detail/completed/:orderId', //已完成方案詳情
    element: (
      <ProtectedRoute role="customer">
        <OrderDetailCompleted />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order/:orderId/edit', //訂單編輯
    element: (
      <ProtectedRoute role="customer">
        <OrderEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/subscribe', //訂閱
    element: (
      <ProtectedRoute role="customer">
        <Subscribe />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/subscribe-data', //訂閱資料
    element: (
      <ProtectedRoute role="customer">
        <SubscribeData />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/subscribe-checkout', //訂閱結帳
    element: (
      <ProtectedRoute role="customer">
        <SubscribeCheckout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/subscribe-success', //訂閱成功
    element: (
      <ProtectedRoute role="customer">
        <SubscribeSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order-task/abnormal-task/:orderId/:orderDetailId', //異常訂單
    element: (
      <ProtectedRoute role="customer">
        <AbnormalTask />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/completed-order/order-task/abnormal-task/:orderId/:orderDetailId', //已完成異常訂單
    element: (
      <ProtectedRoute role="customer">
        <CompletedAbnormalTask />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order-task/scheduled-task/:orderId/:orderDetailId', //已排定訂單
    element: (
      <ProtectedRoute role="customer">
        <ScheduledTask />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order-task/unscheduled-task/:orderId/:orderDetailId', //未排定訂單
    element: (
      <ProtectedRoute role="customer">
        <UnScheduledTask />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/order-task/finished-task/:orderId/:orderDetailId', //已完成訂單
    element: (
      <ProtectedRoute role="customer">
        <FinishedTask />
      </ProtectedRoute>
    ),
  },
  {
    path: '/customer/completed-order/order-task/finished-task/:orderId/:orderDetailId', //已完成訂單
    element: (
      <ProtectedRoute role="customer">
        <CompletedFinishedTask />
      </ProtectedRoute>
    ),
  },
];
