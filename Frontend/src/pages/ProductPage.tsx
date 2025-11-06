import React, { useState, useMemo } from "react";
import { useGetAllProductsQuery } from "../store/api";
import ProductCard from "@/components/product/ProductCard";
import FilterComponent from "@/components/product/FilterComponent";
import ProductSummaryBar from "@/components/product/ProductSummaryBar";
import NoProductsFound from "@/components/product/NoProductsFound";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFilters {
  category: string;
  minMoq: string;
  maxPrice: string;
  search: string;
  minSampleCost: string;
  maxSampleCost: string;
  minShipToUsa: string;
  maxShipToUsa: string;
  shipToUsaAvailable: "yes" | "no" | "";
}

const ProductPage: React.FC = () => {
  const { data: products = [], error, isLoading } = useGetAllProductsQuery();
  const [filters, setFilters] = useState<ProductFilters>({
    category: "",
    minMoq: "",
    maxPrice: "",
    search: "",
    minSampleCost: "",
    maxSampleCost: "",
    minShipToUsa: "",
    maxShipToUsa: "",
    shipToUsaAvailable: "",
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return uniqueCategories.filter((cat) => cat && cat.trim() !== "");
  }, [products]);

  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const parseMoq = (moqStr: string): number => {
    if (!moqStr) return 0;
    const num = parseInt(moqStr.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchTerm = filters.search?.toLowerCase() || "";
      const matchesSearch =
        !searchTerm ||
        product.productName?.toLowerCase().includes(searchTerm) ||
        product.productDetails?.toLowerCase().includes(searchTerm);

      const categoryFilter = filters.category;
      const matchesCategory =
        !categoryFilter ||
        categoryFilter === "all" ||
        product.category === categoryFilter;

      const minMoqValue = filters.minMoq ? parseMoq(filters.minMoq) : 0;
      const productMoq = parseMoq(product.moq);
      const matchesMoq = productMoq >= minMoqValue;

      const productPrice = parsePrice(product.costOfGoods || "0");
      const maxPrice = filters.maxPrice
        ? parsePrice(filters.maxPrice)
        : Infinity;
      const matchesPrice = productPrice <= maxPrice;

      const minSample = filters.minSampleCost
        ? parsePrice(filters.minSampleCost)
        : 0;
      const maxSample = filters.maxSampleCost
        ? parsePrice(filters.maxSampleCost)
        : Infinity;
      const productSample = parsePrice(product.sampleCost || "0");
      const matchesSampleCost =
        productSample >= minSample && productSample <= maxSample;

      const minShip = filters.minShipToUsa
        ? parsePrice(filters.minShipToUsa)
        : 0;
      const maxShip = filters.maxShipToUsa
        ? parsePrice(filters.maxShipToUsa)
        : Infinity;
      const productShip = parsePrice(product.shipToUsa || "0");
      const matchesShipPrice = productShip >= minShip && productShip <= maxShip;

      const matchesShipAvailability =
        !filters.shipToUsaAvailable ||
        (filters.shipToUsaAvailable === "yes" && productShip > 0) ||
        (filters.shipToUsaAvailable === "no" && productShip === 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMoq &&
        matchesPrice &&
        matchesSampleCost &&
        matchesShipPrice &&
        matchesShipAvailability
      );
    });
  }, [products, filters]);

  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      minMoq: "",
      maxPrice: "",
      search: "",
      minSampleCost: "",
      maxSampleCost: "",
      minShipToUsa: "",
      maxShipToUsa: "",
      shipToUsaAvailable: "",
    });
  };

  const clearFilter = (key: keyof ProductFilters) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600 mb-3"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-600 p-3 rounded-full inline-block mb-3">
            <X className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Error Loading Products
          </h2>
          <p className="text-gray-600 mb-3 text-sm">{JSON.stringify(error)}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight font-sans">
            Premium Sourcing Catalog
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
            High-quality products with transparent pricing, MOQ, and shipping to
            the USA.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <FilterComponent
            filters={filters}
            categories={categories}
            showAdvancedFilters={showAdvancedFilters}
            onFilterChange={handleFilterChange}
            onToggleAdvancedFilters={() =>
              setShowAdvancedFilters(!showAdvancedFilters)
            }
            onClearFilter={clearFilter}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isSelected={selectedProducts.includes(product._id)}
                onToggleSelection={toggleProductSelection}
                onViewDetails={(p) => console.log("View details", p)}
              />
            ))}
          </div>
        ) : (
          <NoProductsFound onResetFilters={resetFilters} />
        )}

        {/* Floating Summary Bar */}
        <ProductSummaryBar
          selectedProductCount={selectedProducts.length}
          onRequestQuote={() =>
            console.log("Quote requested for:", selectedProducts)
          }
        />
      </div>
    </div>
  );
};

export default ProductPage;
