import { useParams } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { useGetBlogByIdQuery } from "@/store/api";
import { Button } from "@/components/ui/button";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, error } = useGetBlogByIdQuery(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading blog post...
          </p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Blog Post
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error instanceof Error
              ? error.message
              : "Blog post not found"}
          </p>
          <Button
            onClick={() => window.location.href = "/blogs"}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl"
          >
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back to blogs button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            ← Back to Blogs
          </Button>
        </div>

        {/* Blog Content */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="h-64 md:h-96 overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog Header */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-sm font-semibold px-4 py-2 rounded-full">
                {blog.category || "Uncategorized"}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8">
              <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {blog.author}
              </span>
            </div>

            {/* Full Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;