import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { cart } = useCartStore();

  const subtotal = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingPrice = subtotal > 500 ? 0 : 50; // Example: free shipping over ₹500
  const totalPrice = subtotal + shippingPrice;

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`₹{import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          orderItems: cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
            thumbnail: item.product.thumbnail,
          })),
          itemsPrice: subtotal,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Order creation failed');
      } else {
        navigate(`/order/₹{data._id}`);
      }
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      {/* Cart details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
        {cart.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          <ul className="divide-y divide-base-200 mb-2">
            {cart.map(item => (
              <li key={item.product._id} className="flex items-center py-2 gap-3">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="flex-1">{item.product.name}</span>
                <span>x{item.quantity}</span>
                <span className="font-bold text-green-600">₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end font-bold">
          Subtotal: <span className="text-green-600 ml-2">₹{subtotal}</span>
        </div>
        <div className="flex justify-end font-bold mt-2">
          Shipping: <span className="ml-2">₹{shippingPrice}</span>
        </div>
        <div className="flex justify-end font-bold mt-2">
          Total: <span className="text-green-600 ml-2">₹{totalPrice}</span>
        </div>
      </div>
      {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
      <form onSubmit={handleOrder}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Postal Code</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Payment Method</span>
          </label>
          <select
            className="select select-bordered"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            disabled={loading}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Card</option>
            {/* Add more payment methods if needed */}
          </select>
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full₹{loading ? ' btn-disabled' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Place Order'
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;