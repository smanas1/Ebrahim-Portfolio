import { Award, Check, ChevronUp, Zap, Target, Truck } from "lucide-react";

// Icon Component — Using Lucide React Icons
const Icon = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconMap: Record<string, any> = {
    zap: Zap,
    target: Target,
    truck: Truck,
  };
  const SelectedIcon = iconMap[name] || Zap;
  return <SelectedIcon className={className} />;
};

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

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-full uppercase tracking-wider mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            My Simple 3-Step Process
          </h2>
          <p className="text-lg text-gray-600">
            At Ebrahim Kamal, I offer personalized, end-to-end logistics
            support — no corporate jargon, no long contracts. Just clear steps
            to get your products moving.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-12">
          <div className="flex flex-col items-center text-center w-full lg:w-1/3">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Icon name="zap" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 1</h3>
            <p className="text-gray-600">
              I Understand Your Freight Needs — whether you're launching your
              first product or scaling globally.
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <ChevronUp className="w-5 h-5 text-gray-600 rotate-90" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center w-full lg:w-1/3">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Icon name="target" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 2</h3>
            <p className="text-gray-600">
              I Build a Scalable Strategy — customized to your budget,
              timeline, and business goals.
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <ChevronUp className="w-5 h-5 text-gray-600 rotate-90" />
            </div>
          </div>
          <div className="flex flex-col items-center text-center w-full lg:w-1/3">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Icon name="truck" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Step 3</h3>
            <p className="text-gray-600">
              I Manage, Track & Deliver — from factory to doorstep. You get
              real-time updates and peace of mind.
            </p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-xl font-bold text-gray-800">
            Your dedicated logistics partner. No contracts. No hassle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;