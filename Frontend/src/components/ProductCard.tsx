import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, ImageSlider, Button, Badge } from '@/components/ui';
import { DollarSign, Truck, Star, Package } from 'lucide-react';
import clsx from 'clsx';
import type { Product } from '@/types/productTypes';

// Define category mapping for display
const categoryMap: Record<string, string> = {
  magazineCardsStickers: "Print & Stationery",
};

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  // Format cost of goods - handle both raw numbers and pre-formatted strings
  const formatCurrency = (value: any) => {
    if (!value) return '$0.00';
    
    // If the value is already formatted with a dollar sign, return as is
    if (typeof value === 'string' && value.startsWith('$')) {
      return value;
    }
    
    // If it's a number or number string, format it with dollar sign and two decimals
    const strValue = String(value);
    const num = parseFloat(strValue);
    return isNaN(num) || !isFinite(num) ? '$0.00' : `$${num.toFixed(2)}`;
  };

  return (
    <motion.div
      whileHover
      className={clsx(
        'bg-white rounded-2xl overflow-hidden border border-gray-100 group',
        'transition-all duration-500 ease-in-out shadow-sm hover:shadow-xl',
        'flex flex-col h-full'
      )}
    >
      {/* Image container with gradient overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageSlider
          images={product.pictures || ['https://placehold.co/300x300?text=No+Image']}
          alt={product.productName}
          className="w-full h-full"
        />
        
        {/* Category badge with better styling */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur text-gray-800 text-xs font-medium px-3 py-1 shadow-lg">
            {product.category ? 
              (categoryMap[product.category] || product.category)
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .toUpperCase() 
              : "GENERAL"}
          </Badge>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex flex-col flex-1 p-4">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors">
            {product.productName}
          </CardTitle>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.productDetails}
          </p>
        </CardHeader>
        
        <CardContent className="p-0 pb-3 flex-1">
          <div className="space-y-3">
            {/* Pricing info with better visual hierarchy */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-green-50 rounded-lg p-2">
                <DollarSign className="h-4 w-4 text-green-600 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">Cost</p>
                  <p className="text-sm font-semibold text-green-700 truncate">
                    {formatCurrency(product.costOfGoods)}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 rounded-lg p-2">
                <Truck className="h-4 w-4 text-blue-600 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">Ship</p>
                  <p className="text-sm font-semibold text-blue-700 truncate">
                    {formatCurrency(product.shipToUsa)}
                  </p>
                </div>
              </div>
            </div>
            
            {/* MOQ and Sample with better layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-yellow-50 rounded-lg p-2">
                <Star className="h-4 w-4 text-yellow-600 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">MOQ</p>
                  <p className="text-sm font-semibold text-yellow-700 truncate">
                    {product.moq || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-purple-50 rounded-lg p-2">
                <Package className="h-4 w-4 text-purple-600 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate">Sample</p>
                  <p className="text-sm font-semibold text-purple-700 truncate">
                    {formatCurrency(product.sampleCost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-0 pt-2">
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick();
            }}
          >
            View Details
          </Button>
        </CardFooter>
      </div>
    </motion.div>
  );
};

export default ProductCard;