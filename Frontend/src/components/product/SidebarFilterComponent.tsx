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
}

interface SidebarFilterComponentProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  categories: string[];
}

const SidebarFilterComponent: React.FC<SidebarFilterComponentProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  categories,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    onFilterChange({
      ...filters,
      [name]: value,
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