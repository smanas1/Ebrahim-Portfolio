import { Calendar } from "lucide-react";

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
      "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500",
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
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full uppercase tracking-wider mb-4">
            ARTICLES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Smart Freight Insights & Seller Strategies
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            I share practical, no-fluff insights from my 8+ years in global
            sourcing and logistics — so you can make smarter decisions, avoid
            costly mistakes, and scale with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              img: "https://expressitdelivery.com/wp-content/uploads/2022/01/01-in-house-vs-outsourced-logistics.jpg",
              date: "04 August 2025",
              title:
                "Should You Build an In-House Logistics Team or Outsource It?",
              excerpt:
                "When it comes to freight management, businesses face a crucial decision...",
            },
            {
              img: "https://www.icw.io/wp-content/uploads/2022/11/2-Pre-shipment-Inspection2_2-10.jpg",
              date: "23 June 2023",
              title: "The Important Aspect of Pre-Shipment Inspection",
              excerpt:
                "Conducting an inspection prior to shipment ensures the quality...",
            },
            {
              img: "https://d2lewffsa8rdxy.cloudfront.net/wp-content/uploads/2022/06/Steps-involved-in-pre-shipment-inspection-1024x576.jpg",
              date: "23 November 2021",
              title: "5 Important Aspects of a Pre-Shipment Inspection",
              excerpt:
                "Conducting an inspection prior to shipment ensures the quality...",
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              {post.img && (
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Recent Articles
          </h3>
          <div className="space-y-6">
            {[
              {
                date: "21 November 2021",
                title: "Role of Inspection and Testing in Maintaining Quality",
                excerpt:
                  "In manufacturing and other industries, maintaining high-quality standards...",
              },
              {
                date: "20 November 2021",
                title:
                  "What Can Cause Professional Quality Inspectors to Miss QC Issues?",
                excerpt:
                  "Professional quality inspectors are responsible for ensuring that products...",
              },
              {
                date: "18 November 2021",
                title: "How to Negotiate with Chinese Suppliers Like a Pro",
                excerpt:
                  "Negotiating with suppliers in China requires cultural awareness...",
              },
            ].map((article, i) => (
              <div
                key={i}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">
                  {article.title}
                </h4>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {article.excerpt}
                </p>
                <a
                  href="#"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2 inline-block"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
