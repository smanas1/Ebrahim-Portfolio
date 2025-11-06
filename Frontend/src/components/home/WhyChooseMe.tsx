import { Check } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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

const WhyChooseMe = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <h2 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Why Choose <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}>Ebrahim Kamal</span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
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
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>
            <div className={`mt-6 p-4 ${theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50'} rounded-lg border-l-4 border-emerald-500`}>
              <p className={theme === 'dark' ? 'text-emerald-300 font-medium' : 'text-emerald-700 font-medium'}>
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
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl p-6 shadow-lg ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-xl transition-shadow`}>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
                Before & After Savings
              </h3>
              <div className="space-y-6">
                <div className={`flex justify-between items-center pb-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border-b`}>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Before Ebrahim</span>
                  <span className={theme === 'dark' ? 'text-white font-bold' : 'text-gray-900 font-bold'}>
                    $18.50
                  </span>
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} ml-1`}>Per unit cost</div>
                <div className={`flex justify-between items-center pb-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} border-b`}>
                  <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'} font-medium`}>
                    After Ebrahim
                  </span>
                  <span className={`${theme === 'dark' ? 'text-red-400 font-bold' : 'text-red-600 font-bold'}`}>
                    $12.95
                  </span>
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} ml-1`}>Per unit cost</div>
                <div className={`${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'} rounded-lg p-4 mt-4`}>
                  <div className="flex justify-between items-center">
                    <span className={theme === 'dark' ? 'text-green-300 font-medium' : 'text-green-700 font-medium'}>
                      Annual Savings
                    </span>
                    <span className={theme === 'dark' ? 'text-green-300 font-bold' : 'text-green-700 font-bold'}>
                      $55,500
                    </span>
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
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
