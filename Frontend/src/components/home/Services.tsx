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

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 text-xs font-semibold bg-white text-emerald-600 rounded-full uppercase tracking-wider mb-4">
            SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Everything Your Logistics Department Would Do — I Do It
          </h2>
          <p className="text-lg mt-4 opacity-90">
            From sourcing to shipping, I handle every step so you can focus on
            growing your business — without hiring a team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Product Sourcing",
              img: "https://www.unleashedsoftware.com/media/scraper/pexels-pavel-danilyuk-7675016-1.jpg?rmode=max&width=855",
              desc: "Helping you find reliable suppliers in China and source high-quality products at competitive prices — no guesswork, no middlemen.",
            },
            {
              title: "Product Inspection",
              img: "https://www.jonble.com/wp-content/uploads/2020/07/product-inspection-process.jpg",
              desc: "Identifying and rectifying any potential issues in your products before they ship — helping you avoid costly returns and protect your brand.",
            },
            {
              title: "Freight Forwarding",
              img: "https://www.seaspace-int.com/wp-content/uploads/2017/12/Golden_Passenger_1.jpg",
              desc: "Handling the coordination, documentation, and transportation of your goods from China to your doorstep — with real-time tracking and zero stress.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all"
            >
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-200 text-sm">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-emerald-600 hover:bg-emerald-50 border-emerald-600"
          >
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
