import type { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { hasAccessToPage } from "@/utils/roleUtils";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Optional: specify exact roles allowed
  requiredPage?: string; // Optional: specify page name to check permissions
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ 
  children, 
  allowedRoles,
  requiredPage 
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();
  const params = useParams();

  if (!isAuthenticated || !user) {
    // Redirect to login page with return url
    return (
      <Navigate
        to="/auth?returnUrl=/dashboard"
        state={{ from: location }}
        replace
      />
    );
  }

  // If specific roles are defined, check if user's role is in the list
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to overview if user doesn't have required role
    return <Navigate to="/dashboard/overview" replace />;
  }

  // If a specific page is required, check permissions based on role
  if (requiredPage && user.role) {
    if (!hasAccessToPage(user.role, requiredPage)) {
      // Redirect to overview if user doesn't have access to this page
      return <Navigate to="/dashboard/overview" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;