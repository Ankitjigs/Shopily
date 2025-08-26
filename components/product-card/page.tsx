import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  onProductClick: (id: number) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <div onClick={() => onProductClick(product.id)}>
        <CardContent className="p-4">
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.image}
              alt={product.title}
              fill
              loading="lazy"
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>

            <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>

            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
