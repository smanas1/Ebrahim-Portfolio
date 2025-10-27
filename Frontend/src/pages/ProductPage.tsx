import React, { useState, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductFilters {
  category: string;
  minMoq: string;
  maxPrice: string;
  search: string;
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
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category))
    );
    return uniqueCategories.filter((cat) => cat && cat.trim() !== "");
  }, [products]);

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

      const minMoqValue = parseInt(filters.minMoq) || 0;
      const productMoq = parseInt(product.moq) || 0;
      const matchesMoq = productMoq >= minMoqValue;

      const costOfGoods = product.costOfGoods || "0";
      const price =
        parseFloat(costOfGoods.replace(/[^0-9.-]+/g, "")) || Infinity;
      const maxPrice =
        parseFloat(
          (filters.maxPrice || "Infinity").replace(/[^0-9.-]+/g, "")
        ) || Infinity;
      const matchesPrice = price <= maxPrice;

      return matchesSearch && matchesCategory && matchesMoq && matchesPrice;
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

  const handleNextImage = () => {
    if (selectedProduct?.pictures) {
      setCurrentImageIndex((prev) =>
        prev === selectedProduct.pictures.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProduct?.pictures) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProduct.pictures.length - 1 : prev - 1
      );
    }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  placeholder="e.g. 10"
                  value={filters.maxPrice?.replace(/[^0-9]/g, "")}
                  onChange={(e) =>
                    handleFilterChange("maxPrice", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
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
                {/* Compact image container */}
                <div className="relative h-40 overflow-hidden bg-gray-50">
                  {product.pictures?.[0] ? (
                    <img
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
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Image Gallery */}
                        <div className="md:w-1/2 p-6 border-r border-gray-200 bg-gray-50">
                          {selectedProduct?.pictures &&
                          selectedProduct.pictures.length > 0 ? (
                            <div className="relative">
                              <img
                                src={
                                  selectedProduct.pictures[
                                    currentImageIndex
                                  ]?.trim() || "/placeholder.jpg"
                                }
                                alt={selectedProduct.productName}
                                className="w-full h-80 object-contain rounded-lg bg-white p-2"
                              />
                              {selectedProduct.pictures.length > 1 && (
                                <>
                                  <button
                                    onClick={handlePrevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                                  >
                                    <ChevronLeft className="h-5 w-5 text-green-700" />
                                  </button>
                                  <button
                                    onClick={handleNextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md"
                                  >
                                    <ChevronRight className="h-5 w-5 text-green-700" />
                                  </button>
                                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
                                    {selectedProduct.pictures.map((_, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() =>
                                          setCurrentImageIndex(idx)
                                        }
                                        className={`w-2.5 h-2.5 rounded-full ${
                                          currentImageIndex === idx
                                            ? "bg-green-600"
                                            : "bg-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="w-full h-80 flex items-center justify-center bg-white rounded-lg">
                              <ImageIcon className="h-16 w-16 text-gray-300" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="md:w-1/2 p-6 overflow-y-auto max-h-[calc(90vh-3rem)]">
                          <div className="mb-5">
                            <h2 className="text-2xl font-bold text-gray-900">
                              {selectedProduct?.productName}
                            </h2>
                            <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                              {selectedProduct?.category || "General"}
                            </Badge>
                          </div>

                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {selectedProduct?.productDetails}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" /> Pricing
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">MOQ</span>
                                  <span className="font-medium">
                                    {selectedProduct?.moq} units
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Unit Cost
                                  </span>
                                  <span className="font-medium text-green-600">
                                    {selectedProduct?.costOfGoods}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Sample Cost
                                  </span>
                                  <span className="font-medium">
                                    {selectedProduct?.sampleCost}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Ship to USA
                                  </span>
                                  <span className="font-medium text-red-600">
                                    {selectedProduct?.shipToUsa}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Specifications
                              </h3>
                              <div className="space-y-2 text-sm">
                                {[
                                  {
                                    label: "Material",
                                    value: selectedProduct?.material,
                                  },
                                  {
                                    label: "Dimensions",
                                    value: selectedProduct?.dimensions,
                                  },
                                  {
                                    label: "Weight",
                                    value: selectedProduct?.weight,
                                  },
                                  {
                                    label: "Color",
                                    value: selectedProduct?.color,
                                  },
                                ].map(({ label, value }) => (
                                  <div
                                    key={label}
                                    className="flex justify-between"
                                  >
                                    <span className="text-gray-600">
                                      {label}
                                    </span>
                                    <span className="font-medium">
                                      {value || "N/A"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {(selectedProduct?.certifications?.length || 0) >
                            0 && (
                            <div className="mb-6">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Certifications
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.certifications?.map(
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

                          {(selectedProduct?.features?.length || 0) > 0 && (
                            <div className="mb-6">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Features
                              </h3>
                              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {selectedProduct.features?.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex gap-3 pt-2">
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
              onClick={() =>
                setFilters({
                  category: "",
                  minMoq: "",
                  maxPrice: "",
                  search: "",
                })
              }
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
