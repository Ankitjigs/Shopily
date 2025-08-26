import { ProductCard } from "../product-card/page";
import { Product } from "@/types/product";

interface ProductListProps {
  filteredAndSortedProducts: Product[];
  handleProductClick: (id: number) => void;
}

export default function ProductsList({
  filteredAndSortedProducts,
  handleProductClick,
}: ProductListProps) {
  return (
    <>
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
