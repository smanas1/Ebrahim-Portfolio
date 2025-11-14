import { useTheme } from "@/context/ThemeContext";
import { Calendar } from "lucide-react";
import { useGetAllBlogsQuery } from "@/store/api";

// Reusable Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "red";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseClasses =
    "font-medium rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-500",
    outline:
      "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white",
    red: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

const Blog = () => {
  const { theme } = useTheme();
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();

  // Filter published blogs
  const publishedBlogs = blogs;

  // Get the first 3 blogs for the main display
  const featuredBlogs = publishedBlogs?.slice(0, 3);

  // Get next 3 blogs for the "Recent Articles" section
  const recentBlogs = publishedBlogs?.slice(3, 6);

  if (isLoading) {
    return (
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className={`inline-block px-4 py-1 text-xs font-semibold ${
                theme === "dark"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-600 text-white"
              } rounded-full uppercase tracking-wider mb-4`}
            >
              ARTICLES
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Smart Freight Insights & Seller Strategies
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } mt-4`}
            >
              Loading articles...
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } rounded-xl overflow-hidden shadow-md h-80 animate-pulse`}
              >
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } h-48 w-full`}
                ></div>
                <div className="p-6">
                  <div
                    className={`${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } h-4 rounded mb-2 w-3/4`}
                  ></div>
                  <div
                    className={`${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } h-4 rounded mb-4 w-full`}
                  ></div>
                  <div
                    className={`${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    } h-3 rounded w-1/2`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span
              className={`inline-block px-4 py-1 text-xs font-semibold ${
                theme === "dark"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-600 text-white"
              } rounded-full uppercase tracking-wider mb-4`}
            >
              ARTICLES
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Smart Freight Insights & Seller Strategies
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } mt-4`}
            >
              Error loading blog articles
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-16 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className={`inline-block px-4 py-1 text-xs font-semibold ${
              theme === "dark"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-600 text-white"
            } rounded-full uppercase tracking-wider mb-4`}
          >
            ARTICLES
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Smart Freight Insights & Seller Strategies
          </h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } mt-4`}
          >
            I share practical, no-fluff insights from my 8+ years in global
            sourcing and logistics — so you can make smarter decisions, avoid
            costly mistakes, and scale with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredBlogs?.map((blog) => (
            <div
              key={blog._id}
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow`}
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  width="400"
                  height="192"
                />
              )}
              {!blog.coverImage && (
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  } w-full h-48 flex items-center justify-center`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">B</span>
                    </div>
                    <p className="mt-2 text-sm opacity-75">No image</p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-2 line-clamp-2`}
                >
                  {blog.title}
                </h3>
                <p
                  className={
                    theme === "dark"
                      ? "text-gray-300"
                      : "text-gray-600" + " mb-4 line-clamp-3"
                  }
                >
                  {blog.content.substring(0, 120)}...
                </p>
                <a
                  href={`/blog/${blog._id}`}
                  className={`${
                    theme === "dark"
                      ? "text-emerald-400 hover:text-emerald-300"
                      : "text-emerald-600 hover:text-emerald-700"
                  } font-medium inline-flex items-center gap-1`}
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`mt-12 pt-8 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          } border-t`}
        >
          <h3
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            } mb-6`}
          >
            Recent Articles
          </h3>
          <div className="space-y-6">
            {recentBlogs?.map((blog, i) => (
              <div
                key={`${blog._id}-${i}`}
                className={`${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                } border-b pb-4 last:border-b-0`}
              >
                <div
                  className={`flex items-center gap-2 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  } mb-1`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h4
                  className={`font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  } mb-1`}
                >
                  {blog.title}
                </h4>
                <p
                  className={
                    theme === "dark"
                      ? "text-gray-400"
                      : "text-gray-600" + " text-sm line-clamp-2"
                  }
                >
                  {blog.content.substring(0, 100)}...
                </p>
                <a
                  href={`/blog/${blog._id}`}
                  className={`${
                    theme === "dark"
                      ? "text-emerald-400 hover:text-emerald-300"
                      : "text-emerald-600 hover:text-emerald-700"
                  } text-sm font-medium mt-2 inline-block`}
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/blogs")}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
