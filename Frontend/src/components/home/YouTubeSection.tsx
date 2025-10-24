import { Youtube } from "lucide-react";

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

const YouTubeSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Creating Content To Help Sellers
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              I share real-world insights, sourcing hacks, and logistics tips —
              straight from my 8+ years of experience helping sellers scale
              globally.
            </p>
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80"
                alt="Ebrahim Kamal - Sourcing Tips Before Visiting China"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path d="M7.5 3.75C7.5 2.784 8.314 2 9.375 2h4.875c1.061 0 1.875.784 1.875 1.75v16.5c0 .966-.814 1.75-1.875 1.75H9.375C8.314 22 7.5 21.216 7.5 20.25V3.75Z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-medium line-clamp-2">
                  From My Experience: Tips for Sourcing Before Visiting China
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                {
                  title: "Modern Sourcing Requires Smart Strategy",
                  img: "https://simfoni.com/wp-content/uploads/2022/02/What-is-Strategic-Sourcing.png.webp",
                },
                {
                  title: "How to Negotiate with Chinese Suppliers",
                  img: "https://s-media-cache-ak0.pinimg.com/originals/0b/f5/45/0bf5455e8f42611706b2fba8bb17ab21.jpg",
                },
                {
                  title: "Avoid These 5 Shipping Mistakes",
                  img: "https://media.licdn.com/dms/image/v2/D5612AQE-CM5qo691Ew/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680193177755?e=2147483647&v=beta&t=l0wBzgxr9Ta6XSsnIn_xo2vqZCsVvld4LALVMlopgDw",
                },
              ].map((video, i) => (
                <div
                  key={i}
                  className="relative rounded-lg overflow-hidden shadow-sm border border-gray-200 group"
                >
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M7.5 3.75C7.5 2.784 8.314 2 9.375 2h4.875c1.061 0 1.875.784 1.875 1.75v16.5c0 .966-.814 1.75-1.875 1.75H9.375C8.314 22 7.5 21.216 7.5 20.25V3.75Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs text-white line-clamp-1">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="outline" size="sm">
                Load More...
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-blue-600 flex justify-between items-center hover:bg-blue-700"
              >
                <Youtube />
                Subscribe
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wider mb-4">
              GET INSIDER TIPS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Creating Content To Help Sellers
            </h2>
            <p className="text-lg text-gray-600">
              Take action today and experience the difference I can make for
              your business.
            </p>
            <p className="text-gray-600 mt-4">
              Watch my videos on YouTube where I share insider tips and
              knowledge to help sellers like you understand the intricacies of
              sourcing, logistics, and global trade — so you can grow your
              business smarter, faster, and with less stress.
            </p>
            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Visit My YouTube Channel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
