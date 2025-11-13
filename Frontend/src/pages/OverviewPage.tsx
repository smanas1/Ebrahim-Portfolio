import React from "react";
import { Edit, Trash2 } from "lucide-react";
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
} from "@/store/api";

const OverviewPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

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

  // Calculate stats
  const totalProducts = products.length;
  const totalBlogs = blogs.length;
  const totalUsers = users.length;
  const totalRevenue = products.reduce(
    (sum, product) =>
      sum + (typeof product.costOfGoods === "number" ? product.costOfGoods : 0),
    0
  );

  // Get recent items
  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  if (productsLoading || blogsLoading || usersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (productsError || blogsError || usersError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-500">
          Error loading data
        </h2>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">
          Dashboard Overview
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Products"
          value={totalProducts.toString()}
          icon="📦"
          theme={theme}
        />
        <StatsCard
          title="Total Blogs"
          value={totalBlogs.toString()}
          icon="📝"
          theme={theme}
        />
        <StatsCard
          title="Total Users"
          value={totalUsers.toString()}
          icon="👥"
          theme={theme}
        />
      </div>

      {/* Recent Products and Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{product.productName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/dashboard/products?edit=${product._id}`)
                      }
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Blogs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/dashboard/blogs?edit=${blog._id}`)
                      }
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewPage;
