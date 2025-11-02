import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import BlogPage from "../pages/BlogPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import BlogsPage from "../pages/BlogsPage";
import UsersPage from "../pages/UsersPage";
import SettingsPage from "../pages/SettingsPage";
import MainLayout from "../components/layouts/MainLayout";
import AboutPage from "../pages/AboutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />}>
          <Route index element={<OverviewPage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;