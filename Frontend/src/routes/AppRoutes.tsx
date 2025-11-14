import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import BlogsPage from "../pages/BlogsPage";
import UsersPage from "../pages/UsersPage";
import SettingsPage from "../pages/SettingsPage";
import ProductListingPage from "../pages/ProductListingPage";
import MainLayout from "../components/layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import ScrollToTop from "../components/ScrollToTop";

// Import menu pages
import ProductSourcingPage from "../pages/menu/ProductSourcingPage";
import QualityControlPage from "../pages/menu/QualityControlPage";
import LogisticsPage from "../pages/menu/LogisticsPage";
import FulfillmentPage from "../pages/menu/FulfillmentPage";
import PhotographyPage from "../pages/menu/PhotographyPage";
import SourcingFromChinaPage from "../pages/menu/SourcingFromChinaPage";
import SupplierVerificationPage from "../pages/menu/SupplierVerificationPage";
import PreProductionInspectionPage from "../pages/menu/PreProductionInspectionPage";
import DuringProductionInspectionPage from "../pages/menu/DuringProductionInspectionPage";
import PreShipmentInspectionPage from "../pages/menu/PreShipmentInspectionPage";
import SampleInspectionPage from "../pages/menu/SampleInspectionPage";
import SeaFreightPage from "../pages/menu/SeaFreightPage";
import AirFreightPage from "../pages/menu/AirFreightPage";
import ExpressCourierPage from "../pages/menu/ExpressCourierPage";
import AmazonFBAPrepPage from "../pages/menu/AmazonFBAPrepPage";
import ThreePLServicesPage from "../pages/menu/ThreePLServicesPage";
import ProductPhotographyPage from "../pages/menu/ProductPhotographyPage";
import LifestylePhotographyPage from "../pages/menu/LifestylePhotographyPage";
import ContactPage from "@/pages/ContactPage";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:category" element={<ProductListingPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Menu Routes */}
          <Route
            path="/services/product-sourcing"
            element={<ProductSourcingPage />}
          />
          <Route
            path="/services/quality-control"
            element={<QualityControlPage />}
          />
          <Route path="/services/logistics" element={<LogisticsPage />} />
          <Route path="/services/fulfillment" element={<FulfillmentPage />} />
          <Route path="/services/photography" element={<PhotographyPage />} />
          <Route
            path="/services/sourcing-china"
            element={<SourcingFromChinaPage />}
          />
          <Route
            path="/services/supplier-verification"
            element={<SupplierVerificationPage />}
          />
          <Route
            path="/services/pre-production-inspection"
            element={<PreProductionInspectionPage />}
          />
          <Route
            path="/services/during-production-inspection"
            element={<DuringProductionInspectionPage />}
          />
          <Route
            path="/services/pre-shipment-inspection"
            element={<PreShipmentInspectionPage />}
          />
          <Route
            path="/services/sample-inspection"
            element={<SampleInspectionPage />}
          />
          <Route path="/services/sea-freight" element={<SeaFreightPage />} />
          <Route path="/services/air-freight" element={<AirFreightPage />} />
          <Route
            path="/services/express-courier"
            element={<ExpressCourierPage />}
          />
          <Route
            path="/services/amazon-fba-prep"
            element={<AmazonFBAPrepPage />}
          />
          <Route
            path="/services/3pl-services"
            element={<ThreePLServicesPage />}
          />
          <Route
            path="/services/product-photography"
            element={<ProductPhotographyPage />}
          />
          <Route
            path="/services/lifestyle-photography"
            element={<LifestylePhotographyPage />}
          />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<OverviewPage />} />
            <Route
              path="overview"
              element={
                <RoleProtectedRoute requiredPage="overview" allowedRoles={["admin", "moderator", "user"]}>
                  <OverviewPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="products"
              element={
                <RoleProtectedRoute requiredPage="products" allowedRoles={["admin", "moderator"]}>
                  <ProductsPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="blogs"
              element={
                <RoleProtectedRoute requiredPage="blogs" allowedRoles={["admin", "moderator"]}>
                  <BlogsPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <RoleProtectedRoute requiredPage="users" allowedRoles={["admin"]}>
                  <UsersPage />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <RoleProtectedRoute requiredPage="settings" allowedRoles={["admin", "moderator", "user"]}>
                  <SettingsPage />
                </RoleProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/blog/:id" element={<BlogDetailPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
