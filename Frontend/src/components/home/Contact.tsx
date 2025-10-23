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

const Contact = () => {
  return (
    <section className="py-20 bg-gray-900 text-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="lg:w-1/2 p-8 md:p-12 bg-white text-gray-800">
              <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-wider mb-4">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Freight Isn’t Just About Shipping.
                <br />
                <span className="text-emerald-600">It’s About Growth.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Let’s scale together. Whether you’re sourcing your first product
                or expanding globally — I’m here to help you grow smarter,
                faster, and with less stress.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Ex. John"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Ex. Lewis"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+8801750062927"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                  ></textarea>
                </div>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Speak to Ebrahim Directly
                  </Button>
                </div>
              </form>
            </div>
            <div className="lg:w-1/2 bg-gray-800 flex items-center justify-center p-8">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153159/Ebrahim/IMG_9765_lkkcjh.jpg"
                  alt="Ebrahim Kamal"
                  className="rounded-xl w-full max-w-sm h-auto object-cover shadow-lg border-4 border-white/20"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium">
                  Based in Bangladesh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
