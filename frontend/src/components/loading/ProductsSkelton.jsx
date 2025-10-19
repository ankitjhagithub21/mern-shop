

const Products = () => {
  return (
    
      <div className="mt-12">
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card bg-base-100 shadow-sm">
              <div className="skeleton h-48 w-full"></div>
              <div className="card-body">
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-6 w-20 mb-2"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Products