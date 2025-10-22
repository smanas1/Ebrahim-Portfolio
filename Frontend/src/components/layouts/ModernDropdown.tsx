// src/components/ModernDropdown.tsx
import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

interface MenuItem {
  title: string;
  items: {
    name: string;
    description?: string;
    badge?: string;
    link: string;
  }[];
}

const ModernDropdown: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Mock data for the dropdown menu
  const menuData: MenuItem[] = [
    {
      title: "Product Sourcing",
      items: [
        {
          name: "Source Products From China",
          link: "/product-sourcing",
        },
      ],
    },
    {
      title: "Product Inspection",
      items: [
        {
          name: "Pre-Production Product Inspection",
          link: "/inspection/pre-production",
        },
        {
          name: "During Production Product Inspection",
          link: "/inspection/during-production",
        },
        {
          name: "Pre-Shipment Product Inspection",
          link: "/inspection/pre-shipment",
        },
        {
          name: "Sample Inspection Service",
          link: "/inspection/sample",
          badge: "TRENDING 🔥",
        },
        {
          name: "Sample Consolidation Service",
          link: "/inspection/consolidation",
        },
      ],
    },
    {
      title: "Freight Forwarding",
      items: [
        {
          name: "Freight Forwarding from China",
          link: "/freight-forwarding",
          badge: "HOT SERVICE",
        },
      ],
    },
    {
      title: "Amazon 3PL Service",
      items: [
        {
          name: "Get Your Products Stored in Our Warehouse",
          link: "/amazon-3pl",
        },
      ],
    },
    {
      title: "Product Photo & Videography",
      items: [
        {
          name: "Product Photography",
          link: "/photography",
        },
        {
          name: "Product Videography",
          link: "/videography",
        },
      ],
    },
  ];

  // Handle mouse leave with delay to prevent accidental closure
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isHovered) {
      // Reset active category when menu opens
      setActiveCategory(menuData[0]?.title || null);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent accidental closure
    setTimeout(() => {
      setIsHovered(false);
      setActiveCategory(null);
    }, 300);
  };

  const handleCategoryMouseEnter = (title: string) => {
    setActiveCategory(title);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Menu Button */}
      <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
        <span>Our Services</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isHovered ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isHovered && (
        <div className="absolute left-0 right-0 top-full mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="container mx-auto px-6 py-6">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left column - Promotional content */}
              <div className="lg:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800 leading-tight">
                  Want experts to handle your Amazon FBA PL Launch?
                </h3>
                <p className="mb-4 text-gray-700">Well, we do that too!</p>
                <h4 className="font-semibold mb-4 text-gray-800">
                  Here's Why You Should Choose Us:
                </h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center group">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 transition-transform group-hover:scale-110">
                      <svg
                        width="10"
                        height="10"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      7 Years of Experience
                    </span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 transition-transform group-hover:scale-110">
                      <svg
                        width="10"
                        height="10"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      100% Quality Assurance
                    </span>
                  </li>
                  <li className="flex items-center group">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2 transition-transform group-hover:scale-110">
                      <svg
                        width="10"
                        height="10"
                        fill="white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      0 Hidden Charges
                    </span>
                  </li>
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  LEARN MORE
                </button>
              </div>

              {/* Right column - Menu content */}
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {menuData.map((menu) => (
                    <div
                      key={menu.title}
                      className={`border rounded-xl p-5 transition-all duration-300 ${
                        activeCategory === menu.title
                          ? "bg-red-50 border-red-200 shadow-md"
                          : "border-gray-200 hover:border-red-200 hover:shadow-md"
                      }`}
                      onMouseEnter={() => handleCategoryMouseEnter(menu.title)}
                    >
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                        {menu.title}
                        {activeCategory === menu.title && (
                          <ArrowRight size={16} className="ml-2 text-red-600" />
                        )}
                      </h3>
                      <ul className="space-y-2">
                        {menu.items.map((item, index) => (
                          <li key={index}>
                            <a
                              href={item.link}
                              className="flex items-start justify-between group py-2 px-3 rounded-md transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                            >
                              <span className="text-gray-700 group-hover:text-red-600">
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-600 text-white rounded-full">
                                  {item.badge}
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

            {/* Visual element with modern styling */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-3xl">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        Comprehensive Logistics Solutions
                      </h4>
                      <p className="text-gray-600 text-sm">
                        End-to-end freight management for e-commerce businesses
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <img
                        src="https://via.placeholder.com/80x60?text=Truck"
                        alt="Truck"
                        className="h-12 rounded-lg shadow-md"
                      />
                      <img
                        src="https://via.placeholder.com/80x60?text=Plane"
                        alt="Airplane"
                        className="h-12 rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernDropdown;
