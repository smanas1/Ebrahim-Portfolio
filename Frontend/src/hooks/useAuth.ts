import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// Custom hook to access auth state
export const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    token,
    isAuthenticated,
  };
};
