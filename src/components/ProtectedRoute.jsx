import React from 'react';
import { Navigate } from 'react-router';
import { useAuthContext } from './context/AuthContext';

function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();

  // If a user is not logged in or a user has no admin role although requireAdmin is true, redirect to the home both (don't save this path on the route history)
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace></Navigate>;
  }

  // If It is not above cases, go to children page
  return children;
}

export default ProtectedRoute;
