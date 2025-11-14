 
import { useState } from "react";
import {
  BarChart3,
  ShoppingCart,
  Newspaper,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ContactButton from "@/components/ContactButton";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

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
              {user?.role === "admin"
                ? "Admin Dashboard"
                : user?.role === "moderator"
                ? "Moderator Dashboard"
                : "User Dashboard"}
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

          {sidebarOpen && user && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          )}

          <nav className="mt-4">
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
              {(user?.role === "moderator" || user?.role === "admin") && (
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
              )}
              {(user?.role === "moderator" || user?.role === "admin") && (
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
              )}
              {user?.role === "admin" && (
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
              )}
              {(user?.role === "moderator" || user?.role === "admin") && (
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
              )}
            </ul>
          </nav>

          <div className="absolute bottom-0  pb-4">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start p-3 text-red-400 hover:bg-gray-800 transition-colors rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              <span className={`ml-3 ${sidebarOpen ? "" : "hidden md:block"}`}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 dark:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
      <ContactButton />
    </div>
  );
};

export default DashboardPage;
