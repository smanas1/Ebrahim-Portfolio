/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/store/api";
import { Eye, Edit, Trash2, Plus, X } from "lucide-react";

const BlogsPage: React.FC = () => {
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsApiError,
  } = useGetAllBlogsQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

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

  if (blogsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (blogsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {blogsApiError?.toString()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blogs Management</h2>
        <Button onClick={() => {
          setEditingBlog(null);
          setShowBlogModal(true);
        }}>
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
    </div>
  );
};

export default BlogsPage;