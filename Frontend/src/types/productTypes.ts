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
  role: "user" | "admin" | "moderator";
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