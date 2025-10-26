import React, { useState } from 'react';
import { useGetAllBlogsQuery, useCreateBlogMutation } from '../store/api';

const BlogPage: React.FC = () => {
  const { data: blogs, error, isLoading } = useGetAllBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Ebrahim Mohamad Kamal',
    coverImage: '',
    tags: '',
    category: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createBlog({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      }).unwrap();
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        author: 'Ebrahim Mohamad Kamal',
        coverImage: '',
        tags: '',
        category: ''
      });
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading blogs...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading blogs: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      
      {/* Create Blog Form */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Create New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g., technology, development, tutorial"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
      
      {/* Blog List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Blogs</h2>
        {blogs?.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600 text-sm">by {blog.author}</p>
            <p className="mt-2 line-clamp-2">{blog.content.substring(0, 150)}...</p>
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 text-xs text-gray-500">
              Category: {blog.category || 'Uncategorized'} • {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;