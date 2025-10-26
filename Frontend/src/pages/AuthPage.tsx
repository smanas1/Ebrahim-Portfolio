import React, { useState } from 'react';
import { useRegisterUserMutation, useLoginUserMutation } from '../store/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface AuthFormState {
  name: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormState>({
    name: '',
    email: '',
    password: ''
  });
  
  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      if (isLogin) {
        // Login user
        const result = await loginUser({
          email: formData.email,
          password: formData.password
        }).unwrap();
        
        // Store user and token in Redux store
        dispatch({
          type: 'auth/login',
          payload: {
            user: result.user,
            token: result.token
          }
        });
        
        console.log('Login successful:', result);
        navigate('/'); // Redirect to home after login
      } else {
        // Register user
        const result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }).unwrap();
        
        // Store user and token in Redux store
        dispatch({
          type: 'auth/login',
          payload: {
            user: result.user,
            token: result.token
          }
        });
        
        console.log('Registration successful:', result);
        navigate('/'); // Redirect to home after registration
      }
    } catch (err) {
      console.error('Authentication error:', err);
      alert(`Authentication failed: ${err}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 font-medium ${isLogin ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 font-medium ${!isLogin ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required={!isLogin}
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            minLength={6}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLogin ? isLoggingIn : isRegistering}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLogin 
            ? (isLoggingIn ? 'Logging in...' : 'Login') 
            : (isRegistering ? 'Registering...' : 'Register')}
        </button>
      </form>
      
      {isLogin && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Test credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;