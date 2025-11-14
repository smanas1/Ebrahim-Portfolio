import type { RootState } from "@/store/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { hasAccessToPage } from "@/utils/roleUtils";

type RoleProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[]; // Optional: specify exact roles allowed
  requiredPage?: string; // Optional: specify page name to check permissions
}

const RoleProtectedRoute = ({
  children,
  allowedRoles,
  requiredPage
}: RoleProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

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
  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    // Redirect to overview if user doesn't have required role
    return <Navigate to="/dashboard/overview" replace />;
  }

  // If a specific page is required, check permissions based on role
  if (requiredPage && user?.role) {
    if (!hasAccessToPage(user.role, requiredPage)) {
      // Redirect to overview if user doesn't have access to this page
      return <Navigate to="/dashboard/overview" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;