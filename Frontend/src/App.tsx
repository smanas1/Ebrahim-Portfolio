import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import BlogPage from "./pages/BlogPage";
import AuthPage from "./pages/AuthPage";

import MainLayout from "./components/layouts/MainLayout";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
