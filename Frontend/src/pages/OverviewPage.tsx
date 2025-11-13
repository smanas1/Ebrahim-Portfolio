 
import React, { useState, useMemo } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import {
  useGetAllBlogsQuery,
  useGetAllProductsQuery,
  useGetAllUsersQuery,
  useDeleteProductMutation,
  useDeleteBlogMutation,
  useGetProductByIdQuery,
} from "@/store/api";

interface ProductFilters {
  category: string;
  minMoq: string;
  maxPrice: string;
  search: string;
  minSampleCost: string;
  maxSampleCost: string;
  minShipToUsa: string;
  maxShipToUsa: string;
  shipToUsaAvailable: "yes" | "no" | "";
  brandName: string;
  dateAdded: string;
}

const OverviewPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [viewingProductId, setViewingProductId] = useState<string | null>(null);

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useGetAllProductsQuery();
  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
  } = useGetAllBlogsQuery();
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsersQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const {
    data: viewingProduct,
    isLoading: viewingProductLoading,
    isError: viewingProductError,
  } = useGetProductByIdQuery(viewingProductId || "", {
    skip: !viewingProductId,
  });

  const handleViewProduct = (id: string) => {
    setViewingProductId(id);
    setShowViewProductModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id).unwrap();
      } catch (err) {
        console.error("Failed to delete blog:", err);
      }
    }
  };

  if (productsLoading || blogsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (productsError || blogsError || usersError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading data
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } p-3`}
    >
      <h2
        className={`text-2xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Products"
          value={products.length}
          theme={theme}
          iconBgClass={theme === "dark" ? "bg-blue-900" : "bg-blue-100"}
          iconColorClass={theme === "dark" ? "text-blue-300" : "text-blue-600"}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </StatsCard>

        <StatsCard
          title="Total Blogs"
          value={blogs.length}
          theme={theme}
          iconBgClass={theme === "dark" ? "bg-green-900" : "bg-green-100"}
          iconColorClass={theme === "dark" ? "text-green-300" : "text-green-600"}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
        </StatsCard>

        <StatsCard
          title="Total Users"
          value={users.length}
          theme={theme}
          iconBgClass={theme === "dark" ? "bg-purple-900" : "bg-purple-100"}
          iconColorClass={theme === "dark" ? "text-purple-300" : "text-purple-600"}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </StatsCard>
      </div>

      {/* Recent Products and Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          } shadow-md`}
        >
          <CardHeader>
            <CardTitle
              className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Recent Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table
                className={`min-w-full divide-y ${
                  theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                <thead
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Product
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Category
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      MOQ
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } ${
                    theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                  } divide-y`}
                >
                  {products.slice(0, 5).map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {product.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {product.moq}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/dashboard/products")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/dashboard/products")}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product._id)}
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

        <Card
          className={`${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-900"
          } shadow-md`}
        >
          <CardHeader>
            <CardTitle
              className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Recent Blogs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table
                className={`min-w-full divide-y ${
                  theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                }`}
              >
                <thead
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Title
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Category
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Author
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } ${
                    theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                  } divide-y`}
                >
                  {blogs.slice(0, 5).map((blog) => (
                    <tr key={blog._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {blog.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {blog.category || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`${
                            theme === "dark" ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {blog.author}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/dashboard/blogs")}
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
  );
};

export default OverviewPage;
