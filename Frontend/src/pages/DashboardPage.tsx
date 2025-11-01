/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Newspaper,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/store/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [multipleImagePreviews, setMultipleImagePreviews] = useState<string[]>(
    []
  );
  const [isProductLoading, setIsProductLoading] = useState(false);

  // Using the API to get products and blogs
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
    error: productsApiError,
  } = useGetAllProductsQuery();
  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsApiError,
  } = useGetAllBlogsQuery();
  const [createBlog] = useCreateBlogMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle image preview when user selects an image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = (event) => {
          if (event.target?.result) {
            setMultipleImagePreviews((prev) => [
              ...prev,
              event.target!.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle creating a new blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const blogData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      isPublished: formData.get("isPublished") === "on",
    };

    try {
      await createBlog(blogData as any).unwrap();
      setShowBlogModal(false);
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error("Failed to create blog:", err);
    }
  };

  // Handle creating a new product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const imageFiles = formData.getAll("productImage") as File[];

    let productData: any;
    if (imageFiles.length > 0 && imageFiles.some((file) => file.size > 0)) {
      // If image is present, send as multipart/form-data
      productData = new FormData();
      productData.append("productName", formData.get("productName") as string);
      productData.append("category", formData.get("category") as string);
      productData.append("brandName", formData.get("brandName") as string);
      productData.append("moq", formData.get("moq") as string);
      productData.append(
        "productDetails",
        formData.get("productDetails") as string
      );
      productData.append("costOfGoods", formData.get("costOfGoods") as string);
      productData.append("sampleCost", formData.get("sampleCost") as string);
      productData.append("shipToUsa", formData.get("shipToUsa") as string);

      // Add all image files with the same field name
      imageFiles.forEach((file, _index) => {
        if (file.size > 0) {
          productData.append(`pictures`, file); // Changed to match backend expectation
        }
      });
    } else {
      // If no image, send as regular object
      productData = {
        productName: formData.get("productName") as string,
        category: formData.get("category") as string,
        brandName: formData.get("brandName") as string,
        moq: formData.get("moq") as string,
        productDetails: formData.get("productDetails") as string,
        costOfGoods: formData.get("costOfGoods") as string,
        sampleCost: formData.get("sampleCost") as string,
        shipToUsa: formData.get("shipToUsa") as string,
      };
    }

    try {
      setIsProductLoading(true);
      await createProduct(productData).unwrap();
      setShowProductModal(false);
      setImagePreview(null);
      setMultipleImagePreviews([]);
      // Reset form
      form.reset();
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setIsProductLoading(false);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const imageFiles = formData.getAll("productImage") as File[];

    let productData: any;
    if (imageFiles.length > 0 && imageFiles.some((file) => file.size > 0)) {
      // If image is present, send as multipart/form-data
      productData = new FormData();
      productData.append("_id", editingProduct._id);
      productData.append("productName", formData.get("productName") as string);
      productData.append("category", formData.get("category") as string);
      productData.append("brandName", formData.get("brandName") as string);
      productData.append("moq", formData.get("moq") as string);
      productData.append(
        "productDetails",
        formData.get("productDetails") as string
      );
      productData.append("costOfGoods", formData.get("costOfGoods") as string);
      productData.append("sampleCost", formData.get("sampleCost") as string);
      productData.append("shipToUsa", formData.get("shipToUsa") as string);

      // Add all image files with the same field name
      imageFiles.forEach((file, _index) => {
        if (file.size > 0) {
          productData.append(`pictures`, file); // Changed to match backend expectation
        }
      });
    } else {
      // If no image, send as regular object
      productData = {
        _id: editingProduct._id,
        productName: formData.get("productName") as string,
        category: formData.get("category") as string,
        brandName: formData.get("brandName") as string,
        moq: formData.get("moq") as string,
        productDetails: formData.get("productDetails") as string,
        costOfGoods: formData.get("costOfGoods") as string,
        sampleCost: formData.get("sampleCost") as string,
        shipToUsa: formData.get("shipToUsa") as string,
      };
    }

    try {
      setIsProductLoading(true);
      await updateProduct(productData).unwrap();
      setEditingProduct(null);
      setShowProductModal(false);
      setImagePreview(null);
      setMultipleImagePreviews([]);
    } catch (err) {
      console.error("Failed to update product:", err);
    } finally {
      setIsProductLoading(false);
    }
  };

  // Handle updating a blog
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const blogData = {
      _id: editingBlog._id,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      category: formData.get("category") as string,
      isPublished: formData.get("isPublished") === "on",
    };

    try {
      await updateBlog(blogData as any).unwrap();
      setEditingBlog(null);
      setShowBlogModal(false);
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id).unwrap();
      } catch (err) {
        console.error("Failed to delete blog:", err);
      }
    }
  };

  if (
    (productsLoading && activeTab === "products") ||
    (blogsLoading && activeTab === "blogs") ||
    (productsLoading && activeTab === "overview")
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (
    (productsError && activeTab === "products") ||
    (blogsError && activeTab === "blogs") ||
    (productsError && activeTab === "overview")
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {(productsApiError || blogsApiError)?.toString()}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 h-full bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className={`p-4 ${sidebarOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-xl font-bold ${sidebarOpen ? "" : "hidden"}`}>
              Admin Dashboard
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Overview
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "products"
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("products")}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Products
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "blogs" ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("blogs")}
                >
                  <Newspaper className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Blogs
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "users" ? "bg-blue-600" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Users
                  </span>
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-blue-600"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Settings
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    3
                  </div>
                </div>
              </Button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <span>JD</span>
                </div>
                <span className="ml-2 hidden md:block">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <ShoppingCart className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{products.length}</div>
                    <p className="text-xs text-green-500">
                      +2.5% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Blogs
                    </CardTitle>
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Newspaper className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{blogs.length}</div>
                    <p className="text-xs text-green-500">
                      +5.2% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <Users className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <p className="text-xs text-green-500">
                      +1.8% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Revenue
                    </CardTitle>
                    <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$3,240</div>
                    <p className="text-xs text-green-500">
                      +3.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Products and Blogs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              MOQ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.slice(0, 5).map((product) => (
                            <tr key={product._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.productName}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {product.category}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {product.moq}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setEditingProduct(product);
                                      setShowProductModal(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleDeleteProduct(product._id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Blogs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {blogs.slice(0, 5).map((blog) => (
                            <tr key={blog._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {blog.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">
                                  {blog.author}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    blog.isPublished
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {blog.isPublished ? "Published" : "Draft"}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setEditingBlog(blog);
                                      setShowBlogModal(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteBlog(blog._id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products Management</h2>
                <Button onClick={() => setShowProductModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <Card className="shadow-md">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Brand
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            MOQ
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.productName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.category}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.brandName || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {product.moq}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setShowProductModal(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blogs Management</h2>
                <Button onClick={() => setShowBlogModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Blog
                </Button>
              </div>

              <Card className="shadow-md">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((blog) => (
                          <tr key={blog._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {blog.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {blog.author}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {blog.category || "-"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  blog.isPublished
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {blog.isPublished ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setEditingBlog(blog);
                                    setShowBlogModal(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteBlog(blog._id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Product Modal */}
          {showProductModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowProductModal(false);
                      setEditingProduct(null);
                      setImagePreview(null);
                      setMultipleImagePreviews([]);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form
                  onSubmit={
                    editingProduct ? handleUpdateProduct : handleCreateProduct
                  }
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <Input
                      type="text"
                      name="productName"
                      defaultValue={editingProduct?.productName || ""}
                      placeholder="Enter product name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Input
                      type="text"
                      name="category"
                      defaultValue={editingProduct?.category || ""}
                      placeholder="Enter category"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Name
                    </label>
                    <Input
                      type="text"
                      name="brandName"
                      defaultValue={editingProduct?.brandName || ""}
                      placeholder="Enter brand name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MOQ (Minimum Order Quantity)
                    </label>
                    <Input
                      type="text"
                      name="moq"
                      defaultValue={editingProduct?.moq || ""}
                      placeholder="Enter MOQ"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Details
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      name="productDetails"
                      defaultValue={editingProduct?.productDetails || ""}
                      rows={4}
                      placeholder="Enter product details"
                      required
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost of Goods <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="costOfGoods"
                        defaultValue={editingProduct?.costOfGoods || ""}
                        placeholder="Enter cost of goods"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Cost <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="sampleCost"
                        defaultValue={editingProduct?.sampleCost || ""}
                        placeholder="Enter sample cost"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ship to USA <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="shipToUsa"
                        defaultValue={editingProduct?.shipToUsa || ""}
                        placeholder="Enter shipping details"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Images
                    </label>
                    <Input
                      type="file"
                      name="productImage"
                      accept="image/*"
                      multiple
                      className="w-full"
                      onChange={handleImageChange}
                    />
                    {multipleImagePreviews.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Selected images:
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {multipleImagePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {!multipleImagePreviews.length &&
                      editingProduct &&
                      editingProduct.pictures &&
                      editingProduct.pictures.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Current images:
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {editingProduct.pictures.map(
                              (picture: string, index: number) => (
                                <div key={index} className="relative">
                                  <img
                                    src={picture}
                                    alt={`Current ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowProductModal(false);
                        setEditingProduct(null);
                        setImagePreview(null);
                        setMultipleImagePreviews([]);
                      }}
                      className="px-4 py-2"
                      disabled={isProductLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2"
                      disabled={isProductLoading}
                    >
                      {isProductLoading ? (
                        <span className="flex items-center">
                          <span className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
                          {editingProduct ? "Updating..." : "Adding..."}
                        </span>
                      ) : editingProduct ? (
                        "Update Product"
                      ) : (
                        "Add Product"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Blog Modal */}
          {showBlogModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingBlog ? "Edit Blog" : "Create New Blog"}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowBlogModal(false);
                      setEditingBlog(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <form
                  onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <Input
                      type="text"
                      name="title"
                      defaultValue={editingBlog?.title || ""}
                      placeholder="Enter blog title"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <Input
                      type="text"
                      name="author"
                      defaultValue={editingBlog?.author || ""}
                      placeholder="Enter author name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <Input
                      type="text"
                      name="category"
                      defaultValue={editingBlog?.category || ""}
                      placeholder="Enter category"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      name="content"
                      defaultValue={editingBlog?.content || ""}
                      rows={6}
                      placeholder="Enter blog content"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      defaultChecked={editingBlog?.isPublished}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label
                      htmlFor="isPublished"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Publish immediately
                    </label>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowBlogModal(false);
                        setEditingBlog(null);
                      }}
                      className="px-4 py-2"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="px-4 py-2">
                      {editingBlog ? "Update Blog" : "Create Blog"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

// function useDeleteProductMutation(): [any] {
//   throw new Error("Function not implemented.");
// }
