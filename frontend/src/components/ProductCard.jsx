import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/product/${product._id}`)
  }

  return (
    
      <div className="card bg-base-100 shadow hover:scale-105 rounded-lg hover:shadow-lg transition">
        <figure className="px-4 pt-4">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-40 w-full object-cover  rounded"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg truncate">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">${product.price}</span>
            <span className="badge badge-outline">
              {product.countInStock} in stock
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{product.rating}</span>
          </div>
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={handleView}
            
          >
           View Product
          </button>
        </div>
      </div>
    
  );
};

export default ProductCard;
