import React from 'react';
import { Navigate } from 'react-router-dom';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !role) {
    console.log('No token or role found, redirecting to login');
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log('User role not allowed, redirecting to login');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
