import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';

// Define the Auth state type
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Initial state for auth
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Auth reducer to handle login/logout
const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case 'auth/login':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'auth/logout':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Configure the store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;