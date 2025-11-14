import React, { useState } from 'react';
import { useLoginUserMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface AuthFormState {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [formData, setFormData] = useState<AuthFormState>({
    email: '',
    password: ''
  });

  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Login user
      const result = await loginUser({
        email: formData.email,
        password: formData.password
      }).unwrap();

      // Sanitize user object by removing password for security if it exists
      const { password, ...sanitizedUser } = result.user as any;
      
      // Store user and token in Redux store and localStorage
      dispatch({
        type: 'auth/login',
        payload: {
          user: sanitizedUser,
          token: result.token
        }
      });

      // Store token and user data in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(sanitizedUser));

      console.log('Login successful:', result);
      
      // Check for returnUrl from protected route or redirect to dashboard
      const searchParams = new URLSearchParams(location.search);
      const returnUrl = searchParams.get('returnUrl') || '/dashboard';
      navigate(returnUrl);
    } catch (err) {
      console.error('Authentication error:', err);
      alert(`Authentication failed: ${err}`);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-4`}>
      <div className="w-full max-w-md">
        <div className={`rounded-2xl shadow-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-xl p-8`}>
              <div className="text-center mb-8">
                <div className="mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Welcome Back</h2>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded focus:ring-blue-500 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-blue-600' 
                        : 'text-blue-600 border-gray-300'
                    }`}
                  />
                  <label htmlFor="remember-me" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <a href="#" className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <a href="#" className={`font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Contact administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;