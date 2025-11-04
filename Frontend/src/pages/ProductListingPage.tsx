import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Filter,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/productTypes";
import { useGetAllProductsQuery } from "@/store/api";

// Define category mapping for display
const categoryMap: Record<string, string> = {
  magazineCardsStickers: "Print & Stationery",
};

const ProductListingPage: React.FC = () => {
  // State management
  const [gridColumns, setGridColumns] = useState<number>(3);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [moqRange, setMoqRange] = useState<[number, number]>([0, 2000]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  // Navigation and parameters
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Fetch products from the API
  const {
    data: allProducts = [],
    isLoading,
    isError,
  } = useGetAllProductsQuery();

  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(allProducts.map((product) => product.category).filter(Boolean))
  );

  // Apply filters when products or filter values change
  useEffect(() => {
    let result = [...allProducts];

    // Filter by URL category parameter if specified
    if (category) {
      result = result.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by selected categories in UI
    if (selectedCategories.length > 0) {
      result = result.filter(
        (product) =>
          product.category && selectedCategories.includes(product.category)
      );
    }

    // Filter by MOQ range
    result = result.filter((product) => {
      const moq = parseInt(product.moq) || 0;
      return moq >= moqRange[0] && moq <= moqRange[1];
    });

    // Filter by price range
    result = result.filter((product) => {
      const price = parseFloat(product.costOfGoods) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredProducts(result);
  }, [
    allProducts,
    selectedCategories,
    moqRange,
    priceRange,
    category,
  ]);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setMoqRange([0, 2000]);
    setPriceRange([0, 100]);
  };

  // Get human-readable category name
  const getReadableCategory = (cat: string) => {
    const mappedCategory = categoryMap[cat] || cat;
    return mappedCategory
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toUpperCase();
  };

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (cat: string) => {
    navigate(`/products/${cat}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Controls Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600">
              <span
                className="cursor-pointer hover:text-gray-900"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span className="text-gray-900 font-medium">
                {category ? getReadableCategory(category) : "ALL PRODUCTS"}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between md:justify-end space-x-4">
              {/* View toggle */}
              <div className="flex items-center space-x-1">
                {[2, 3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridColumns(cols)}
                    className={clsx(
                      "p-1.5 rounded",
                      gridColumns === cols
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    aria-label={`${cols} column grid view`}
                  >
                    {cols === 2 && <Grid2X2 className="h-4 w-4" />}
                    {cols === 3 && <Grid3X3 className="h-4 w-4" />}
                    {cols === 4 && <LayoutGrid className="h-4 w-4" />}
                  </button>
                ))}
              </div>

              {/* Filters button for mobile */}
              <button
                className="md:hidden p-2 rounded border border-gray-300"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Hidden on mobile unless showFilters is true */}
          <div
            className={clsx(
              "bg-white rounded-lg shadow p-4 md:w-64 md:pr-6 transition-all duration-300",
              showFilters
                ? "block absolute inset-0 z-40 md:relative md:z-auto"
                : "hidden md:block"
            )}
          >
            {/* Mobile header with close button */}
            <div className="md:hidden flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Active filters */}
              {(selectedCategories.length > 0 ||
                moqRange[0] > 0 ||
                moqRange[1] < 2000 ||
                priceRange[0] > 0 ||
                priceRange[1] < 100) && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      Active Filters
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {getReadableCategory(cat)}
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className="ml-1 text-blue-600 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(moqRange[0] > 0 || moqRange[1] < 2000) && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        MOQ: {moqRange[0]}-{moqRange[1]}
                        <button
                          onClick={() => setMoqRange([0, 2000])}
                          className="ml-1 text-blue-600 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {(priceRange[0] > 0 || priceRange[1] < 100) && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Price: ${priceRange[0]}-${priceRange[1]}
                        <button
                          onClick={() => setPriceRange([0, 100])}
                          className="ml-1 text-blue-600 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              <Accordion type="multiple" defaultValue={["category", "moq", "price"]} className="w-full">
                {/* Category Filter */}
                <AccordionItem value="category">
                  <AccordionTrigger>Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {uniqueCategories.map((cat) => (
                        <div key={cat} className="flex items-center">
                          <Checkbox
                            id={`category-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={() => handleCategoryChange(cat)}
                          />
                          <label
                            htmlFor={`category-${cat}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {getReadableCategory(cat)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* MOQ Filter */}
                <AccordionItem value="moq">
                  <AccordionTrigger>MOQ</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Min: {moqRange[0]}</span>
                        <span>Max: {moqRange[1]}</span>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          value={moqRange[0]}
                          onChange={(e) =>
                            setMoqRange([Number(e.target.value), moqRange[1]])
                          }
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          value={moqRange[1]}
                          onChange={(e) =>
                            setMoqRange([moqRange[0], Number(e.target.value)])
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0</span>
                        <span>2000</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price">
                  <AccordionTrigger>Price ($)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span>$100</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>


              </Accordion>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading && (
              <div className="flex items-center justify-center h-72">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-red-500">
                    Error loading products. Please try again later.
                  </p>
                </div>
              </div>
            )}

            {!isLoading && !isError && (
              <>
                {filteredProducts.length > 0 ? (
                  <>
                    {/* Results count */}
                    <div className="mb-4 text-sm text-gray-600">
                      Showing {filteredProducts.length} products
                    </div>

                    {/* Product grid */}
                    <div
                      className={clsx(
                        "grid gap-6",
                        gridColumns === 2 ? "grid-cols-1 sm:grid-cols-2" : "",
                        gridColumns === 3
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                          : "",
                        gridColumns === 4
                          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                          : ""
                      )}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      {category
                        ? `There are no products in the "${getReadableCategory(
                            category
                          )}" category.`
                        : "There are no products matching your current filters."}
                    </p>

                    {category && (
                      <button
                        onClick={() => navigate("/products")}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View all products
                      </button>
                    )}

                    {(selectedCategories.length > 0 ||
                      moqRange[0] > 0 ||
                      moqRange[1] < 2000 ||
                      priceRange[0] > 0 ||
                      priceRange[1] < 100) && (
                      <button
                        onClick={resetFilters}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
