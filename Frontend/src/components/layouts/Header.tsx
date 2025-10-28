import {
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

interface NavItem {
  label: string;
  href?: string;
  dropdown?: boolean;
  subItems?: SubItem[];
}

interface SubItem {
  title: string;
  items: { label: string; href: string; tag?: string }[];
}

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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about" },
    {
      label: "Services",
      dropdown: true,
      subItems: [
        {
          title: "Product Sourcing",
          items: [
            { label: "Sourcing from China", href: "#", tag: "Popular" },
            { label: "Supplier Verification", href: "#" },
          ],
        },
        {
          title: "Quality Control",
          items: [
            { label: "Pre-Production Inspection", href: "#" },
            { label: "During Production Inspection", href: "#" },
            { label: "Pre-Shipment Inspection", href: "#" },
            { label: "Sample Inspection", href: "#", tag: "Trending" },
          ],
        },
        {
          title: "Logistics",
          items: [
            { label: "Sea Freight", href: "#" },
            { label: "Air Freight", href: "#" },
            { label: "Express Courier", href: "#" },
          ],
        },
        {
          title: "Fulfillment",
          items: [
            { label: "Amazon FBA Prep", href: "#" },
            { label: "3PL Services", href: "#" },
          ],
        },
        {
          title: "Photography",
          items: [
            { label: "Product Photography", href: "#" },
            { label: "Lifestyle Photography", href: "#" },
          ],
        },
      ],
    },
    { label: "Products", href: "/products" },
    { label: "Blog", href: "/blogs" },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+8801750062927</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>thisisebrahim@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon - Sat : 8am-6pm</span>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-emerald-200 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-emerald-200 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-xl font-bold text-emerald-500">
                EBRAHIM KAMAL
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdown ? (
                    <div className="flex items-center gap-1 cursor-pointer group">
                      <span className="text-gray-300 hover:text-emerald-400 font-medium group-hover:text-emerald-400 transition-colors">
                        {item.label}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  ) : (
                    <Link
                      to={item.href || "#"}
                      className="text-gray-300 hover:text-emerald-400 font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex gap-3">
                <ThemeToggle />
                <Button variant="outline" size="sm">
                  Contact
                </Button>
                <Button variant="primary" size="sm">
                  Hire Me
                </Button>
              </div>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-emerald-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href || "#"}
                  className="text-gray-300 hover:text-emerald-400 py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <ThemeToggle />
                <Button variant="outline" size="sm" className="w-full">
                  Contact
                </Button>
                <Button variant="primary" size="sm" className="w-full">
                  Hire Me
                </Button>
                </div>
            </div>
          </div>
        )}
      </header>

      {/* Services Dropdown */}
      {activeDropdown === "Services" && (
        <div
          className="fixed inset-x-0 top-16 z-50 bg-gray-900 shadow-2xl border-b border-gray-800"
          onMouseEnter={() => setActiveDropdown("Services")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Professional Services
                </h3>
                <p className="text-gray-400 mb-6">
                  As an experienced sourcing and logistics expert, I provide
                  end-to-end solutions to help you navigate the complexities of
                  global trade.
                </p>
                <div className="bg-gradient-to-r from-emerald-900/50 to-emerald-700/50 p-6 rounded-xl border border-emerald-800/50">
                  <h4 className="font-bold text-emerald-400 mb-2">
                    Why Choose Me?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>8+ Years Experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>4M+ USD in Products Sourced</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span>Personalized Attention</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {navItems
                  .find((item) => item.label === "Services")
                  ?.subItems?.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                    >
                      <h4 className="text-lg font-bold text-white mb-3">
                        {subItem.title}
                      </h4>
                      <ul className="space-y-2">
                        {subItem.items.map((service, serviceIndex) => (
                          <li key={serviceIndex}>
                            <a
                              href={service.href}
                              className="text-gray-300 hover:text-emerald-400 flex justify-between items-center py-2 transition-colors"
                            >
                              <span>{service.label}</span>
                              {service.tag && (
                                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                                  {service.tag}
                                </span>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
