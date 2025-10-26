import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// Custom hook to access auth state
export const useAuth = () => {
  const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return {
    user,
    token,
    isAuthenticated,
  };
};