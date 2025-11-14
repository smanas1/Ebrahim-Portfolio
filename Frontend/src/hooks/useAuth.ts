import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux store
  const { user, isAuthenticated } = useSelector((state: any) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }));

  const logout = () => {
    // Dispatch logout action which will also remove token from localStorage
    dispatch({ type: 'auth/logout' });

    // Navigate to home or login page
    navigate('/auth');
  };

  return { user, isAuthenticated, logout };
};