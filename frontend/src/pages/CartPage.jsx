import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import EmptyCart from "../components/EmptyCart";
import { Trash2 } from "lucide-react";

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
        <EmptyCart />
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden lg:block bg-base-100 rounded-lg shadow p-4">
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
                        className="btn text-red-600"
                        onClick={() => handleRemove(item.product._id)}
                      >
                        <Trash2/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Hidden on desktop */}
          <div className="lg:hidden space-y-4">
            {cart.map((item) => (
              <div key={item.product._id} className="card bg-base-100 shadow-md">
                <div className="card-body p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate mb-2">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-primary">
                          ₹ {item.price}
                        </span>
                        <button
                          className="btn btn-ghost btn-sm text-red-600 p-1"
                          onClick={() => handleRemove(item.product._id)}
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline"
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
                          <span className="px-3 py-1 bg-base-200 rounded text-center min-w-[3rem]">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-outline"
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
                        <div className="text-right">
                          <div className="text-sm text-base-content/70">Total</div>
                          <div className="text-lg font-bold text-success">
                            ₹ {item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="card bg-base-100 shadow-md mt-6">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold">
                  Subtotal: <span className="text-success">₹ {subtotal}</span>
                </div>
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
