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
  const [moqRange, setMoqRange] = useState<[number | '', number | '']>(['', '']);
  const [priceRange, setPriceRange] = useState<[number | '', number | '']>(['', '']);

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
      const minMoq = typeof moqRange[0] === 'number' ? moqRange[0] : 0;
      const maxMoq = typeof moqRange[1] === 'number' ? moqRange[1] : Infinity;
      return moq >= minMoq && moq <= maxMoq;
    });

    // Filter by price range
    result = result.filter((product) => {
      const price = parseFloat(product.costOfGoods) || 0;
      const minPrice = typeof priceRange[0] === 'number' ? priceRange[0] : 0;
      const maxPrice = typeof priceRange[1] === 'number' ? priceRange[1] : Infinity;
      return price >= minPrice && price <= maxPrice;
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
    setMoqRange(['', '']);
    setPriceRange(['', '']);
  };

  // Get human-readable category name
  const getReadableCategory = (cat: string) => {
    const mappedCategory = categoryMap[cat] || cat;
    return mappedCategory
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Controls Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-foreground/70 font-sans">
              <span
                className="cursor-pointer hover:text-foreground"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <ChevronRight className="h-4 w-4 mx-1 text-foreground/50" />
              <span className="text-foreground font-medium tracking-tight">
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
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:bg-muted"
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
                className="md:hidden p-2 rounded border border-input text-foreground/70"
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
              "bg-card rounded-lg shadow p-4 md:w-64 md:pr-6 transition-all duration-300 border border-border",
              showFilters
                ? "block absolute inset-0 z-40 md:relative md:z-auto bg-card"
                : "hidden md:block"
            )}
          >
            {/* Mobile header with close button */}
            <div className="md:hidden flex justify-between items-center mb-4 pb-2 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground tracking-tight font-sans">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5 text-foreground/70" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Active filters */}
              {(selectedCategories.length > 0 ||
                moqRange[0] !== '' ||
                moqRange[1] !== '' ||
                priceRange[0] !== '' ||
                priceRange[1] !== '') && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-foreground tracking-tight font-sans uppercase">
                      Active Filters
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-xs text-primary hover:text-primary/80 font-sans"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                      >
                        {getReadableCategory(cat)}
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className="ml-1 text-primary-foreground/80 hover:text-primary-foreground"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(moqRange[0] !== '' || moqRange[1] !== '') && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        MOQ: {moqRange[0] !== '' ? moqRange[0] : '0'}-{moqRange[1] !== '' ? moqRange[1] : '∞'}
                        <button
                          onClick={() => setMoqRange(['', ''])}
                          className="ml-1 text-primary-foreground/80 hover:text-primary-foreground"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {(priceRange[0] !== '' || priceRange[1] !== '') && (
                      <span className="inline-flex items-center px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                        Price: ${priceRange[0] !== '' ? priceRange[0] : '0'}-${priceRange[1] !== '' ? priceRange[1] : '∞'}
                        <button
                          onClick={() => setPriceRange(['', ''])}
                          className="ml-1 text-primary-foreground/80 hover:text-primary-foreground"
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
                  <AccordionTrigger className="text-foreground">Category</AccordionTrigger>
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
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
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
                  <AccordionTrigger className="text-foreground">MOQ</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-foreground/70 mb-1">Min MOQ</label>
                          <input
                            type="number"
                            min="0"
                            value={moqRange[0] === '' ? '' : moqRange[0]}
                            onChange={(e) =>
                              setMoqRange([
                                e.target.value === '' ? '' : Number(e.target.value) >= 0 ? Number(e.target.value) : 0,
                                moqRange[1],
                              ])
                            }
                            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                            placeholder="Min"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-foreground/70 mb-1">Max MOQ</label>
                          <input
                            type="number"
                            min="0"
                            value={moqRange[1] === '' ? '' : moqRange[1]}
                            onChange={(e) =>
                              setMoqRange([
                                moqRange[0],
                                e.target.value === '' ? '' : Number(e.target.value) >= 0 ? Number(e.target.value) : 0,
                              ])
                            }
                            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price">
                  <AccordionTrigger className="text-foreground">Price ($)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-foreground/70 mb-1">Min Price</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={priceRange[0] === '' ? '' : priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([
                                e.target.value === '' ? '' : Number(e.target.value) >= 0 ? Number(e.target.value) : 0,
                                priceRange[1],
                              ])
                            }
                            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                            placeholder="Min"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-foreground/70 mb-1">Max Price</label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={priceRange[1] === '' ? '' : priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([
                                priceRange[0],
                                e.target.value === '' ? '' : Number(e.target.value) >= 0 ? Number(e.target.value) : 0,
                              ])
                            }
                            className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                            placeholder="Max"
                          />
                        </div>
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
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-4 text-foreground/70 font-sans">Loading products...</p>
                </div>
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-destructive font-sans">
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
                    <div className="mb-4 text-sm text-foreground/70">
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
                    <h3 className="text-xl font-medium text-foreground mb-2 tracking-tight font-sans">
                      No products found
                    </h3>
                    <p className="text-foreground/70 mb-2 text-center font-sans leading-relaxed">
                      {category
                        ? `There are no products in the "${getReadableCategory(
                            category
                          )}" category.`
                        : "There are no products matching your current filters."}
                    </p>

                    {category && (
                      <button
                        onClick={() => navigate("/products")}
                        className="mt-2 text-primary hover:text-primary/80 text-sm font-sans"
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
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-sans"
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
