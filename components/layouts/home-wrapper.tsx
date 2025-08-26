"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header/page";
import { ProductFilters } from "@/components/product-filters";
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton";
import { ErrorState } from "@/components/error-state";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import ProductsList from "@/components/products-list/page";

export default function HomeWrapper() {
  const router = useRouter();
  const { products, categories, loading, error, refetch } = useProducts();
  const { cartCount, clearCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    if (sortBy === "price-asc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
    } else if (sortBy === "price-desc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
    }

    return filteredProducts;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleProductClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSortBy("default");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        resetCart={clearCart}
      />

      <main className="container mx-auto px-4 py-8">
        {loading && <ProductGridSkeleton />}

        {error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
                searchQuery={searchQuery}
              />
            </div>

            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} products
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in "${selectedCategory}"`}
              </p>
            </div>

            <ProductsList
              filteredAndSortedProducts={filteredAndSortedProducts}
              handleProductClick={handleProductClick}
            />
          </>
        )}
      </main>
    </div>
  );
}
