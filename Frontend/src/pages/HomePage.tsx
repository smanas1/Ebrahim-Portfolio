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
  Calendar,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Blog Card Component

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

      {/* About Me Section - Personal Brand Focus */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-0 w-32 h-32 bg-red-900/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-0 w-48 h-48 bg-red-700/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side: Photo + Visual Accents */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                {/* Placeholder for real photo */}
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-red-500 shadow-2xl">
                  <img
                    src="https://via.placeholder.com/600x600?text=Ebrahim+Kamal"
                    alt="Ebrahim Kamal - Sourcing & Logistics Expert"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Diagonal Striped Accent */}
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-red-500/20 to-transparent rotate-45 rounded-lg"></div>
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-900 text-red-300 rounded-full uppercase tracking-wider">
                ABOUT ME
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                I Help You Scale Without Hiring a Team
              </h2>

              <p className="text-lg text-gray-300">
                As your dedicated sourcing and logistics partner, I handle
                everything from finding reliable suppliers in China to
                delivering your products to your doorstep — so you can focus on
                growing your business, not managing operations.
              </p>

              <div className="space-y-4 pt-4">
                <p className="text-gray-400">
                  Whether you’re a first-time importer or scaling across
                  borders, I act as your <strong>personal freight team</strong>.
                  No corporate bureaucracy. Just results.
                </p>

                {/* Social Proof Badge */}
                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
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

              {/* CTA Buttons */}
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

      {/* Service Process / How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-600 text-white rounded-full uppercase tracking-wider mb-4">
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

          {/* Steps */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/3">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Icon name="zap" className="w-8 h-8 text-white" />{" "}
                {/* Brain Icon */}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 1</h3>
              <p className="text-gray-600">
                I Understand Your Freight Needs — whether you're launching your
                first product or scaling globally.
              </p>
            </div>

            {/* Arrow Separator */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <ChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/3">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Icon name="target" className="w-8 h-8 text-white" />{" "}
                {/* Target/Blueprint Icon */}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 2</h3>
              <p className="text-gray-600">
                I Build a Scalable Strategy — customized to your budget,
                timeline, and business goals.
              </p>
            </div>

            {/* Arrow Separator */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <ChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/3">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Icon name="truck" className="w-8 h-8 text-white" />{" "}
                {/* Truck Icon */}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Step 3</h3>
              <p className="text-gray-600">
                I Manage, Track & Deliver — from factory to doorstep. You get
                real-time updates and peace of mind.
              </p>
            </div>
          </div>

          {/* Footer Tagline */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-xl font-bold text-gray-800">
              Your dedicated logistics partner. No contracts. No hassle.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Me - Modern UI/UX */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side: Benefits List */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why Choose <span className="text-red-600">Ebrahim Kamal</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                I operate as your dedicated logistics partner — handling
                sourcing, shipping, customs, and coordination with zero
                overhead. No corporate fluff. Just results.
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

              {/* Teaser Question */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <p className="text-red-700 font-medium">
                  → What if you could eliminate freight headaches and cut costs
                  by 30%?
                </p>
              </div>

              {/* CTA Button */}
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

            {/* Right Side: Savings Card */}
            <div className="lg:w-1/2">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Before & After Savings
                </h3>

                <div className="space-y-6">
                  {/* Before */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="text-gray-600">Before Ebrahim</span>
                    <span className="text-2xl font-bold text-gray-900">
                      $18.50
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-1">
                    Per unit cost
                  </div>

                  {/* After */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                    <span className="text-red-600 font-medium">
                      After Ebrahim
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      $12.95
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-1">
                    Per unit cost
                  </div>

                  {/* Annual Savings */}
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

      {/* Services Section - Red Gradient Background */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-white text-red-600 rounded-full uppercase tracking-wider mb-4">
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1: Product Sourcing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf340?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Product Sourcing Team in Warehouse"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Product Sourcing</h3>
                <p className="text-gray-200 text-sm">
                  Helping you find reliable suppliers in China and source
                  high-quality products at competitive prices — no guesswork, no
                  middlemen.
                </p>
              </div>
            </div>

            {/* Service 2: Product Inspection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581092680537-4f2e34a656d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Quality Inspector Checking Box"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Product Inspection</h3>
                <p className="text-gray-200 text-sm">
                  Identifying and rectifying any potential issues in your
                  products before they ship — helping you avoid costly returns
                  and protect your brand.
                </p>
              </div>
            </div>

            {/* Service 3: Freight Forwarding */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581092580537-4f2e34a656d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Cargo Ship with Containers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Freight Forwarding</h3>
                <p className="text-gray-200 text-sm">
                  Handling the coordination, documentation, and transportation
                  of your goods from China to your doorstep — with real-time
                  tracking and zero stress.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 border-red-600"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Our Partners / Trusted By Section */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full uppercase tracking-wider mb-4">
                PARTNERSHIPS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Trusted By & Collaborating With
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                I leverage my expertise and global network to deliver seamless
                logistics solutions — made possible through trusted
                relationships with leading platforms and service providers.
              </p>
            </div>

            {/* Optional Right-Aligned Text (Like Your Example) */}
            <div className="md:w-1/3 text-gray-600 text-sm leading-relaxed">
              I use my experience and global reach to drive economic prosperity
              for my clients — and I’m proud of the impact we’ve created
              together through long-term collaborations.
            </div>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {/* Row 1 */}
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_logo.svg"
                alt="Amazon FBA"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Alibaba_Logo.svg"
                alt="Alibaba"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/DHL_Logo.svg"
                alt="DHL"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/29/FedEx_Express_logo.svg"
                alt="FedEx"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Row 2 */}
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/UPS_Logo.svg"
                alt="UPS"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Shopify_Logo.svg"
                alt="Shopify"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Walmart_Logo.svg"
                alt="Walmart"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Etsy_logo.svg"
                alt="Etsy"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Optional CTA or Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              *Logos shown are for illustrative purposes. Ebrahim Kamal partners
              with these platforms to serve his clients globally.
            </p>
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

      {/* Serving Globally / Achievements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side: World Map */}
            <div className="lg:w-1/2 relative">
              {/* Dot-Style World Map SVG */}
              <div className="relative w-full h-[400px]">
                {/* Simplified SVG World Map (Dot Pattern) */}
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full fill-red-100 stroke-red-300 stroke-[0.5]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* North America */}
                  <path d="M100,50 L150,30 L200,60 L180,100 L120,90 Z" />
                  {/* South America */}
                  <path d="M150,120 L180,150 L160,180 L130,170 Z" />
                  {/* Europe */}
                  <path d="M300,80 L330,60 L350,90 L320,110 Z" />
                  {/* Africa */}
                  <path d="M320,120 L350,140 L330,170 L300,150 Z" />
                  {/* Asia */}
                  <path d="M400,70 L450,50 L500,80 L480,120 L420,110 Z" />
                  {/* Australia */}
                  <path d="M550,200 L580,210 L570,230 L540,220 Z" />
                  {/* Rest of the world dots */}
                  {Array.from({ length: 120 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={Math.random() * 700 + 50}
                      cy={Math.random() * 300 + 50}
                      r="1"
                      className="fill-red-400 opacity-30"
                    />
                  ))}
                </svg>

                {/* Pin Markers - Place where clients are located */}
                <div className="absolute top-[15%] left-[25%] w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute top-[30%] left-[15%] w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[40%] w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-2000"></div>
                <div className="absolute top-[50%] left-[60%] w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-3000"></div>
                <div className="absolute top-[60%] left-[75%] w-6 h-6 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse delay-4000"></div>
              </div>
            </div>

            {/* Right Side: Achievements */}
            <div className="lg:w-1/2 space-y-8">
              {/* Header */}
              <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-600 text-white rounded-full uppercase tracking-wider mb-4">
                OUR ACHIEVEMENTS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Serving Globally
              </h2>
              <p className="text-lg text-gray-600">
                With 8+ years of experience in international trade, I understand
                the intricacies of global logistics. From sourcing in China to
                delivery in the US, UK, Canada, and beyond — I make freight run
                like clockwork for my clients.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {/* Stat 1 */}
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-red-50 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">
                    5,000+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Projects Delivered
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-red-50 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">
                    $5M
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Orders Processed
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-red-50 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-red-600">
                    $2K+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Saved For Each Client
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What My Clients Say - Testimonial Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side: Testimonial */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                What My Clients Say
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                We used to juggle 4 different freight vendors. Ebrahim took over
                everything — sourcing, shipping, compliance — and saved us over{" "}
                <span className="font-bold text-red-300">£11,000</span> in the
                first quarter alone.
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="James R."
                  className="w-12 h-12 rounded-full border-2 border-red-500"
                />
                <div>
                  <div className="font-bold">James R.</div>
                  <div className="text-sm text-gray-300">
                    Logistics Manager, Midlands-Based Retail Chain
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Group Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team reviewing logistics dashboard"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                />
                {/* Optional Overlay Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Trusted By Bar */}
          <div className="mt-16 bg-black/80 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-white font-medium">Trusted by:</div>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {/* Logos */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_logo.svg"
                  alt="Amazon"
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Shopify_Logo.svg"
                  alt="Shopify"
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Netflix_2015_logo.svg"
                  alt="Netflix"
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Etsy_logo.svg"
                  alt="Etsy"
                  className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creating Content To Help Sellers - YouTube Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Side: Video Gallery */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Creating Content To Help Sellers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                I share real-world insights, sourcing hacks, and logistics tips
                — straight from my 8+ years of experience helping sellers scale
                globally.
              </p>

              {/* Main Video Preview */}
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 group">
                <img
                  src="https://via.placeholder.com/600x350?text=Ebrahim+on+YouTube"
                  alt="Ebrahim Kamal - Sourcing Tips Before Visiting China"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path d="M7.5 3.75C7.5 2.784 8.314 2 9.375 2h4.875c1.061 0 1.875.784 1.875 1.75v16.5c0 .966-.814 1.75-1.875 1.75H9.375C8.314 22 7.5 21.216 7.5 20.25V3.75Z" />
                    </svg>
                  </div>
                </div>
                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium line-clamp-2">
                    From My Experience: Tips for Sourcing Before Visiting China
                  </h3>
                </div>
              </div>

              {/* Video Thumbnails Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  {
                    title: "Modern Sourcing Requires Smart Strategy",
                    img: "https://via.placeholder.com/160x90?text=Video+1",
                  },
                  {
                    title: "How to Negotiate with Chinese Suppliers",
                    img: "https://via.placeholder.com/160x90?text=Video+2",
                  },
                  {
                    title: "Avoid These 5 Shipping Mistakes",
                    img: "https://via.placeholder.com/160x90?text=Video+3",
                  },
                ].map((video, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden shadow-sm border border-gray-200 group"
                  >
                    <img
                      src={video.img}
                      alt={video.title}
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-white"
                        >
                          <path d="M7.5 3.75C7.5 2.784 8.314 2 9.375 2h4.875c1.061 0 1.875.784 1.875 1.75v16.5c0 .966-.814 1.75-1.875 1.75H9.375C8.314 22 7.5 21.216 7.5 20.25V3.75Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-xs text-white line-clamp-1">
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More + Subscribe Buttons */}
              <div className="flex gap-4 mt-6">
                <Button variant="outline" size="sm">
                  Load More...
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a6.717 6.717 0 0 1 2.607 10.37c-1.842 1.08-3.775 1.76-5.728 1.924-2.473.218-4.807-.946-6.446-3.146-.374-.526-.588-1.14-.605-1.783-.018-.643.156-1.283.504-1.835.057-.091.122-.177.194-.258.184-.203.392-.382.617-.526.225-.144.468-.258.722-.337.255-.079.52-.127.79-.143.27-.016.544-.002.814.042.27.045.534.12.789.223.255.103.501.233.733.387.233.154.45.332.648.531.198.199.376.416.53.648.154.232.284.478.387.733.103.255.178.519.223.789.044.27.058.544.042.814-.016.27-.064.535-.143.79-.079.254-.193.497-.337.722-.144.225-.323.433-.526.617-.081.072-.167.137-.258.194-.552.348-1.192.522-1.835.504-.643-.017-1.257-.231-1.783-.605-2.2-1.639-3.364-4.003-3.146-6.446.164-1.953.844-3.886 1.924-5.728Z" />
                  </svg>
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full uppercase tracking-wider mb-4">
                GET INSIDER TIPS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Creating Content To Help Sellers
              </h2>
              <p className="text-lg text-gray-600">
                Take action today and experience the difference I can make for
                your business.
              </p>
              <p className="text-gray-600 mt-4">
                Watch my videos on YouTube where I share insider tips and
                knowledge to help sellers like you understand the intricacies of
                sourcing, logistics, and global trade — so you can grow your
                business smarter, faster, and with less stress.
              </p>

              {/* CTA Button */}
              <div className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Visit My YouTube Channel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Freight Insights & Seller Strategies - Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-600 text-white rounded-full uppercase tracking-wider mb-4">
              ARTICLES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Smart Freight Insights & Seller Strategies
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              I share practical, no-fluff insights from my 8+ years in global
              sourcing and logistics — so you can make smarter decisions, avoid
              costly mistakes, and scale with confidence.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1581092680537-4f2e34a656d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="In-House vs Outsourced Logistics"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>04 August 2025</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Should You Build an In-House Logistics Team or Outsource It?
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  When it comes to freight management, businesses face a crucial
                  decision: build an in-house logistics team or outsource it to
                  a third-party provider. Here’s how I help clients choose
                  wisely.
                </p>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                >
                  Read More →
                </a>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1581092580537-4f2e34a656d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Pre-Shipment Inspection"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>23 June 2023</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  The Important Aspect of Pre-Shipment Inspection
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Conducting an inspection prior to shipment ensures the quality
                  of goods and products before they are dispatched. It is
                  essential for customers and brand reputation.
                </p>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                >
                  Read More →
                </a>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>23 November 2021</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  5 Important Aspects of a Pre-Shipment Inspection
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Conducting an inspection prior to shipment ensures the quality
                  of goods and products before they are dispatched. It is
                  essential for customers and brand reputation.
                </p>
                <a
                  href="#"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>

          {/* Recent Articles List (Sidebar Style) */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Recent Articles
            </h3>
            <div className="space-y-6">
              {[
                {
                  date: "21 November 2021",
                  title:
                    "Role of Inspection and Testing in Maintaining Quality",
                  excerpt:
                    "In manufacturing and other industries, maintaining high-quality standards is crucial for customer satisfaction and brand reputation.",
                },
                {
                  date: "20 November 2021",
                  title:
                    "What Can Cause Professional Quality Inspectors to Miss QC Issues?",
                  excerpt:
                    "Professional quality inspectors are responsible for ensuring that products meet the required standards. But even experts can miss critical issues.",
                },
                {
                  date: "18 November 2021",
                  title: "How to Negotiate with Chinese Suppliers Like a Pro",
                  excerpt:
                    "Negotiating with suppliers in China requires cultural awareness, preparation, and strategy. Here’s how I help clients get the best deals without compromising quality.",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 inline-block"
                  >
                    Read More →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Optional CTA */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                window.scrollTo({
                  top: document.getElementById("blog")?.offsetTop || 0,
                  behavior: "smooth",
                })
              }
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Get In Touch / Contact Section - Modern Dark Theme */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Left Side: Form + Headline (Dark on Light) */}
              <div className="lg:w-1/2 p-8 md:p-12 bg-white text-gray-800">
                <span className="inline-block px-4 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full uppercase tracking-wider mb-4">
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Freight Isn’t Just About Shipping.
                  <br />
                  <span className="text-red-600">It’s About Growth.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Let’s scale together. Whether you’re sourcing your first
                  product or expanding globally — I’m here to help you grow
                  smarter, faster, and with less stress.
                </p>

                {/* Contact Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">
                        FIRST NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Ex. John"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Ex. Lewis"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        placeholder="+8801750062927"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      Speak to Ebrahim Directly
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right Side: Personal Photo */}
              <div className="lg:w-1/2 bg-gray-800 flex items-center justify-center p-8">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Ebrahim Kamal - Sourcing & Logistics Expert"
                    className="rounded-xl w-full max-w-sm h-auto object-cover shadow-lg border-4 border-white/20"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                    Based in Dhaka
                  </div>
                </div>
              </div>
            </div>
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
