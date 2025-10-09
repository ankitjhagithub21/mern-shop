import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {user} = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Product not found');
        } else {
          setProduct(data);
        }
      } catch {
        setError('Something went wrong');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);


  const handleAddToCart = async (e) => {
    e.preventDefault();
    if(!user) return toast.error("You are not logged in.")
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Failed to add to cart');
      } else {
        toast.success("Product added to cart")
        navigate("/cart")
        // Optionally show success message or update cart state
      }
    } catch {
      toast.error('Something went wrong');
    }
   
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="alert alert-error">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 rounded-lg shadow">
      <div className="flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full max-w-md h-80 object-cover rounded"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-4">{product.category}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-xl">★</span>
          <span className="text-lg">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.numReviews} reviews)</span>
        </div>
        <p className="mb-6">{product.description}</p>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <span className="badge badge-outline">{product.countInStock} in stock</span>
        </div>
        <button
        onClick={handleAddToCart}
          className="btn btn-primary btn-block"
          disabled={product.countInStock === 0}
        >
          {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;