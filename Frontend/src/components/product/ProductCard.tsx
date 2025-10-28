import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Eye,
  ShoppingCart,
  DollarSign,
  Truck,
  ImageIcon,
} from "lucide-react";
import { LazyImage } from "./LazyImage";

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
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelection,
  onViewDetails,
}) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 bg-white border border-gray-200 ${
        isSelected ? "ring-2 ring-green-500" : ""
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
            <span className="font-medium">{product.moq || "N/A"}</span>
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
              onClick={() => onViewDetails(product)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
            <ProductDetailsDialog product={product} />
          </DialogContent>
        </Dialog>

        <Button
          size="sm"
          className={`flex-1 text-xs ${
            isSelected
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
          onClick={() => onToggleSelection(product._id)}
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          {isSelected ? "Added" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProductDetailsDialog: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Image Gallery */}
      <div className="md:w-2/5 p-6 bg-gray-50 flex flex-col items-center">
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
              className="w-full h-full object-contain p-4"
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
      <div className="md:w-3/5 p-6 overflow-y-auto max-h-[90vh]">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            {product.productName}
          </h2>
          <Badge className="mt-2 bg-green-100 uppercase text-green-800 border-green-200">
            {product.category || "General"}
          </Badge>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {product.productDetails}
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
                {product.moq || "N/A"} units
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unit Cost</span>
              <span className="font-medium text-green-600">
                {product.costOfGoods || "$0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Sample Cost
              </span>
              <span className="font-medium">
                {product.sampleCost || "$0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">
                Ship to USA
              </span>
              <span className="font-medium text-red-600">
                {product.shipToUsa || "$0.00"}
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
                {product.brandName || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ASIN</span>
              <span className="font-medium font-mono">
                {product.asin || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        {(product.certifications?.length || 0) > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Certifications
            </h3>
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
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Features
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {product.features?.map((f, i) => (
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
  );
};

export default ProductCard;