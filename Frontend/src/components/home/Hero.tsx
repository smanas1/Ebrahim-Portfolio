import { Zap, Shield, Target, Star } from "lucide-react";
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

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-emerald-900/20 to-gray-900' : 'from-emerald-100/30 to-white'} z-0`}></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <p className={`text-sm uppercase tracking-wider opacity-80 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
              SOURCING & LOGISTICS EXPERT
            </p>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Freight Done Right — <br />
              <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}>Start to Finish</span>
            </h1>
            <p className={`text-lg md:text-xl ${theme === 'dark' ? 'opacity-90 text-gray-300' : 'opacity-90 text-gray-700'}`}>
              You don't need a logistics department. You need a logistics
              partner. From sourcing to doorstep delivery, I handle everything
              so you can focus on growing your business.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-emerald-900' : 'bg-emerald-100'} flex items-center justify-center`}>
                  <Zap className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Efficient end-to-end solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-emerald-900' : 'bg-emerald-100'} flex items-center justify-center`}>
                  <Shield className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Trusted by 50+ businesses globally</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-emerald-900' : 'bg-emerald-100'} flex items-center justify-center`}>
                  <Target className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Cost optimization guaranteed</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {/* 🔴 Primary CTA changed to red for emphasis */}
              <Button variant="red" size="lg">
                Book a Consultation
              </Button>
              <Button variant="outline" size="lg">
                View My Work
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-700 border-gray-800 text-white' : 'bg-gray-300 border-gray-400 text-gray-800'} border-2 flex items-center justify-center text-xs font-bold`}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>50+</span>
                  satisfied clients worldwide
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 text-yellow-400 fill-yellow-400`}
                    />
                  ))}
                  <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Average Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className={`absolute -top-6 -left-6 w-full h-full ${theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-200/30'} rounded-2xl -z-10`}></div>
              <div className={`bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900' : 'from-gray-100 to-gray-200'} rounded-2xl p-1 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 flex flex-col items-center`}>
                  <img
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 mb-6 flex items-center justify-center"
                    src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153175/Ebrahim/DSC013sadasd41_y6f6qe.jpg"
                    alt="Ebrahim Mohammad Kamal"
                  />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Ebrahim Mohammad Kamal
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Sourcing & Logistics Expert
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>8+</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>$4M+</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sourced</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>50+</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Clients</div>
                    </div>
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

export default Hero;
