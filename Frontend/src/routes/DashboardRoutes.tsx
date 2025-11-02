import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import BlogsPage from "../pages/BlogsPage";
import UsersPage from "../pages/UsersPage";
import SettingsPage from "../pages/SettingsPage";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />}>
        <Route index element={<OverviewPage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;