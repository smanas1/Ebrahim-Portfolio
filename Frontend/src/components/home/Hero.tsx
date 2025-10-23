import { 
  Zap, 
  Shield, 
  Target, 
  Star 
} from "lucide-react";

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
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

const Hero = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-black z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-900/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-emerald-700/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <p className="text-sm uppercase tracking-wider opacity-80 text-emerald-400">
              SOURCING & LOGISTICS EXPERT
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Freight Done Right — <br />
              <span className="text-emerald-500">Start to Finish</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              You don't need a logistics department. You need a logistics
              partner. From sourcing to doorstep delivery, I handle everything
              so you can focus on growing your business.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <span>Efficient end-to-end solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <span>Trusted by 50+ businesses globally</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <span>Cost optimization guaranteed</span>
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
                    className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-bold text-emerald-400">50+</span> 
                  satisfied clients worldwide
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">
                    Average Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-emerald-900/20 rounded-2xl -z-10"></div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700">
                <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center">
                  <img
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 mb-6 flex items-center justify-center"
                    src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153175/Ebrahim/DSC013sadasd41_y6f6qe.jpg"
                    alt="Ebrahim Mohammad Kamal"
                  />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Ebrahim Mohammad Kamal
                  </h3>
                  <p className="text-emerald-400 mb-4">
                    Sourcing & Logistics Expert
                  </p>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">8+</div>
                      <div className="text-sm text-gray-400">Years Exp</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        $4M+
                      </div>
                      <div className="text-sm text-gray-400">Sourced</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">50+</div>
                      <div className="text-sm text-gray-400">Clients</div>
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