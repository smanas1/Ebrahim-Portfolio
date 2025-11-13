import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { apiSlice } from './api';

// Define the Auth state type
interface AuthState {
  user: {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    [key: string]: string | boolean | number | undefined;
  } | null;
  token: string | null,
  isAuthenticated: boolean;
}

// Define a type for the user object to ensure type safety
type SanitizedUser = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  [key: string]: string | boolean | number | undefined;
};

// Create a transform to sanitize user data on persist/rehydrate
const sanitizeUserTransform = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState: AuthState): AuthState => {
    // Sanitize the user object by removing sensitive data
    if (inboundState.user) {
      const sanitizedUser: SanitizedUser = { ...inboundState.user };
      delete sanitizedUser.password; // Remove password for security
      return { ...inboundState, user: sanitizedUser };
    }
    return inboundState;
  },
  // transform state being rehydrated
  (outboundState: AuthState): AuthState => {
    // Sanitize the user object on rehydration too
    if (outboundState.user) {
      const sanitizedUser: SanitizedUser = { ...outboundState.user };
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
  const userRaw = localStorage.getItem('user');
  
  return {
    user: userRaw ? JSON.parse(userRaw) : null,
    token: token || null,
    isAuthenticated: !!(token),
  };
};

const initialState: AuthState = getInitialState();

// Define action interfaces
interface LoginAction {
  type: 'auth/login';
  payload: {
    user: {
      _id?: string;
      name?: string;
      email?: string;
      role?: string;
      __v?: number;
      [key: string]: string | boolean | number | undefined;
    };
    token: string;
  };
}

interface LogoutAction {
  type: 'auth/logout';
}

type AuthAction = LoginAction | LogoutAction;

// Helper function to sanitize user by removing password
const sanitizeUser = (user: {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  __v?: number;
  [key: string]: string | boolean | number | undefined;
}) => {
  const sanitizedUser = { ...user };
  delete sanitizedUser.password;
  return sanitizedUser;
};

// Auth reducer to handle login/logout
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'auth/login':
      // Sanitize user object by removing password field for security
      return {
        ...state,
        user: sanitizeUser(action.payload.user),
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