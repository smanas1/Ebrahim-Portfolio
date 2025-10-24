import { Check } from "lucide-react";

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

const WhyChooseMe = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose <span className="text-emerald-600">Ebrahim Kamal</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              I operate as your dedicated logistics partner — handling sourcing,
              shipping, customs, and coordination with zero overhead. No
              corporate fluff. Just results.
            </p>
            <ul className="space-y-4">
              {[
                "No internal logistics hires required",
                "Dedicated support & 24/7 tracking",
                "Transparent pricing, zero guesswork",
                "Scalable for SMEs and large enterprises",
                "All transport modes: Road, Sea, Air, Rail",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
              <p className="text-emerald-700 font-medium">
                → What if you could eliminate freight headaches and cut costs by
                30%?
              </p>
            </div>
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  window.scrollTo({
                    top: document.getElementById("contact")?.offsetTop || 0,
                    behavior: "smooth",
                  })
                }
              >
                Give It a Try
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Before & After Savings
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                  <span className="text-gray-600">Before Ebrahim</span>
                  <span className="text-2xl font-bold text-gray-900">
                    $18.50
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-1">Per unit cost</div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                  <span className="text-red-600 font-medium">
                    After Ebrahim
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    $12.95
                  </span>
                </div>
                <div className="text-xs text-gray-500 ml-1">Per unit cost</div>
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-medium">
                      Annual Savings
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      $55,500
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Based on 10,000 units
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
