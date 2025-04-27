import { Navigate, Outlet } from 'react-router-dom';
import { RouteConfig } from './types';
import LineLogin from '../pages/auth/LineLogin/index';
import LineCallback from '../pages/auth/LineCallback/index';

export const authRoutes: RouteConfig[] = [
  {
    path: '/auth',
    element: <Outlet />,
    children: [
      { path: '', element: <Navigate to="line-login" replace /> },
      { path: 'line-login', element: <LineLogin /> },
      { path: 'line/callback', element: <LineCallback /> },
    ],
  },
];
