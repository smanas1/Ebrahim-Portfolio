import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';

// Define the base URL for your backend API
const BASE_URL = 'http://localhost:5000/api'; // Adjust this to match your backend server URL

// Define custom types for your data
export interface Product {
  _id: string;
  category: string;
  brandName?: string;
  brandLogo?: string;
  clientName?: string;
  productName: string;
  productPicture?: string;
  productDetails: string;
  moq: string;
  costOfGoods: string;
  sampleCost: string;
  shipToUsa: string;
  asin?: string;
  pictures: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
}

// Define the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux store
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, set it in the headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Product', 'Blog', 'User'],
  endpoints: (builder) => ({
    // Product endpoints
    getAllProducts: builder.query<Product[], void>({
      query: () => '/product/all-products',
      providesTags: ['Product'],
    }),
    
    // Blog endpoints
    getAllBlogs: builder.query<Blog[], void>({
      query: () => '/blog/all-blogs',
      providesTags: ['Blog'],
    }),
    createBlog: builder.mutation<Blog, CreateBlogRequest>({
      query: (newBlog) => ({
        url: '/blog/create',
        method: 'POST',
        body: newBlog,
      }),
      invalidatesTags: ['Blog'],
    }),
    
    // User endpoints
    registerUser: builder.mutation<RegisterResponse, Omit<User, '_id' | 'createdAt' | 'updatedAt'> & { password: string }>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export the auto-generated hooks
export const { 
  useGetAllProductsQuery, 
  useGetAllBlogsQuery, 
  useCreateBlogMutation, 
  useRegisterUserMutation, 
  useLoginUserMutation 
} = apiSlice;