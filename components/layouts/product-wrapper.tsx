"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header/page";
import { ErrorState } from "@/components/error-state";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { ProductDetailSkeleton } from "@/components/skeletons/product-detail-skeleton";
import { Product } from "@/types/product";

export default function ProductWrapper() {
  const { id } = useParams();
  const { getProductById, loading } = useProducts();
  const { addToCart, cartCount, clearCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setError(null);

      try {
        const productData = getProductById(parseInt(id as string));
        if (productData) {
          setProduct(productData);
        }
      } catch (err) {
        setError("Failed to load product");
      }
    };

    loadProduct();
  }, [id, getProductById]);

  const handleRetry = () => {
    window.location.reload();
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
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <ProductDetailSkeleton />
          </div>
        )}

        {error && (
          <ErrorState
            message={error || "Product not found"}
            onRetry={handleRetry}
          />
        )}

        {!loading && !error && product && (
          <>
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-6 cursor-pointer hover:text-gray-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      loading="lazy"
                      className="object-contain p-8"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating.rate)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating.rate} ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-4xl font-bold text-primary mb-6">
                    ${product.price.toFixed(2)}
                  </p>

                  <Button
                    onClick={() => addToCart(product)}
                    size="lg"
                    className="w-full mb-6 bg-amber-400 hover:bg-amber-500 text-black hover:text-white cursor-pointer"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
