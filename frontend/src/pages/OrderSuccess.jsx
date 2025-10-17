import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderUpdated, setOrderUpdated] = useState(false);

  const orderId = searchParams.get('orderId');
  const paymentIntentId = searchParams.get('payment_intent');


  useEffect(() => {
    const updateOrderPaymentStatus = async () => {
      if (!orderId) {
        setError("Missing order information");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}/payment`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
              paymentIntentId,
              isPaid: true,
              paidAt: new Date().toISOString()
            }),
          }
        );

        const data = await res.json();
        if (res.ok) {
          setOrderUpdated(true);
        } else {
          setError(data.message || "Failed to update order status");
        }
      } catch (error) {
        setError("Something went wrong updating order status");
      } finally {
        setLoading(false);
      }
    };

    updateOrderPaymentStatus();
  }, [orderId, paymentIntentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow text-center">
          <div className="card-body">
            <h2 className="card-title text-error justify-center">Payment Error</h2>
            <p>{error}</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={() => navigate('/orders')}>
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow text-center">
        <div className="card-body">
          <div className="text-success text-6xl mb-4">✓</div>
          <h2 className="card-title text-success justify-center text-2xl">
            Payment Successful!
          </h2>
          <p className="text-lg mb-4">
            Your order has been placed and payment confirmed.
          </p>
          {orderId && (
            <div className="bg-base-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Order ID:</p>
              <p className="font-mono font-bold">{orderId}</p>
            </div>
          )}
          <div className="text-center mb-4">
            <p>We'll send you an email confirmation shortly.</p>
            <p>You can track your order status in your orders page.</p>
          </div>
          <div className="card-actions justify-center gap-4">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/orders')}
            >
              View My Orders
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;