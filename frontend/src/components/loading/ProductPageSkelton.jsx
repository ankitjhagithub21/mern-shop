

const ProductPageSkelton = () => {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="skeleton h-4 w-16"></div>
        <span>{'>'}</span>
        <div className="skeleton h-4 w-20"></div>
        <span>{'>'}</span>
        <div className="skeleton h-4 w-24"></div>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="skeleton h-96 w-full rounded-lg"></div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton h-20 w-20 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          {/* Product Title */}
          <div className="skeleton h-8 w-3/4"></div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="skeleton h-5 w-24"></div>
            <div className="skeleton h-4 w-16"></div>
          </div>

          {/* Price */}
          <div className="skeleton h-10 w-32"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/6"></div>
          </div>

          {/* Stock Status */}
          <div className="skeleton h-6 w-24"></div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-12 w-24"></div>
          </div>

          {/* Add to Cart Button */}
          <div className="skeleton h-12 w-full"></div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-4 w-24"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-4 w-16"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-8">
        <div className="tabs tabs-bordered">
          <div className="skeleton h-10 w-24 tab"></div>
          <div className="skeleton h-10 w-20 tab"></div>
          <div className="skeleton h-10 w-28 tab"></div>
        </div>
      </div>

      {/* Reviews Section Skeleton */}
      <div className="space-y-6">
        {/* Reviews Header */}
        <div className="flex justify-between items-center">
          <div className="skeleton h-8 w-48"></div>
          <div className="skeleton h-10 w-32"></div>
        </div>

        {/* Individual Review Skeletons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                  <div className="space-y-1">
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-3 w-20"></div>
                  </div>
                </div>
                <div className="skeleton h-4 w-16"></div>
              </div>
              
              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-3/5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  )
}

export default ProductPageSkelton