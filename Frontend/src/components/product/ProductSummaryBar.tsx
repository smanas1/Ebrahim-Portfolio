import React from "react";
import { Button } from "@/components/ui/button";

interface ProductSummaryBarProps {
  selectedProductCount: number;
  onRequestQuote: () => void;
}

const ProductSummaryBar: React.FC<ProductSummaryBarProps> = ({
  selectedProductCount,
  onRequestQuote,
}) => {
  if (selectedProductCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white rounded-xl shadow-lg border border-green-200 p-4 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {selectedProductCount} product
              {selectedProductCount !== 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-green-600">
              Ready for sourcing quote
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white px-4"
          onClick={onRequestQuote}
        >
          Request Quote
        </Button>
      </div>
    </div>
  );
};

export default ProductSummaryBar;