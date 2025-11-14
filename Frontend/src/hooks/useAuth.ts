import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

// Memoized selector for better performance
const selectAuthState = createSelector(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [(state: any) => state.auth.user, (state: any) => state.auth.isAuthenticated],
  (user, isAuthenticated) => ({ user, isAuthenticated })
);

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux store using memoized selector
  const { user, isAuthenticated } = useSelector(selectAuthState);

  const logout = () => {
    // Dispatch logout action which will also remove token from localStorage
    dispatch({ type: "auth/logout" });

    // Navigate to home or login page
    navigate("/auth");
  };

  return { user, isAuthenticated, logout };
};
