import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ImageSlider,
  Button,
  Badge,
} from "@/components/ui";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DollarSign,
  Truck,
  ImageIcon,
  MessageCircle,
  Star,
  Heart,
} from "lucide-react";
import { LazyImage } from "./LazyImage";

// Define category mapping for display
const categoryMap: Record<string, string> = {
  magazineCardsStickers: "Print & Stationery",
};

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

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelection: (productId: string) => void;
  onViewDetails: (product: Product) => void;
  gridColumns?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelection,
  onViewDetails,
  gridColumns = 3, // Default to 3 columns
}) => {
  const handleWhatsAppClick = () => {
    // You can customize this with your WhatsApp number and message
    const phoneNumber = "+1234567890"; // Replace with actual number
    const message = `Hello, I'm interested in the product: ${product.productName}. Can you provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Determine image height based on grid columns
  const getImageHeightClass = () => {
    switch(gridColumns) {
      case 2:
        return 'h-64'; // Much taller for 2-column grid
      case 3:
        return 'h-56'; // Taller for 3-column grid
      case 4:
        return 'h-40'; // Shorter for 4-column grid
      default:
        return 'h-56'; // Default to 3-column height
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border border-gray-100 rounded-xl flex flex-col h-full ${
        isSelected ? "ring-2 ring-green-500" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative group">
        {product.pictures && product.pictures.length > 0 ? (
          <ImageSlider
            images={product.pictures.map(pic => pic.trim())}
            alt={product.productName}
            className={`w-full ${getImageHeightClass()}`}
          />
        ) : (
          <div className={`w-full ${getImageHeightClass()} flex items-center justify-center bg-gray-50 dark:bg-gray-800`}>
            <ImageIcon className="h-12 w-12 text-gray-300 dark:text-gray-500" />
          </div>
        )}
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 shadow">
          {product.category ? 
            (categoryMap[product.category] || product.category)
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .toUpperCase() 
            : "GENERAL"}
        </Badge>
        
        {/* Favorite Button */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection(product._id);
          }}
        >
          <Heart 
            className={`h-4 w-4 ${isSelected ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}`} 
          />
        </Button>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Product Title */}
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-base font-bold text-gray-900 line-clamp-1">
            {product.productName}
          </CardTitle>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.productDetails}
          </p>
        </CardHeader>

        {/* Product Details */}
        <div className="space-y-2 py-3 flex-1">
          {/* Pricing Info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-gray-600">Cost: </span>
              <span className="text-xs font-medium text-green-600 ml-1">
                {product.costOfGoods || "$0.00"}
              </span>
            </div>
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xs text-gray-600">Ship: </span>
              <span className="text-xs font-medium text-blue-600 ml-1">
                {product.shipToUsa || "$0.00"}
              </span>
            </div>
          </div>
          
          {/* MOQ and Sample */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-600">MOQ: </span>
              <span className="text-xs font-medium text-gray-800 ml-1">
                {product.moq || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-600">Sample: </span>
              <span className="text-xs font-medium text-purple-600 ml-1">
                {product.sampleCost || "$0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductDetailsDialog: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = () => {
    // You can customize this with your WhatsApp number and message
    const phoneNumber = "+1234567890"; // Replace with actual number
    const message = `Hello, I'm interested in the product: ${product.productName}. Can you provide more details?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
      {/* Image Gallery */}
      <div className="md:w-2/5 p-4 bg-gray-50 flex flex-col items-center">
        {product.pictures && product.pictures.length > 0 && (
          <div
            className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center mb-4 rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden group focus:outline-none"
            tabIndex={0}
            role="region"
            aria-label={`Product image ${currentImageIndex + 1} of ${product.pictures.length}`}
          >
            {/* Main Image */}
            <LazyImage
              src={product.pictures[currentImageIndex]?.trim() || "/placeholder.jpg"}
              alt={`${product.productName} - view ${currentImageIndex + 1}`}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Navigation Arrows */}
            {product.pictures.length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? product.pictures.length - 1 : prev - 1
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
                      prev === product.pictures.length - 1 ? 0 : prev + 1
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
        {product.pictures && product.pictures.length > 1 && (
          <div className="w-full max-w-[400px] overflow-x-auto flex gap-2 py-2 scrollbar-hide">
            {product.pictures.map((pic, idx) => (
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
      <div className="md:w-3/5 p-6 overflow-y-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            {product.productName}
          </h2>
          <div className="flex items-center mt-2">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              {product.category ? 
                (categoryMap[product.category] || product.category)
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toUpperCase() 
                : "GENERAL"}
            </Badge>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {product.productDetails}
        </p>

        {/* Main Pricing Card */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-xl border border-gray-200 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">Product Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xs text-gray-500 mb-1">MOQ</span>
              <span className="font-bold text-gray-900">{product.moq || "N/A"}</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xs text-gray-500 mb-1">Unit Cost</span>
              <span className="font-bold text-green-600">{product.costOfGoods || "$0.00"}</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xs text-gray-500 mb-1">Sample Cost</span>
              <span className="font-bold text-purple-600">{product.sampleCost || "$0.00"}</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xs text-gray-500 mb-1">Ship to USA</span>
              <span className="font-bold text-red-500">{product.shipToUsa || "$0.00"}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          {/* Brand & ASIN */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Product Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-500">Brand Name</span>
                <p className="font-medium text-gray-900">{product.brandName || "N/A"}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">ASIN</span>
                <p className="font-medium text-gray-900 font-mono">{product.asin || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          {(product.certifications?.length || 0) > 0 && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications?.map((cert, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-green-300 text-green-700"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {(product.features?.length || 0) > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {product.features?.map((f, i) => (
                  <li key={i} className="text-sm">{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact via WhatsApp
          </Button>
          <Button
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 py-3 rounded-lg"
          >
            <Truck className="h-5 w-5 mr-2" />
            Shipping Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;