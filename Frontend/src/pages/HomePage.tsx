import {
  Clock,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
  Check,
  ChevronDown,
  Menu,
  X,
  Truck,
  Package,
  Camera,
  Box,
  ShoppingCart,
  Globe,
  Award,
  Users,
  Zap,
  Shield,
  Target,
} from "lucide-react";
import { useState } from "react";

// Define types for our navigation items
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
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseClasses =
    "font-medium rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white focus:ring-gray-500",
    outline:
      "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
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

// Icon Component — Using Lucide React Icons
const Icon = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  const iconMap: Record<string, any> = {
    phone: Phone,
    mail: Mail,
    clock: Clock,
    facebook: () => <div className="bg-blue-600 rounded-full w-5 h-5"></div>,
    instagram: Instagram,
    check: Check,
    "chevron-down": ChevronDown,
    menu: Menu,
    x: X,
    truck: Truck,
    package: Package,
    camera: Camera,
    box: Box,
    "shopping-cart": ShoppingCart,
    globe: Globe,
    award: Award,
    users: Users,
    zap: Zap,
    shield: Shield,
    target: Target,
  };

  const SelectedIcon = iconMap[name] || Phone;

  return <SelectedIcon className={className} />;
};

// Product Card Component
const ProductCard = ({
  name,
  image,
  details,
  moq,
  cost,
  sampleCost,
  shipping,
  asin,
}: {
  name: string;
  image: string;
  details: string;
  moq: string;
  cost: string;
  sampleCost: string;
  shipping: string;
  asin: string;
}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4">{details}</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-500">MOQ</p>
            <p className="text-red-400 font-medium">{moq}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Cost</p>
            <p className="text-red-400 font-medium">{cost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sample Cost</p>
            <p className="text-red-400 font-medium">{sampleCost}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Shipping</p>
            <p className="text-red-400 font-medium">{shipping}</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
            ASIN: {asin}
          </span>
          <button className="text-red-500 hover:text-red-400 text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard = ({
  title,
  excerpt,
  date,
  category,
}: {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{excerpt}</p>
        <button className="text-red-500 hover:text-red-400 text-sm font-medium">
          Read More →
        </button>
      </div>
    </div>
  );
};

