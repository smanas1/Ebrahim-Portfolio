/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogByIdQuery,
} from "@/store/api";
import { Eye, Edit, Trash2, Plus, X, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";

interface BlogFilters {
  category: string;
  author: string;
  search: string;
  dateAdded: string;
}

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showViewBlogModal, setShowViewBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [viewingBlogId, setViewingBlogId] = useState<string | null>(null);
  const [, setImagePreview] = useState<string | null>(null);
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [blogFilters, setBlogFilters] = useState<BlogFilters>({
    category: "",
    author: "",
    search: "",
    dateAdded: "",
  });

  const {
    data: blogs = [],
    isLoading: blogsLoading,
    isError: blogsError,
    error: blogsApiError,
  } = useGetAllBlogsQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const {
    data: viewingBlog,
    isLoading: viewingBlogLoading,
    isError: viewingBlogError,
  } = useGetBlogByIdQuery(viewingBlogId || "", {
    skip: !viewingBlogId,
  });

  // Filter blogs based on filters
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    return blogs.filter((blog) => {
      // Search filter
      if (blogFilters.search) {
        const searchTerm = blogFilters.search.toLowerCase();
        const matchesSearch =
          blog.title?.toLowerCase().includes(searchTerm) ||
          blog.content?.toLowerCase().includes(searchTerm) ||
          blog.category?.toLowerCase().includes(searchTerm) ||
          blog.author?.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        blogFilters.category &&
        blogFilters.category !== blog.category
      ) {
        return false;
      }

      // Author filter
      if (
        blogFilters.author &&
        blogFilters.author !== blog.author
      ) {
        return false;
      }

      // Date added filter
      if (blogFilters.dateAdded) {
        const filterDate = new Date(blogFilters.dateAdded);
        const blogDate = new Date(blog.createdAt);
        // Compare dates without time component, handling null/undefined dates
        if (
          blog.createdAt &&
          (blogDate.getDate() !== filterDate.getDate() ||
            blogDate.getMonth() !== filterDate.getMonth() ||
            blogDate.getFullYear() !== filterDate.getFullYear())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [blogs, blogFilters]);

  // Extract unique categories and authors for filters
  const uniqueCategories = useMemo(() => {
    if (!blogs) return [];
    const unique = Array.from(
      new Set(
        blogs
          .map((b) => b.category)
          .filter((cat) => cat && cat.trim() !== "")
      )
    );
    return unique;
  }, [blogs]);

  const uniqueAuthors = useMemo(() => {
    if (!blogs) return [];
    const unique = Array.from(
      new Set(
        blogs
          .map((b) => b.author)
          .filter((author) => author && author.trim() !== "")
      )
    );
    return unique;
  }, [blogs]);

  const handleViewBlog = (id: string) => {
    setViewingBlogId(id);
    setShowViewBlogModal(true);
  };

  const handleBlogFilterChange = (
    key: keyof BlogFilters,
    value: string
  ) => {
    setBlogFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlogClearFilter = (key: keyof BlogFilters) => {
    setBlogFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const handleBlogResetFilters = () => {
    setBlogFilters({
      category: "",
      author: "",
      search: "",
      dateAdded: "",
    });
  };

  // Handle creating a new blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const coverImageFile = formData.get("coverImage") as File | null;

    let blogData: any;
    if (coverImageFile && coverImageFile.size > 0) {
      // If image is present, send as multipart/form-data
      blogData = new FormData();
      blogData.append("title", formData.get("title") as string);
      blogData.append("content", formData.get("content") as string);
      blogData.append("author", formData.get("author") as string);
      blogData.append("category", formData.get("category") as string);

      // Add cover image file
      blogData.append("coverImage", coverImageFile);
    } else {
      // If no image, send as regular object
      blogData = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        author: formData.get("author") as string,
        category: formData.get("category") as string,
      };
    }

    try {
      await createBlog(blogData).unwrap();
      setShowBlogModal(false);
      setImagePreview(null);
      // Reset form
      form.reset();
    } catch (err) {
      console.error("Failed to create blog:", err);
    }
  };

  // Handle updating a blog
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if there are image files to upload
    const coverImageFile = formData.get("coverImage") as File | null;

    let blogData: any;
    if (coverImageFile && coverImageFile.size > 0) {
      // If new image is present, send as multipart/form-data
      blogData = new FormData();
      blogData.append("_id", editingBlog._id);
      blogData.append("title", formData.get("title") as string);
      blogData.append("content", formData.get("content") as string);
      blogData.append("author", formData.get("author") as string);
      blogData.append("category", formData.get("category") as string);

      // Add cover image file
      blogData.append("coverImage", coverImageFile);
    } else {
      // If no new image uploaded, send as regular object
      blogData = {
        _id: editingBlog._id,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        author: formData.get("author") as string,
        category: formData.get("category") as string,
      };
    }

    try {
      await updateBlog(blogData).unwrap();
      setEditingBlog(null);
      setShowBlogModal(false);
      setImagePreview(null);
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
    <div className="space-y-6 bg-background min-h-screen p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Blogs Management</h2>
        <Button onClick={() => {
          setEditingBlog(null);
          setShowBlogModal(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Blog
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Card className="shadow-md bg-card border border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Search
                </label>
                <Input
                  type="text"
                  placeholder="Search blogs..."
                  value={blogFilters.search}
                  onChange={(e) => handleBlogFilterChange('search', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
                  value={blogFilters.category}
                  onChange={(e) => handleBlogFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-background text-foreground">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Author
                </label>
                <select
                  className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
                  value={blogFilters.author}
                  onChange={(e) => handleBlogFilterChange('author', e.target.value)}
                >
                  <option value="">All Authors</option>
                  {uniqueAuthors.map((author) => (
                    <option key={author} value={author} className="bg-background text-foreground">
                      {author}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Date Added
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
                  value={blogFilters.dateAdded}
                  onChange={(e) => handleBlogFilterChange('dateAdded', e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleBlogResetFilters}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setBlogFilters({
                      category: "",
                      author: "",
                      search: "",
                      dateAdded: "",
                    });
                  }}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blogs Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="text-sm text-foreground">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setGridColumns(2)}
                className={`${gridColumns === 2 ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setGridColumns(3)}
                className={`${gridColumns === 3 ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setGridColumns(4)}
                className={`${gridColumns === 4 ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredBlogs.length > 0 ? (
            <div
              className={`grid gap-6 ${
                gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' :
                gridColumns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-card rounded-xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {blog.coverImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  {!blog.coverImage && (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xl font-bold">B</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">No image</p>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {blog.content.substring(0, 100)}...
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="bg-muted p-2 rounded">
                        <div className="text-muted-foreground">Category</div>
                        <div className="font-medium">{blog.category || "-"}</div>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <div className="text-muted-foreground">Author</div>
                        <div className="font-medium">{blog.author}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setViewingBlogId(blog._id);
                            setShowViewBlogModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingBlog(blog);
                            setShowBlogModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No blogs found</p>
              <p className="text-muted-foreground/70 mt-2">
                {blogFilters.search || blogFilters.category || blogFilters.author
                  ? "No blogs match your current filters."
                  : "No blogs available in the database."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {editingBlog ? "Edit Blog" : "Add New Blog"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowBlogModal(false);
                  setEditingBlog(null);
                  setImagePreview(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <form
              onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
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
                <label className="block text-sm font-medium text-foreground mb-1">
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
                <label className="block text-sm font-medium text-foreground mb-1">
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
                <label className="block text-sm font-medium text-foreground mb-1">
                  Content
                </label>
                <textarea
                  className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
                  name="content"
                  defaultValue={editingBlog?.content || ""}
                  rows={6}
                  placeholder="Enter blog content"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Cover Image
                </label>
                <Input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="w-full"
                />
                {editingBlog?.coverImage && (
                  <div className="mt-2">
                    <p className="text-sm text-foreground">Current Image:</p>
                    <img
                      src={editingBlog.coverImage}
                      alt="Current blog cover"
                      className="mt-1 h-32 object-contain border border-input rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowBlogModal(false);
                    setEditingBlog(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="px-4 py-2">
                  {editingBlog ? "Update Blog" : "Add Blog"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Blog Modal */}
      {showViewBlogModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Blog Details
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowViewBlogModal(false);
                  setViewingBlogId(null);
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {viewingBlogLoading && (
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="h-8 w-8 border-t-2 border-r-2 border-primary rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-foreground">Loading blog...</p>
                </div>
              </div>
            )}

            {viewingBlogError && (
              <div className="text-destructive text-center py-8">
                <p>Error loading blog details.</p>
              </div>
            )}

            {viewingBlog && !viewingBlogLoading && !viewingBlogError && (
              <div className="space-y-6">
                {/* Blog Cover Image */}
                {viewingBlog.coverImage && (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={viewingBlog.coverImage}
                      alt={viewingBlog.title}
                      className="w-full h-64 object-contain"
                    />
                  </div>
                )}

                {/* Blog Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Title</h4>
                      <p className="text-lg font-semibold text-foreground">{viewingBlog.title}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                      <p className="text-foreground">{viewingBlog.category || "-"}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Author</h4>
                      <p className="text-foreground">{viewingBlog.author}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Date Added</h4>
                      <p className="text-foreground">
                        {new Date(viewingBlog.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Placeholder for any other blog-specific fields */}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Content Preview</h4>
                      <p className="text-foreground line-clamp-3">{viewingBlog.content.substring(0, 150)}...</p>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Full Content</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground whitespace-pre-line">{viewingBlog.content}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowViewBlogModal(false);
                  setViewingBlogId(null);
                }}
                className="px-4 py-2"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;