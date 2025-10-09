import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
          // You may need to add orderItems, prices, etc. from cart context or API
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Order creation failed');
      } else {
        navigate(`/order/${data._id}`);
      }
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-base-100 rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
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
          className={`btn btn-primary w-full${loading ? ' btn-disabled' : ''}`}
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