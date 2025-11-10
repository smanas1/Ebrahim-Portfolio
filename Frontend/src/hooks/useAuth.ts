import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // Dispatch logout action which will also remove token from localStorage
    dispatch({ type: 'auth/logout' });
    
    // Navigate to home or login page
    navigate('/auth');
  };

  return { logout };
};