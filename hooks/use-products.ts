"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id) || null;
  };

  return {
    products,
    loading,
    error,
    categories,
    getProductById,
    refetch: fetchProducts,
  };
}
