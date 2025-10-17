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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
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
        navigate(`/order/${data._id}`);
      }
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-2">Checkout</h1>
          <p className="text-gray-300">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  <span className="text-primary">📋</span> Order Summary
                </h2>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-6xl mb-4">🛒</div>
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.product._id} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="divider"></div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span className="font-semibold">
                          {shippingPrice === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `₹${shippingPrice}`
                          )}
                        </span>
                      </div>
                      <div className="divider my-2"></div>
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">₹{totalPrice}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">
                  <span className="text-primary">📝</span> Shipping & Payment
                </h2>

                {error && (
                  <div className="alert alert-error mb-6">
                    <span>⚠️ {error}</span>
                  </div>
                )}

                <form onSubmit={handleOrder} className="space-y-4">
                  {/* Shipping Address Section */}
                  <div className="bg-base-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span>🏠</span> Shipping Address
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="form-control flex flex-col gap-2">
                        <label className="label">
                          <span className="label-text font-medium">Street Address</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full address"
                          className="input input-bordered w-full focus:input-primary"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                          <label className="label mb-2">
                            <span className="label-text font-medium">City</span>
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            className="input input-bordered focus:input-primary"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                            disabled={loading}
                          />
                        </div>
                        
                        <div className="form-control">
                          <label className="label mb-2">
                            <span className="label-text font-medium">Postal Code</span>
                          </label>
                          <input
                            type="text"
                            placeholder="PIN Code"
                            className="input input-bordered focus:input-primary"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="form-control flex flex-col gap-2">
                        <label className="label">
                          <span className="label-text font-medium">Country</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Country"
                          className="input w-full input-bordered focus:input-primary"
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Section */}
                  <div className="bg-base-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span>💳</span> Payment Method
                    </h3>
                    
                    <div className="form-control">
                      <div className="grid grid-cols-1 gap-3">
                        <label className="label cursor-pointer justify-start gap-4 p-3 border rounded-lg hover:bg-base-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={paymentMethod === 'COD'}
                            onChange={e => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                            disabled={loading}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💵</span>
                            <div>
                              <span className="label-text font-medium">Cash on Delivery</span>
                              <p className="text-sm text-gray-600">Pay when you receive your order</p>
                            </div>
                          </div>
                        </label>

                        <label className="label cursor-pointer justify-start gap-4 p-3 border rounded-lg hover:bg-base-300">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Card"
                            checked={paymentMethod === 'Card'}
                            onChange={e => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                            disabled={loading}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💳</span>
                            <div>
                              <span className="label-text font-medium">Credit/Debit Card</span>
                              <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary btn-lg w-full text-lg ${loading ? 'btn-disabled' : ''}`}
                    disabled={loading || cart.length === 0}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        🛒 Place Order - ₹{totalPrice}
                      </>
                    )}
                  </button>

                  {subtotal < 500 && (
                    <div className="alert alert-info">
                      <span>💡 Add ₹{500 - subtotal} more for free shipping!</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;