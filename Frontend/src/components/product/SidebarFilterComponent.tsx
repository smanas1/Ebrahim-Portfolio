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
      .toUpperCase();
  };

  return (
    <Card className="p-5 bg-white border border-gray-200 shadow-lg h-full bg-gradient-to-b from-gray-50 to-white rounded-xl">
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
        <h2 className="font-bold text-gray-900 text-xl tracking-tight">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="text-red-600 hover:bg-red-50 hover:text-red-700 h-8 px-3 text-sm border-red-200 rounded-lg transition-all duration-200"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
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
            Brand
          </label>
          <Select
            value={filters.brandName}
            onValueChange={(v) => onFilterChange("brandName", v)}
          >
            <SelectTrigger className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-200 shadow-lg max-h-60">
              {brands.map((brand) => (
                <SelectItem 
                  key={brand} 
                  value={brand}
                  className="hover:bg-blue-50 rounded-md my-1 transition-colors duration-150"
                >
                  {brand}
                </SelectItem>
              ))}
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

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Date Added
          </label>
          <Input
            type="date"
            value={filters.dateAdded}
            onChange={(e) => onFilterChange("dateAdded", e.target.value)}
            className="text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg h-10 transition-all duration-200"
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
          <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Search: {filters.search}
                <button
                  onClick={() => onClearFilter("search")}
                  className="ml-1 rounded-full hover:bg-blue-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Category: {formatCategory(filters.category)}
                <button
                  onClick={() => onClearFilter("category")}
                  className="ml-1 rounded-full hover:bg-blue-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.brandName && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Brand: {filters.brandName}
                <button
                  onClick={() => onClearFilter("brandName")}
                  className="ml-1 rounded-full hover:bg-purple-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minMoq && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Min MOQ: {filters.minMoq}
                <button
                  onClick={() => onClearFilter("minMoq")}
                  className="ml-1 rounded-full hover:bg-green-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxPrice && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Max Price: ${filters.maxPrice}
                <button
                  onClick={() => onClearFilter("maxPrice")}
                  className="ml-1 rounded-full hover:bg-yellow-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minSampleCost && (
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Min Sample: ${filters.minSampleCost}
                <button
                  onClick={() => onClearFilter("minSampleCost")}
                  className="ml-1 rounded-full hover:bg-pink-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxSampleCost && (
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Max Sample: ${filters.maxSampleCost}
                <button
                  onClick={() => onClearFilter("maxSampleCost")}
                  className="ml-1 rounded-full hover:bg-pink-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minShipToUsa && (
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Min Ship: ${filters.minShipToUsa}
                <button
                  onClick={() => onClearFilter("minShipToUsa")}
                  className="ml-1 rounded-full hover:bg-indigo-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxShipToUsa && (
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Max Ship: ${filters.maxShipToUsa}
                <button
                  onClick={() => onClearFilter("maxShipToUsa")}
                  className="ml-1 rounded-full hover:bg-indigo-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.shipToUsaAvailable && (
              <Badge variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Ships to USA: {filters.shipToUsaAvailable === "yes" ? "Yes" : "No"}
                <button
                  onClick={() => onClearFilter("shipToUsaAvailable")}
                  className="ml-1 rounded-full hover:bg-teal-300 transition-colors duration-200 p-0.5"
                >
                  <XCircle className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dateAdded && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200">
                Date: {new Date(filters.dateAdded).toLocaleDateString()}
                <button
                  onClick={() => onClearFilter("dateAdded")}
                  className="ml-1 rounded-full hover:bg-orange-300 transition-colors duration-200 p-0.5"
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