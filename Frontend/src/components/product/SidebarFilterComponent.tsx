import React, { useState } from "react";
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
import { Filter, XCircle, X } from "lucide-react";

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
  brandName: string;
  dateAdded: string;
}

interface SidebarFilterComponentProps {
  filters: ProductFilters;
  categories: string[];
  brands: string[];
  onFilterChange: (key: keyof ProductFilters, value: string | "yes" | "no" | "") => void;
  onClearFilter: (key: keyof ProductFilters) => void;
  onResetFilters: () => void;
}

const SidebarFilterComponent: React.FC<SidebarFilterComponentProps> = ({
  filters,
  categories,
  brands,
  onFilterChange,
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
    <Card className="p-5 bg-white border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800 text-lg">Advanced Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-red-600 hover:bg-red-50 h-7 px-2 text-xs"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            placeholder="Product name or details..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
            <SelectTrigger className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
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
            Brand
          </label>
          <Select
            value={filters.brandName}
            onValueChange={(v) => onFilterChange("brandName", v)}
          >
            <SelectTrigger className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
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
            className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
            className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

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
              className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Max"
              value={filters.maxSampleCost}
              onChange={(e) =>
                onFilterChange("maxSampleCost", e.target.value)
              }
              className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
              className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <Input
              type="number"
              step="0.01"
              placeholder="Max"
              value={filters.maxShipToUsa}
              onChange={(e) =>
                onFilterChange("maxShipToUsa", e.target.value)
              }
              className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

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
            <SelectTrigger className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Date Added
          </label>
          <Input
            type="date"
            value={filters.dateAdded}
            onChange={(e) => onFilterChange("dateAdded", e.target.value)}
            className="text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.search ||
        filters.category ||
        filters.brandName ||
        filters.minMoq ||
        filters.maxPrice ||
        filters.minSampleCost ||
        filters.maxSampleCost ||
        filters.minShipToUsa ||
        filters.maxShipToUsa ||
        filters.shipToUsaAvailable ||
        filters.dateAdded) && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                Search: {filters.search}
                <button
                  onClick={() => onClearFilter("search")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                Category: {formatCategory(filters.category)}
                <button
                  onClick={() => onClearFilter("category")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.brandName && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                Brand: {filters.brandName}
                <button
                  onClick={() => onClearFilter("brandName")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minMoq && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                Min MOQ: {filters.minMoq}
                <button
                  onClick={() => onClearFilter("minMoq")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxPrice && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                Max Price: ${filters.maxPrice}
                <button
                  onClick={() => onClearFilter("maxPrice")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minSampleCost && (
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                Min Sample: ${filters.minSampleCost}
                <button
                  onClick={() => onClearFilter("minSampleCost")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxSampleCost && (
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                Max Sample: ${filters.maxSampleCost}
                <button
                  onClick={() => onClearFilter("maxSampleCost")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minShipToUsa && (
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Min Ship: ${filters.minShipToUsa}
                <button
                  onClick={() => onClearFilter("minShipToUsa")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxShipToUsa && (
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Max Ship: ${filters.maxShipToUsa}
                <button
                  onClick={() => onClearFilter("maxShipToUsa")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.shipToUsaAvailable && (
              <Badge variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                Ships to USA: {filters.shipToUsaAvailable === "yes" ? "Yes" : "No"}
                <button
                  onClick={() => onClearFilter("shipToUsaAvailable")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dateAdded && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                Date: {new Date(filters.dateAdded).toLocaleDateString()}
                <button
                  onClick={() => onClearFilter("dateAdded")}
                  className="ml-1 rounded-full"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SidebarFilterComponent;