import React from 'react';
import { motion } from 'framer-motion';
import { CardFooter, CardHeader, CardTitle, ImageSlider, Button, Badge } from '@/components/ui';
import { DollarSign, Truck, Star, Package } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import clsx from 'clsx';
import type { Product } from '@/types/productTypes';

// Define category mapping for display
const categoryMap: Record<string, string> = {
  magazineCardsStickers: "Print & Stationery",
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format cost of goods - handle both raw numbers and pre-formatted strings
  const formatCurrency = (value: number | string | undefined) => {
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
        'bg-card rounded-2xl overflow-hidden border border-border group',
        'transition-all duration-500 ease-in-out shadow-sm hover:shadow-xl',
        'flex flex-col h-full'
      )}
    >
      {/* Image container with gradient overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        <ImageSlider
          images={product.pictures || ['https://placehold.co/300x300?text=No+Image']}
          alt={product.productName}
          className="w-full h-full"
        />

        {/* Category badge with better styling */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 dark:bg-gray-800/90 backdrop-blur text-gray-800 dark:text-gray-200 text-xs font-medium px-3 py-1 shadow-lg">
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
          <CardTitle className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors tracking-tight font-sans">
            {product.productName}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed font-sans">
            {product.productDetails}
          </p>
        </CardHeader>

        <div className="p-0 pb-3 flex-1">
          <div className="space-y-3">
            {/* Pricing info with better visual hierarchy */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-green-50 dark:bg-green-950/30 rounded-lg p-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans uppercase tracking-tight">Cost</p>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-300 truncate font-sans">
                    {formatCurrency(product.costOfGoods)}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2">
                <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans uppercase tracking-tight">Ship</p>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 truncate font-sans">
                    {formatCurrency(product.shipToUsa)}
                  </p>
                </div>
              </div>
            </div>

            {/* MOQ and Sample with better layout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-2">
                <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans uppercase tracking-tight">MOQ</p>
                  <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 truncate font-sans">
                    {product.moq || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-purple-50 dark:bg-purple-950/30 rounded-lg p-2">
                <Package className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate font-sans uppercase tracking-tight">Sample</p>
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 truncate font-sans">
                    {formatCurrency(product.sampleCost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardFooter className="p-0 pt-2">
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all dark:from-green-600 dark:hover:from-green-700 dark:to-emerald-700 dark:hover:to-emerald-800 font-sans flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              // Create formatted WhatsApp message with product details
              const cost = formatCurrency(product.costOfGoods);
              const shipToUsa = formatCurrency(product.shipToUsa);
              const sampleCost = formatCurrency(product.sampleCost);
              const moq = product.moq || "N/A";

              const message = encodeURIComponent(
                `Hello! I'm interested in this product:\n\n` +
                `*${encodeURIComponent(product.productName)}*\n\n` +
                `*Details:* ${encodeURIComponent(product.productDetails)}\n\n` +
                `*Pricing Info:*\n` +
                `- Cost of Goods: ${cost}\n` +
                `- Ship to USA: ${shipToUsa}\n` +
                `- Sample Cost: ${sampleCost}\n` +
                `- MOQ: ${moq}\n\n` +
                `Can you provide more information or assistance?`
              );
              window.open(`https://wa.me/8801303839889?text=${message}`, '_blank');
            }}
          >
            <FaWhatsapp className="w-4 h-4" />
            WhatsApp
          </Button>
        </CardFooter>
      </div>
    </motion.div>
  );
};

export default ProductCard;