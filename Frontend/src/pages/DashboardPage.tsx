/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Newspaper,
  Users,
  Settings,
  Menu,
  X,
  Eye,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 h-full bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        }`}
      >
        <div className={`p-4 ${sidebarOpen ? "block" : "hidden md:block"}`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-xl font-bold ${sidebarOpen ? "" : "hidden"}`}>
              Admin Dashboard
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-8">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard/overview"
                  className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-800"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Overview
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/products"
                  className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-800"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/blogs"
                  className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-800"
                >
                  <Newspaper className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Blogs
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/users"
                  className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-800"
                >
                  <Users className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Users
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center w-full p-3 rounded-lg transition-colors hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5" />
                  <span className={`ml-3 ${!sidebarOpen && "md:hidden"}`}>
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;