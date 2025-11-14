import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageSlider from "@/components/ui/image-slider";
import { DollarSign, Truck, ImageIcon, Star, Heart, ArrowLeft } from "lucide-react";
import { useGetProductByIdQuery } from "@/store/api";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Using RTK Query to fetch product by ID
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(id || "", {
    skip: !id
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-600 p-3 rounded-full inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error ? "Error loading product data. Please try again later." : "The product you're looking for doesn't exist."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Format cost of goods - handle both raw numbers and pre-formatted strings
  const formatCurrency = (value: number | string | undefined) => {
    if (!value) return "$0.00";

    // If the value is already formatted with a dollar sign, return as is
    if (typeof value === "string" && value.startsWith("$")) {
      return value;
    }

    // If it's a number or number string, format it with dollar sign and two decimals
    const strValue = String(value);
    const num = parseFloat(strValue);
    return isNaN(num) || !isFinite(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Define category mapping for display
  const categoryMap: Record<string, string> = {
    magazineCardsStickers: "Print & Stationery",
    // Add more mappings as needed
  };

  const readableCategory = categoryMap[product.category] || product.category
    ? (categoryMap[product.category] || product.category)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .toUpperCase()
    : "GENERAL";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <ImageSlider
                images={product.pictures || ["https://placehold.co/600x600?text=No+Image"]}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
            {/* Category and Wishlist */}
            <div className="flex justify-between items-start mb-4">
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 text-sm">
                {readableCategory}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="p-0 w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 dark:hover:text-red-400"
                onClick={toggleWishlist}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
              </Button>
            </div>

            {/* Product Name and Details */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-sans tracking-tight">
              {product.productName}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed font-sans">
              {product.productDetails}
            </p>

            {/* Product Information Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">Cost</p>
                  <p className="font-semibold text-lg text-green-700 dark:text-green-300 font-sans">
                    {formatCurrency(product.costOfGoods)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">Ship to USA</p>
                  <p className="font-semibold text-lg text-blue-700 dark:text-blue-300 font-sans">
                    {formatCurrency(product.shipToUsa)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">MOQ</p>
                  <p className="font-semibold text-lg text-yellow-700 dark:text-yellow-300 font-sans">
                    {product.moq || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">Sample Cost</p>
                  <p className="font-semibold text-lg text-purple-700 dark:text-purple-300 font-sans">
                    {formatCurrency(product.sampleCost)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans">
                Quantity
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-r-none border-r-0"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </Button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-y border-gray-300 dark:border-gray-600 py-2 text-gray-900 dark:text-white bg-transparent font-sans"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-l-none border-l-0"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-medium py-3 font-sans">
                Request Quote
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 font-sans">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-sans">
            Product Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">Brand</h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {product.brandName || "Not specified"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">Category</h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {readableCategory}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">ASIN</h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {product.asin || "Not available"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 font-sans">Created</h3>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;