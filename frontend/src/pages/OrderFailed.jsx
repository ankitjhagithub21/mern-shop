import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OrderFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow text-center">
        <div className="card-body">
          <div className="text-error text-6xl mb-4">✗</div>
          <h2 className="card-title text-error justify-center text-2xl">
            Payment Failed!
          </h2>
          <p className="text-lg mb-4">
            Unfortunately, your payment could not be processed.
          </p>
          
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {orderId && (
            <div className="bg-base-200 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">Order ID:</p>
              <p className="font-mono font-bold">{orderId}</p>
              <p className="text-sm text-gray-600 mt-2">
                Your order is still pending. You can retry payment from your orders page.
              </p>
            </div>
          )}

          <div className="text-center mb-4">
            <p className="mb-2">Don't worry! Your order has been saved.</p>
            <p>You can try the payment again or choose a different payment method.</p>
          </div>

          <div className="card-actions justify-center gap-4">
            {orderId && (
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(`/orders/${orderId}`)}
              >
                Retry Payment
              </button>
            )}
            <button 
              className="btn btn-outline" 
              onClick={() => navigate('/orders')}
            >
              View My Orders
            </button>
            <button 
              className="btn btn-ghost" 
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

export default OrderFailed;