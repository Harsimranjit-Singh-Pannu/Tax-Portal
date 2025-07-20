import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';         // Admin auth
import { useUserAuth } from './UserAuthContext';  // User auth

// Admin protected route
export function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// User protected route
export function UserProtectedRoute({ children }) {
  const { isUserAuthenticated, isUser } = useUserAuth();

  if (!isUserAuthenticated || !isUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}
