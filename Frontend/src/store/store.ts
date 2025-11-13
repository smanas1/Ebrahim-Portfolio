import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { apiSlice } from './api';

// Define the Auth state type
interface AuthState {
  user: any | null;
  token: string | null,
  isAuthenticated: boolean;
}

// Create a transform to sanitize user data on persist/rehydrate
const sanitizeUserTransform = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState: AuthState) => {
    // Sanitize the user object by removing sensitive data
    if (inboundState.user) {
      const sanitizedUser = { ...inboundState.user };
      delete sanitizedUser.password; // Remove password for security
      return { ...inboundState, user: sanitizedUser };
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: any) => {
    // Sanitize the user object on rehydration too
    if (outboundState.user) {
      const sanitizedUser = { ...outboundState.user };
      delete sanitizedUser.password; // Ensure password is removed during rehydration
      return { ...outboundState, user: sanitizedUser };
    }
    return outboundState;
  },
  // define which reducers this transform gets called for
  { whitelist: ['auth'] }
);

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth will be persisted
  transforms: [sanitizeUserTransform], // apply the transform
};

// Initial state for auth
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
    isAuthenticated: !!(token),
  };
};

const initialState: AuthState = getInitialState();

// Auth reducer to handle login/logout
const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case 'auth/login':
      // Sanitize user object by removing password field for security
      const sanitizedUser = { ...action.payload.user };
      delete sanitizedUser.password;
      return {
        ...state,
        user: sanitizedUser,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'auth/logout':
      // Remove token and user data from localStorage on logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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

// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

// Create the persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;