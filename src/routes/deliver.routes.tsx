import { RouteConfig } from './types';
import ProtectedRoute from '../layouts/ProtectedRoute';
import DeliverLayout from '../layouts/DeliverLayout';

//外送員頁面組件
import Task from '../pages/deliver/Task'; //任務清單
import OrderDetailDeliver from '../pages/deliver/Task/OrderDetail'; //訂單詳情
import ScanOrder from '../pages/deliver/ScanOrder'; //掃描訂單
import ProcessOrder from '../pages/deliver/ProcessOrder'; //處理訂單
import Calendar from '../pages/deliver/Calendar'; //行事曆
import MockQRGenerator from '../pages/deliver/MockQRGenerator'; //回報後台

export const deliverRoutes: RouteConfig[] = [
  {
    path: '/deliver',
    element: (
      <ProtectedRoute role="deliver">
        <DeliverLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Task /> },
      { path: 'scan-order', element: <ScanOrder /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'report', element: <MockQRGenerator /> },
    ],
  },
  {
    path: '/deliver/task/:taskId',
    element: (
      <ProtectedRoute role="deliver">
        <OrderDetailDeliver />
      </ProtectedRoute>
    ),
  },
  {
    path: '/deliver/scan-order/process-order/:taskId',
    element: (
      <ProtectedRoute role="deliver">
        <ProcessOrder />
      </ProtectedRoute>
    ),
  },
];
