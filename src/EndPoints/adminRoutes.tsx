// AdminWrapper.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'ADMIN';
};

const AdminRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to='/unouthorized' />;
};

export default AdminRoute;
