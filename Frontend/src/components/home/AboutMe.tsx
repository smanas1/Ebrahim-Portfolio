import { Award } from "lucide-react";

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

const AboutMe = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      <div className="absolute top-10 left-0 w-32 h-32 bg-emerald-900/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-0 w-48 h-48 bg-emerald-700/10 rounded-full blur-xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dtyqscfja/image/upload/v1761153173/Ebrahim/Ibrahim_HD_edited_3_qcawtw.jpg"
                  alt="Ebrahim Kamal - Sourcing & Logistics Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-emerald-500/20 to-transparent rotate-45 rounded-lg"></div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-900 text-emerald-300 rounded-full uppercase tracking-wider">
              ABOUT ME
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              I Help You Scale Without Hiring a Team
            </h2>
            <p className="text-lg text-gray-300">
              As your dedicated sourcing and logistics partner, I handle
              everything from finding reliable suppliers in China to delivering
              your products to your doorstep — so you can focus on growing your
              business, not managing operations.
            </p>
            <div className="space-y-4 pt-4">
              <p className="text-gray-400">
                Whether you’re a first-time importer or scaling across borders,
                I act as your <strong>personal freight team</strong>. No
                corporate bureaucracy. Just results.
              </p>
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <div className="font-bold text-white">
                    Trusted by 50+ Businesses
                  </div>
                  <div className="text-sm text-gray-400">
                    Rated 4.9/5 by clients worldwide
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 flex flex-wrap gap-4">
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
                Let’s Work Together
              </Button>
              <Button variant="outline" size="lg">
                View My Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
