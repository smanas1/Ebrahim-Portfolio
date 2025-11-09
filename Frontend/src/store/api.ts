import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import type { 
  Product,
  Blog,
  User,
  RegisterResponse,
  LoginResponse,
  CreateBlogRequest,
  CreateProductRequest,
  UpdateProductRequest,
  CreateProductFormData,
  UpdateProductFormData,
  UpdateBlogRequest,
} from "@/types/productTypes";

// Define the base URL for your backend API
const BASE_URL = import.meta.env.VITE_BASE_URL; // Adjust this to match your backend server URL

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
    createBlog: builder.mutation<Blog, CreateBlogRequest | FormData>({
      query: (newBlog) => {
        if (newBlog instanceof FormData) {
          return {
            url: "/blog/create",
            method: "POST",
            body: newBlog,
            headers: {},
          };
        } else {
          return {
            url: "/blog/create",
            method: "POST",
            body: newBlog,
          };
        }
      },
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation<Blog, UpdateBlogRequest | FormData>({
      query: (blogData) => {
        // Check if blogData is FormData
        if (blogData instanceof FormData) {
          const _id = blogData.get("_id") as string;
          // Remove _id from FormData since it's part of the URL
          const formData = new FormData();
          for (const [key, value] of blogData.entries()) {
            if (key !== "_id") {
              formData.append(key, value);
            }
          }
          return {
            url: `/blog/update/${_id}`,
            method: "PATCH",
            body: formData,
            headers: {},
          };
        } else {
          // If it's not FormData, extract _id separately
          const { _id, ...patch } = blogData;
          return {
            url: `/blog/${_id}`,
            method: "PATCH",
            body: patch,
          };
        }
      },
      invalidatesTags: ["Blog"],
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => `/blog/${id}`,
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),
    deleteBlog: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    // User endpoints
    getAllUsers: builder.query<User[], void>({
      query: () => "/user/all-users",
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
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
    updateUser: builder.mutation<
      { message: string; user: User },
      { id: string; name: string; email: string; role: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
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
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;