'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  searchQuery: string;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
  searchQuery,
}: ProductFiltersProps) {
  const hasFilters = selectedCategory !== 'all' || sortBy !== 'default' || searchQuery.trim() !== '';

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2">
          {selectedCategory && selectedCategory !== 'all' && (
            <Badge variant="secondary" className="px-2 py-1">
              {selectedCategory}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-4 w-4 p-0"
                onClick={() => onCategoryChange('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}