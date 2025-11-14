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

interface ProductFilters {
  category: string;
  minMoq: string;
  minPrice: string;
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
  onFilterChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  categories: string[];
  brands: (string | undefined)[];
}

const SidebarFilterComponent: React.FC<SidebarFilterComponentProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  categories,
  brands,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleSelectChange = (name: keyof ProductFilters, value: string) => {
    // Special handling for "all" value - map it to empty string to clear filter
    const actualValue = value === "all" ? "" : value;
    onFilterChange({
      ...filters,
      [name]: actualValue,
    });
  };

  return (
    <Card className="p-6 bg-background border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="text-sm"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search
          </label>
          <Input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder="Product name..."
            className="w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <Select
            value={filters.category}
            onValueChange={(value) => handleSelectChange("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* MOQ */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Min MOQ
          </label>
          <Input
            type="number"
            name="minMoq"
            value={filters.minMoq}
            onChange={handleInputChange}
            placeholder="Min MOQ"
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Price
            </label>
            <Input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Price
            </label>
            <Input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full"
            />
          </div>
        </div>

        {/* Sample Cost Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Sample Cost
            </label>
            <Input
              type="number"
              name="minSampleCost"
              value={filters.minSampleCost}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Sample Cost
            </label>
            <Input
              type="number"
              name="maxSampleCost"
              value={filters.maxSampleCost}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full"
            />
          </div>
        </div>

        {/* Ship to USA Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Min Ship to USA
            </label>
            <Input
              type="number"
              name="minShipToUsa"
              value={filters.minShipToUsa}
              onChange={handleInputChange}
              placeholder="Min"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Ship to USA
            </label>
            <Input
              type="number"
              name="maxShipToUsa"
              value={filters.maxShipToUsa}
              onChange={handleInputChange}
              placeholder="Max"
              className="w-full"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Brand Name
          </label>
          <select
            name="brandName"
            value={filters.brandName}
            onChange={(e) => handleSelectChange("brandName", e.target.value)}
            className="w-full p-2 border border-input rounded-md focus:ring-primary focus:border-primary bg-background text-foreground"
          >
            <option value="">All Brands</option>
            {brands.filter(brand => brand).map((brand, index) => (
              <option key={index} value={brand || ""}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Date Added */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Date Added
          </label>
          <Input
            type="date"
            name="dateAdded"
            value={filters.dateAdded}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        {/* Ship to USA Available */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ship to USA Available
          </label>
          <Select
            value={filters.shipToUsaAvailable || "all"}
            onValueChange={(value: "yes" | "no" | "all") => handleSelectChange("shipToUsaAvailable", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {Object.entries(filters).some(
          ([key, value]) => value !== "" && key !== "search"
        ) && (
          <div className="pt-4">
            <h4 className="text-sm font-medium text-foreground mb-2">
              Active Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)
                .filter(([key, value]) => value !== "" && key !== "search")
                .map(([key, value]) => (
                  <Badge key={key} variant="secondary">
                    {key}: {value}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SidebarFilterComponent;