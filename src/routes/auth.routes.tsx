import { Navigate, Outlet } from 'react-router-dom';
import { RouteConfig } from './types';
import LineLogin from '../pages/auth/LineLogin/index';
import LineLoginCustomer from '../pages/auth/LineLoginCustomer/index';
import LineLoginDeliver from '../pages/auth/LineLoginDeliver/index';
import LineCallback from '../pages/auth/LineCallback/index';
export const authRoutes: RouteConfig[] = [
  {
    path: '/auth',
    element: <Outlet />,
    children: [
      { path: '', element: <Navigate to="line-login-customer" replace /> },
      { path: 'line-login-all', element: <LineLogin /> },
      { path: 'line-login-customer', element: <LineLoginCustomer /> },
      { path: 'line-login-deliver', element: <LineLoginDeliver /> },
      { path: 'line/callback', element: <LineCallback /> },
    ],
  },
];
