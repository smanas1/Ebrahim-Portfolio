import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

// Define the base URL for your backend API
const BASE_URL = import.meta.env.VITE_BASE_URL; // Adjust this to match your backend server URL

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
export interface CreateProductRequest {
  productName: string;
  category: string;
  brandName?: string;
  moq: string;
  productDetails: string;
  productPicture?: File;
  productPictures?: File[];
}

export interface UpdateProductRequest {
  _id: string;
  productName?: string;
  category?: string;
  brandName?: string;
  moq?: string;
  productDetails?: string;
  productPicture?: File;
  productPictures?: File[];
}

// Define a type for multipart form data
export type CreateProductFormData = FormData;
export type UpdateProductFormData = FormData;

export interface UpdateBlogRequest {
  _id: string;
  title?: string;
  content?: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  isPublished?: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the Redux store
      const token = (getState() as RootState).auth.token;

      // If we have a token, set it in the headers
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Product", "Blog", "User"],
  endpoints: (builder) => ({
    // Product endpoints
    getAllProducts: builder.query<Product[], void>({
      query: () => "/product/all-products",
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<Product, CreateProductRequest | FormData>({
      query: (newProduct) => {
        if (newProduct instanceof FormData) {
          return {
            url: "/product/create",
            method: "POST",
            body: newProduct,
            headers: {},
          };
        } else {
          return {
            url: "/product/create",
            method: "POST",
            body: newProduct,
          };
        }
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest | FormData>({
      query: (productData) => {
        // Check if productData is FormData
        if (productData instanceof FormData) {
          const _id = productData.get("_id") as string;
          // Remove _id from FormData since it's part of the URL
          const formData = new FormData();
          for (const [key, value] of productData.entries()) {
            if (key !== "_id") {
              formData.append(key, value);
            }
          }
          return {
            url: `/product/update/${_id}`,
            method: "PATCH",
            body: formData,
            headers: {},
          };
        } else {
          return {
            url: `/product/update/${productData._id}`,
            method: "PATCH",
            body: productData,
          };
        }
      },
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/product/get/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Blog endpoints
    getAllBlogs: builder.query<Blog[], void>({
      query: () => "/blog/all-blogs",
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation<Blog, CreateBlogRequest>({
      query: (newBlog) => ({
        url: "/blog/create",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<Blog, UpdateBlogRequest>({
      query: ({ _id, ...patch }) => ({
        url: `/blog/${_id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // User endpoints
    registerUser: builder.mutation<
      RegisterResponse,
      Omit<User, "_id" | "createdAt" | "updatedAt"> & { password: string }
    >({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetAllProductsQuery,
  useGetAllBlogsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = apiSlice;
