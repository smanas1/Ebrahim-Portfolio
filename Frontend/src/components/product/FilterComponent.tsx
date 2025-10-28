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
      .charAt(0)
      .toUpperCase()
      .concat(category.slice(1));
  };

  return (
    <Card className="p-5 bg-white border border-green-100 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleAdvancedFilters}
          className="text-green-600 hover:bg-green-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showAdvancedFilters ? "Hide Advanced" : "Show Advanced"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            placeholder="Product name or details..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <Select
            value={filters.category}
            onValueChange={(v) => onFilterChange("category", v)}
          >
            <SelectTrigger className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => {
                const formattedCat = formatCategory(cat);
                return (
                  <SelectItem key={cat} value={cat}>
                    {formattedCat}
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
            onChange={(e) => onFilterChange("minMoq", e.target.value)}
            className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Max Price ($)
          </label>
          <Input
            type="number"
            step="0.01"
            placeholder="e.g. 10.99"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Sample Cost Range ($)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Min"
                  value={filters.minSampleCost}
                  onChange={(e) =>
                    onFilterChange("minSampleCost", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Max"
                  value={filters.maxSampleCost}
                  onChange={(e) =>
                    onFilterChange("maxSampleCost", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ship to USA Price Range ($)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Min"
                  value={filters.minShipToUsa}
                  onChange={(e) =>
                    onFilterChange("minShipToUsa", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Max"
                  value={filters.maxShipToUsa}
                  onChange={(e) =>
                    onFilterChange("maxShipToUsa", e.target.value)
                  }
                  className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Ships to USA
              </label>
              <Select
                value={filters.shipToUsaAvailable}
                onValueChange={(v) =>
                  onFilterChange("shipToUsaAvailable", v as "yes" | "no" | "")
                }
              >
                <SelectTrigger className="text-sm border-green-200 focus:ring-green-500 focus:border-green-500">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.minSampleCost && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                Min Sample: ${filters.minSampleCost}
                <button
                  onClick={() => onClearFilter("minSampleCost")}
                  className="ml-1 hover:bg-blue-200 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxSampleCost && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                Max Sample: ${filters.maxSampleCost}
                <button
                  onClick={() => onClearFilter("maxSampleCost")}
                  className="ml-1 hover:bg-blue-200 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minShipToUsa && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                Min Ship: ${filters.minShipToUsa}
                <button
                  onClick={() => onClearFilter("minShipToUsa")}
                  className="ml-1 hover:bg-purple-200 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxShipToUsa && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800"
              >
                Max Ship: ${filters.maxShipToUsa}
                <button
                  onClick={() => onClearFilter("maxShipToUsa")}
                  className="ml-1 hover:bg-purple-200 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.shipToUsaAvailable && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Ships to USA:{" "}
                {filters.shipToUsaAvailable === "yes" ? "Yes" : "No"}
                <button
                  onClick={() => onClearFilter("shipToUsaAvailable")}
                  className="ml-1 hover:bg-green-200 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-red-600 hover:bg-red-50 h-7 px-2"
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