export function ProductDetailSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-5 w-32 bg-muted rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-muted aspect-square rounded-lg" />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {/* Category Badge */}
            <div className="h-6 w-20 bg-muted rounded-full mb-2" />

            {/* Title */}
            <div className="h-8 w-3/4 bg-muted rounded mb-4" />

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-muted rounded" />
              ))}
              <div className="h-4 w-24 bg-muted rounded" />
            </div>

            {/* Price */}
            <div className="h-10 w-32 bg-muted rounded mb-6" />

            {/* Add to Cart */}
            <div className="h-12 w-full bg-muted rounded-lg mb-6" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-6 w-40 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </div>
    </main>
  )
}
