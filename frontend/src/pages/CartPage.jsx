import React, { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        credentials: "include",
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || "Failed to fetch cart");
      } else {
        setCart(data.products);
       
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
      console.log("Update response data:", data);
      if (res.ok) setCart(data.products);
    } catch {}
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
      const data = await res.json();
      if (res.ok) setCart(data.products);
    } catch {}
  };

  const subtotal = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : cart.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Your cart is empty.
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
                  <td>${item.price}</td>
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
                  <td>${item.price * item.quantity}</td>
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
              Subtotal: <span className="text-primary">${subtotal}</span>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
