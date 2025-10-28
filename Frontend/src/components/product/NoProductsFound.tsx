import React from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

interface NoProductsFoundProps {
  onResetFilters: () => void;
}

const NoProductsFound: React.FC<NoProductsFoundProps> = ({ onResetFilters }) => {
  return (
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
        onClick={onResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default NoProductsFound;