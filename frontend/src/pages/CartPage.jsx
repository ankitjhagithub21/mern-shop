import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const CartPage = () => {
  const { cart, setCart, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ quantity }),
        }
      );
      const data = await res.json();
      if (res.ok) setCart(data.products);
    } catch {
      setError("Something went wrong");
    }
  };

  const handleRemove = async (productId) => {
    
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      
      if (res.ok) removeItem(productId);

    } catch {
      setError("Something went wrong");
    }
  };

  const subtotal = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto min-h-screen px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : cart.length === 0 ? (
        <div className="card">
          <div className="card-body items-center text-center py-16">
            {/* Empty Cart Illustration */}
            <div className="mb-8">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-32 h-32 text-base-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" 
                />
              </svg>
            </div>
            
            {/* Empty Cart Content */}
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-4">Your Cart is Empty</h3>
              <p className="text-base-content/70 mb-8 leading-relaxed">
                Looks like you haven't added any items to your cart yet. 
                Start shopping to find amazing products and great deals!
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  className="btn btn-primary btn-wide"
                  onClick={() => navigate("/")}
                >
                  Start Shopping
                </button>
                <button 
                  className="btn btn-outline btn-wide"
                  onClick={() => navigate(-1)}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow p-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id}>
                  <td className="flex items-center gap-2">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.product.name}</span>
                  </td>
                  <td>₹ {item.price}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-green-600">
                    ₹ {item.price * item.quantity}
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <div className="text-xl font-bold">
              Subtotal: <span className="text-green-600">₹ {subtotal}</span>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
