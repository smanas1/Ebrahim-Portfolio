import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useGetAllProductsQuery } from "../store/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Eye,
  Package,
  DollarSign,
  Truck,
  ImageIcon,
  X,
  Filter,
  XCircle,
} from "lucide-react";

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

interface Product {
  _id: string;
  productName: string;
  productDetails: string;
  category: string;
  pictures: string[];
  moq: string;
  costOfGoods: string;
  sampleCost: string;
  shipToUsa: string;
  brandName?: string;
  asin?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  color?: string;
  certifications?: string[];
  features?: string[];
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
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

  // Lazy loading image component
  const LazyImage = ({
    src,
    alt,
    className,
    placeholder = "/placeholder.jpg",
  }: {
    src: string;
    alt: string;
    className?: string;
    placeholder?: string;
  }) => {
    const [imgSrc, setImgSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setImgSrc(placeholder);
        setIsLoaded(true);
      };
    }, [src, placeholder]);

    return (
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
        loading="lazy"
      />
    );
  };

  // Handle keyboard navigation when dialog is open
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedProduct?.pictures || selectedProduct.pictures.length <= 1)
        return;
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? selectedProduct.pictures.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === selectedProduct.pictures.length - 1 ? 0 : prev + 1
        );
      }
    },
    [selectedProduct]
  );

  useEffect(() => {
    if (selectedProduct) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProduct, handleKeyDown]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Premium Sourcing Catalog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            High-quality products with transparent pricing, MOQ, and shipping to
            the USA.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <Card className="p-5 bg-white border border-green-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-800">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-green-600 hover:bg-green-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showAdvancedFilters ? "Hide Advanced" : "Show Advanced"}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Search
                </label>
                <Input
                  placeholder="Product name or details..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select
                  value={filters.category}
                  onValueChange={(v) => handleFilterChange("category", v)}
                >
                  <SelectTrigger className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => {
                      const formattedCat = cat.replace(
                        /([a-z])([A-Z])/g,
                        "$1 $2"
                      );
                      return (
                        <SelectItem key={cat} value={cat}>
                          {formattedCat.charAt(0).toUpperCase() +
                            formattedCat.slice(1)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Min MOQ
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 1000"
                  value={filters.minMoq}
                  onChange={(e) => handleFilterChange("minMoq", e.target.value)}
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Max Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 10.99"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {showAdvancedFilters && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Sample Cost Range ($)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Min"
                        value={filters.minSampleCost}
                        onChange={(e) =>
                          handleFilterChange("minSampleCost", e.target.value)
                        }
                        className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Max"
                        value={filters.maxSampleCost}
                        onChange={(e) =>
                          handleFilterChange("maxSampleCost", e.target.value)
                        }
                        className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Ship to USA Price Range ($)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Min"
                        value={filters.minShipToUsa}
                        onChange={(e) =>
                          handleFilterChange("minShipToUsa", e.target.value)
                        }
                        className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Max"
                        value={filters.maxShipToUsa}
                        onChange={(e) =>
                          handleFilterChange("maxShipToUsa", e.target.value)
                        }
                        className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Ships to USA
                    </label>
                    <Select
                      value={filters.shipToUsaAvailable}
                      onValueChange={(v) =>
                        handleFilterChange(
                          "shipToUsaAvailable",
                          v as "yes" | "no" | ""
                        )
                      }
                    >
                      <SelectTrigger className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {(filters.minSampleCost ||
              filters.maxSampleCost ||
              filters.minShipToUsa ||
              filters.maxShipToUsa ||
              filters.shipToUsaAvailable) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {filters.minSampleCost && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      Min Sample: ${filters.minSampleCost}
                      <button
                        onClick={() => handleFilterChange("minSampleCost", "")}
                        className="ml-1 hover:bg-blue-200 rounded-full"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.maxSampleCost && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      Max Sample: ${filters.maxSampleCost}
                      <button
                        onClick={() => handleFilterChange("maxSampleCost", "")}
                        className="ml-1 hover:bg-blue-200 rounded-full"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.minShipToUsa && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800"
                    >
                      Min Ship: ${filters.minShipToUsa}
                      <button
                        onClick={() => handleFilterChange("minShipToUsa", "")}
                        className="ml-1 hover:bg-purple-200 rounded-full"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.maxShipToUsa && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800"
                    >
                      Max Ship: ${filters.maxShipToUsa}
                      <button
                        onClick={() => handleFilterChange("maxShipToUsa", "")}
                        className="ml-1 hover:bg-purple-200 rounded-full"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.shipToUsaAvailable && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Ships to USA:{" "}
                      {filters.shipToUsaAvailable === "yes" ? "Yes" : "No"}
                      <button
                        onClick={() =>
                          handleFilterChange("shipToUsaAvailable", "")
                        }
                        className="ml-1 hover:bg-green-200 rounded-full"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-red-600 hover:bg-red-50 h-7 px-2"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white border border-gray-200 ${
                  selectedProducts.includes(product._id)
                    ? "ring-2 ring-green-500"
                    : ""
                } flex flex-col h-full`}
              >
                <div className="relative h-40 overflow-hidden bg-gray-50">
                  {product.pictures?.[0] ? (
                    <LazyImage
                      src={product.pictures[0].trim()}
                      alt={product.productName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <ImageIcon className="h-8 w-8 opacity-60" />
                    </div>
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 text-xs uppercase bg-white/80 backdrop-blur text-red-800 border border-gray-200"
                  >
                    {(product.category
                      ? product.category.replace(/([a-z])([A-Z])/g, "$1 $2")
                      : "General"
                    ).toUpperCase()}
                  </Badge>
                </div>

                <CardHeader className="pb-2 pt-3 px-3">
                  <CardTitle className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {product.productName}
                  </CardTitle>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {product.productDetails}
                  </p>
                </CardHeader>

                <CardContent className="px-3 pb-2 pt-1 flex-1">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    <div className="flex justify-center items-center">
                      <span className="text-gray-500 mr-1">MOQ:</span>
                      <span className="font-medium">
                        {product.moq || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-gray-500 mr-1">Cost:</span>
                      <span className="font-medium text-green-600">
                        {product.costOfGoods || "$0.00"}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-gray-500 mr-1">Sample:</span>
                      <span className="font-medium">
                        {product.sampleCost || "$0.00"}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-gray-500 mr-1">Ship:</span>
                      <span className="font-medium text-red-600">
                        {product.shipToUsa || "$0.00"}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="px-3 pt-2 pb-3 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
                        onClick={() => handleViewDetails(product)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
                      <div className="flex flex-col md:flex-row h-full">
                        {/* ✨ ENHANCED IMAGE GALLERY */}
                        <div className="md:w-2/5 p-6 bg-gray-50 flex flex-col items-center">
                          {selectedProduct?.pictures &&
                            selectedProduct.pictures.length > 0 && (
                              <div
                                className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center mb-4 rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden group focus:outline-none"
                                tabIndex={0}
                                role="region"
                                aria-label={`Product image ${
                                  currentImageIndex + 1
                                } of ${selectedProduct.pictures.length}`}
                              >
                                {/* Main Image */}
                                <LazyImage
                                  src={
                                    selectedProduct.pictures[
                                      currentImageIndex
                                    ]?.trim() || "/placeholder.jpg"
                                  }
                                  alt={`${selectedProduct.productName} - view ${
                                    currentImageIndex + 1
                                  }`}
                                  className="w-full h-full object-contain p-4"
                                />

                                {/* Navigation Arrows */}
                                {selectedProduct.pictures.length > 1 && (
                                  <>
                                    <button
                                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                      onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                          prev === 0
                                            ? selectedProduct.pictures.length -
                                              1
                                            : prev - 1
                                        )
                                      }
                                      aria-label="Previous image"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M15 19l-7-7 7-7"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                      onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                          prev ===
                                          selectedProduct.pictures.length - 1
                                            ? 0
                                            : prev + 1
                                        )
                                      }
                                      aria-label="Next image"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>
                                  </>
                                )}
                              </div>
                            )}

                          {/* Thumbnails */}
                          {selectedProduct?.pictures &&
                            selectedProduct.pictures.length > 1 && (
                              <div className="w-full max-w-[400px] overflow-x-auto flex gap-2 py-2 scrollbar-hide">
                                {selectedProduct.pictures.map((pic, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                      currentImageIndex === idx
                                        ? "border-green-500 ring-2 ring-green-200"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  >
                                    <img
                                      src={pic.trim() || "/placeholder.jpg"}
                                      alt={`Thumbnail ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="md:w-3/5 p-6 overflow-y-auto max-h-[90vh]">
                          <div className="mb-5">
                            <h2 className="text-2xl font-bold text-gray-900">
                              {selectedProduct?.productName}
                            </h2>
                            <Badge className="mt-2 bg-green-100 uppercase text-green-800 border-green-200">
                              {selectedProduct?.category || "General"}
                            </Badge>
                          </div>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {selectedProduct?.productDetails}
                          </p>

                          {/* Pricing */}
                          <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" /> Pricing
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">MOQ</span>
                                <span className="font-medium">
                                  {selectedProduct?.moq || "N/A"} units
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Unit Cost</span>
                                <span className="font-medium text-green-600">
                                  {selectedProduct?.costOfGoods || "$0.00"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Sample Cost
                                </span>
                                <span className="font-medium">
                                  {selectedProduct?.sampleCost || "$0.00"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Ship to USA
                                </span>
                                <span className="font-medium text-red-600">
                                  {selectedProduct?.shipToUsa || "$0.00"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Product Info: Brand & ASIN */}
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                            <h3 className="font-semibold text-blue-800 mb-2">
                              Product Info
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Brand Name
                                </span>
                                <span className="font-medium">
                                  {selectedProduct?.brandName || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">ASIN</span>
                                <span className="font-medium font-mono">
                                  {selectedProduct?.asin || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Certifications */}
                          {(selectedProduct?.certifications?.length || 0) >
                            0 && (
                            <div className="mb-6">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Certifications
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct?.certifications?.map(
                                  (cert, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="border-green-300 text-green-700"
                                    >
                                      {cert}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {/* Features */}
                          {(selectedProduct?.features?.length || 0) > 0 && (
                            <div className="mb-6">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Features
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {selectedProduct?.features?.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Quote
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Shipping Info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="sm"
                    className={`flex-1 text-xs ${
                      selectedProducts.includes(product._id)
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                    onClick={() => toggleProductSelection(product._id)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {selectedProducts.includes(product._id) ? "Added" : "Add"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products match your filters
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-5">
              Try broadening your search or resetting filters.
            </p>
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Floating Summary Bar */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white rounded-xl shadow-lg border border-green-200 p-4 z-50 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedProducts.length} product
                    {selectedProducts.length !== 1 ? "s" : ""} selected
                  </p>
                  <p className="text-xs text-green-600">
                    Ready for sourcing quote
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white px-4"
                onClick={() =>
                  console.log("Quote requested for:", selectedProducts)
                }
              >
                Request Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
