import { Navigate } from 'react-router-dom';
import { RouteConfig } from './types';

//路由組件
import { authRoutes } from './auth.routes';
import { customerRoutes } from './customer.routes';
import { deliverRoutes } from './deliver.routes';
import { adminRoutes } from './admin.routes';

//頁面未找到
import PageNotFound from '../pages/PageNotFound';

export const routes: RouteConfig[] = [
  { path: '/', element: <Navigate to="/auth" replace /> },
  ...authRoutes,
  ...customerRoutes,
  ...deliverRoutes,
  ...adminRoutes,
  { path: '*', element: <PageNotFound /> },
];
