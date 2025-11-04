import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, XCircle } from "lucide-react";

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

interface FilterComponentProps {
  filters: ProductFilters;
  categories: string[];
  showAdvancedFilters: boolean;
  onFilterChange: (key: keyof ProductFilters, value: string) => void;
  onToggleAdvancedFilters: () => void;
  onClearFilter: (key: keyof ProductFilters) => void;
  onResetFilters: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  categories,
  showAdvancedFilters,
  onFilterChange,
  onToggleAdvancedFilters,
  onClearFilter,
  onResetFilters,
}) => {
  const formatCategory = (category: string) => {
    return category
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toUpperCase();
  };

  return (
    <Card className="p-5 bg-white border border-gray-200 shadow-lg bg-gradient-to-b from-gray-50 to-white rounded-xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
        <h2 className="font-bold text-gray-900 text-xl tracking-tight">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleAdvancedFilters}
          className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3 text-sm border-blue-200 rounded-lg transition-all duration-200"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showAdvancedFilters ? "Hide Advanced" : "Show Advanced"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Search
          </label>
          <Input
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </label>
          <Select
            value={filters.category}
            onValueChange={(v) => onFilterChange("category", v)}
          >
            <SelectTrigger className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-60">
              <SelectItem value="all" className="hover:bg-blue-50 rounded-md my-1 transition-colors duration-150">
                All Categories
              </SelectItem>
              {categories.map((cat) => {
                const formattedCat = formatCategory(cat);
                return (
                  <SelectItem 
                    key={cat} 
                    value={cat}
                    className="hover:bg-blue-50 rounded-md my-1 transition-colors duration-150"
                  >
                    {formattedCat}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Min MOQ
          </label>
          <Input
            type="number"
            placeholder="1000"
            value={filters.minMoq}
            onChange={(e) => onFilterChange("minMoq", e.target.value)}
            className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Max Price ($)
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="10.99"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
          />
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sample Cost Range ($)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Min"
                  value={filters.minSampleCost}
                  onChange={(e) =>
                    onFilterChange("minSampleCost", e.target.value)
                  }
                  className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Max"
                  value={filters.maxSampleCost}
                  onChange={(e) =>
                    onFilterChange("maxSampleCost", e.target.value)
                  }
                  className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ship to USA Price Range ($)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Min"
                  value={filters.minShipToUsa}
                  onChange={(e) =>
                    onFilterChange("minShipToUsa", e.target.value)
                  }
                  className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Max"
                  value={filters.maxShipToUsa}
                  onChange={(e) =>
                    onFilterChange("maxShipToUsa", e.target.value)
                  }
                  className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ships to USA
              </label>
              <Select
                value={filters.shipToUsaAvailable}
                onValueChange={(v) =>
                  onFilterChange("shipToUsaAvailable", v as "yes" | "no" | "")
                }
              >
                <SelectTrigger className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-60">
                  <SelectItem 
                    value="yes"
                    className="hover:bg-blue-50 rounded-md my-1 transition-colors duration-150"
                  >
                    Yes
                  </SelectItem>
                  <SelectItem 
                    value="no"
                    className="hover:bg-blue-50 rounded-md my-1 transition-colors duration-150"
                  >
                    No
                  </SelectItem>
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
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.minSampleCost && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
              >
                Min Sample: ${filters.minSampleCost}
                <button
                  onClick={() => onClearFilter("minSampleCost")}
                  className="ml-1 rounded-full hover:bg-blue-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxSampleCost && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
              >
                Max Sample: ${filters.maxSampleCost}
                <button
                  onClick={() => onClearFilter("maxSampleCost")}
                  className="ml-1 rounded-full hover:bg-blue-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minShipToUsa && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
              >
                Min Ship: ${filters.minShipToUsa}
                <button
                  onClick={() => onClearFilter("minShipToUsa")}
                  className="ml-1 rounded-full hover:bg-purple-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxShipToUsa && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
              >
                Max Ship: ${filters.maxShipToUsa}
                <button
                  onClick={() => onClearFilter("maxShipToUsa")}
                  className="ml-1 rounded-full hover:bg-purple-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.shipToUsaAvailable && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200"
              >
                Ships to USA:{" "}
                {filters.shipToUsaAvailable === "yes" ? "Yes" : "No"}
                <button
                  onClick={() => onClearFilter("shipToUsaAvailable")}
                  className="ml-1 rounded-full hover:bg-green-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 h-8 px-3 text-sm border-red-200 rounded-lg transition-all duration-200"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterComponent;