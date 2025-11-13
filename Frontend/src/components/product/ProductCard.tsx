import React, { useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  ImageSlider,
  Button,
  Badge,
} from "@/components/ui";
import { DollarSign, Truck, ImageIcon, MessageCircle, Star, Heart } from "lucide-react";

// Define category mapping for display
const categoryMap: Record<string, string> = {
  magazineCardsStickers: "Print & Stationery",
  // Add more mappings as needed
};

interface Product {
  _id: string;
  category: string;
  brandName: string;
  productName: string;
  productDetails: string;
  moq: string;
  costOfGoods: number | string;
  sampleCost: number | string;
  shipToUsa: number | string;
  asin: string;
  pictures: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  return (
    <Card className="bg-card rounded-2xl overflow-hidden border border-border group flex flex-col h-full">
      {/* Image container with gradient overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        <ImageSlider
          images={product.pictures || ["https://placehold.co/300x300?text=No+Image"]}
          alt={product.productName}
          className="w-full h-full"
        />

        {/* Category badge with better styling */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 shadow-lg">
            {product.category
              ? (categoryMap[product.category] || product.category)
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toUpperCase()
              : "GENERAL"}
          </Badge>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-4">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors tracking-tight font-sans">
            {product.productName}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed font-sans">
            {product.productDetails}
          </p>
        </CardHeader>

        <div className="p-0 pb-3 flex-1">
          <div className="space-y-2 py-3 flex-1">
            {/* Pricing info with better visual hierarchy */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans">
                    Cost
                  </p>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 truncate font-sans">
                    {formatCurrency(product.costOfGoods)}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans">
                    Ship
                  </p>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 truncate font-sans">
                    {formatCurrency(product.shipToUsa)}
                  </p>
                </div>
              </div>
            </div>

            {/* MOQ and Sample with better layout */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans">
                    MOQ
                  </p>
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 truncate font-sans">
                    {product.moq || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans">
                    Sample
                  </p>
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 truncate font-sans">
                    {formatCurrency(product.sampleCost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="p-0 pt-2">
          <div className="flex gap-2 w-full">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all dark:from-blue-600 dark:hover:from-blue-700 dark:to-cyan-700 dark:hover:to-cyan-800 font-sans"
              onClick={() => onViewDetails && onViewDetails(product._id)}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Details
            </Button>
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
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;