// Main HomePage Component
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
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
    { label: "Products", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const services = [
    {
      icon: "package",
      title: "Product Sourcing",
      description:
        "Find reliable suppliers and source quality products from trusted manufacturers.",
      tag: "Best Seller",
    },
    {
      icon: "truck",
      title: "Logistics & Shipping",
      description:
        "Seamless shipping solutions from origin to destination with real-time tracking.",
      tag: "New",
    },
    {
      icon: "camera",
      title: "Product Photography",
      description:
        "Professional product photography to enhance your online presence and sales.",
      tag: "Trending",
    },
    {
      icon: "box",
      title: "Fulfillment Services",
      description:
        "Complete warehousing and fulfillment solutions for your e-commerce business.",
      tag: "Popular",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Entrepreneur",
      content:
        "Working with Ebrahim transformed my supply chain. His attention to detail and professionalism saved me thousands in shipping costs.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Designer",
      content:
        "The product photography service exceeded my expectations. The images helped increase my conversion rate by 30%.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Amazon Seller",
      content:
        "Ebrahim's inspection services caught defects before they became costly returns. His expertise is invaluable.",
      rating: 4,
    },
  ];

  const products = [
    {
      name: "Wireless Bluetooth Headphones",
      image: "headphones",
      details:
        "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      moq: "500 units",
      cost: "$12.50/unit",
      sampleCost: "$25",
      shipping: "$2.50/unit",
      asin: "B08XXXXXX",
    },
    {
      name: "Smart Fitness Tracker",
      image: "tracker",
      details:
        "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life.",
      moq: "1000 units",
      cost: "$8.75/unit",
      sampleCost: "$20",
      shipping: "$3.25/unit",
      asin: "B08YYYYYY",
    },
    {
      name: "Ceramic Cookware Set",
      image: "cookware",
      details:
        "Non-toxic ceramic cookware set with 10 pieces, PTFE-free coating.",
      moq: "200 sets",
      cost: "$45.00/set",
      sampleCost: "$65",
      shipping: "$8.00/set",
      asin: "B08ZZZZZZ",
    },
    {
      name: "LED Desk Lamp",
      image: "lamp",
      details:
        "Adjustable LED desk lamp with touch controls and multiple brightness settings.",
      moq: "300 units",
      cost: "$15.25/unit",
      sampleCost: "$30",
      shipping: "$1.75/unit",
      asin: "B08AAAAAA",
    },
  ];

  const blogs = [
    {
      title: "The Complete Guide to Sourcing from China",
      excerpt:
        "Learn how to find reliable suppliers, negotiate prices, and avoid common pitfalls when sourcing products from China.",
      date: "Oct 15, 2023",
      category: "Sourcing",
    },
    {
      title: "Quality Control: What Every Importer Should Know",
      excerpt:
        "Essential quality control steps to ensure your products meet standards before shipping.",
      date: "Sep 28, 2023",
      category: "Quality",
    },
    {
      title: "Shipping Options: Air vs Sea Freight",
      excerpt:
        "A comparison of air and sea freight options for different types of products and business needs.",
      date: "Sep 10, 2023",
      category: "Logistics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white text-sm py-2 px-4">
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
            <a href="#" className="hover:text-red-200 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-200 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-xl font-bold text-red-500">
                EBRAHIM KAMAL
              </div>
            </div>

            {/* Desktop Navigation */}
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
                      <span className="text-gray-300 hover:text-red-400 font-medium group-hover:text-red-400 transition-colors">
                        {item.label}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-red-400 font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Contact
                </Button>
                <Button variant="primary" size="sm">
                  Hire Me
                </Button>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-red-400 focus:outline-none"
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
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-red-400 py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex gap-3">
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

      {/* Services Dropdown - Full Screen Overlay */}
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
                <div className="bg-gradient-to-r from-red-900/50 to-red-700/50 p-6 rounded-xl border border-red-800/50">
                  <h4 className="font-bold text-red-400 mb-2">
                    Why Choose Me?
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>8+ Years Experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>4M+ USD in Products Sourced</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
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
                              className="text-gray-300 hover:text-red-400 flex justify-between items-center py-2 transition-colors"
                            >
                              <span>{service.label}</span>
                              {service.tag && (
                                <span className="ml-2 text-xs bg-red-900 text-red-300 px-2 py-0.5 rounded">
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-black z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-red-700/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <p className="text-sm uppercase tracking-wider opacity-80 text-red-400">
                SOURCING & LOGISTICS EXPERT
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Freight Done Right — <br />
                <span className="text-red-500">Start to Finish</span>
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                You don't need a logistics department. You need a logistics
                partner. From sourcing to doorstep delivery, I handle everything
                so you can focus on growing your business.
              </p>

              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <span>Efficient end-to-end solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  <span>Trusted by 50+ businesses globally</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center">
                    <Target className="w-5 h-5 text-red-400" />
                  </div>
                  <span>Cost optimization guaranteed</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
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
                    <span className="font-bold text-red-400">50+</span>{" "}
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
                <div className="absolute -top-6 -left-6 w-full h-full bg-red-900/20 rounded-2xl -z-10"></div>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 border border-gray-700">
                  <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-700 to-red-900 mb-6 flex items-center justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Ebrahim Mohammad Kamal
                    </h3>
                    <p className="text-red-400 mb-4">
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

      {/* Stats Section */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500">$4M+</div>
              <div className="text-gray-400">Products Sourced</div>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500">50+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500">8+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-red-500">98%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My Professional Services
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive solutions tailored to your business needs, from
              sourcing to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-red-900 flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <Icon name={service.icon} className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                {service.tag && (
                  <span className="inline-block px-3 py-1 text-xs bg-red-900 text-red-300 rounded-full">
                    {service.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-gray-400 text-lg">
              Products I've successfully sourced for clients with detailed
              specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                image={product.image}
                details={product.details}
                moq={product.moq}
                cost={product.cost}
                sampleCost={product.sampleCost}
                shipping={product.shipping}
                asin={product.asin}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industry Insights
            </h2>
            <p className="text-gray-400 text-lg">
              Latest trends, tips, and strategies in sourcing and logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard
                key={index}
                title={blog.title}
                excerpt={blog.excerpt}
                date={blog.date}
                category={blog.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-400 text-lg">
              What my clients say about working with me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-600 border-2 border-red-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/30 to-red-700/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Supply Chain?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Let's discuss how I can help you reduce costs, improve efficiency,
            and grow your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg">
              Schedule a Call
            </Button>
            <Button variant="outline" size="lg">
              View My Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-4">
                EBRAHIM KAMAL
              </h3>
              <p className="text-gray-400 mb-4">
                Sourcing & Logistics Expert helping businesses navigate global
                trade.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Product Sourcing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Quality Control
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Logistics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Fulfillment
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">
                Contact Info
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-500 mt-0.5" />
                  <span className="text-gray-400">+8801750062927</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-500 mt-0.5" />
                  <span className="text-gray-400">thisisebrahim@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                  <span className="text-gray-400">Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Ebrahim Mohammad Kamal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
          <div className="relative">
            <Phone className="w-6 h-6 text-white" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
