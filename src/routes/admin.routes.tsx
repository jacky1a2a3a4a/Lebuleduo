import { RouteConfig } from './types';
import AdminLayout from '../layouts/AdminLayout';

// 後台頁面組件
import TaskDispatch from '../pages/admin/TaskDispatch';
import PageNotFound from '../pages/PageNotFound';

export const adminRoutes: RouteConfig[] = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <TaskDispatch /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
];
