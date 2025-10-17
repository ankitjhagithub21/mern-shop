import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrderById = async (id) => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setOrder(data);
        } else {
          setError(data.message || "Failed to fetch order");
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getOrderById(id);
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            orderId: order._id,
            amount: order.totalPrice,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        // Redirect to Stripe payment page or handle payment flow
        window.location.href = data.url;
      } else {
        setError(data.message || "Failed to create payment");
      }
    } catch (error) {
      setError("Something went wrong with payment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Order not found</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "badge-warning",
      processing: "badge-info",
      shipped: "badge-primary",
      delivered: "badge-success",
      cancelled: "badge-error",
    };
    return `badge ${statusColors[status] || "badge-neutral"}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-gray-600">Order ID: {order._id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Order Status</h2>
              <div className="flex items-center gap-4">
                <span className={`badge ${getStatusBadge(order.status)} badge-lg`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span className={`badge ${order.isPaid ? "badge-success" : "badge-error"}`}>
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
                <span className={`badge ${order.isDelivered ? "badge-success" : "badge-warning"}`}>
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Ordered on: {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Product ID: {item.product}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price}</p>
                      <p className="text-sm text-gray-600">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Shipping Address</h2>
              <div className="text-gray-700">
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}</p>
                <p>{order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Customer Information</h2>
              <div>
                <p className="font-medium">{order.user.name}</p>
                <p className="text-gray-600">{order.user.email}</p>
              </div>
            </div>
          </div>

          {/* Payment & Pricing */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Payment Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between">
                  <span>Items Price:</span>
                  <span>₹{order.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Price:</span>
                  <span>₹{order.shippingPrice}</span>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">₹{order.totalPrice}</span>
                </div>
              </div>

              {/* Payment Button */}
              {order.paymentMethod.toLowerCase() !== 'cod' && !order.isPaid && (
                <div className="mt-4">
                  <button
                    className="btn btn-primary w-full"
                    onClick={handlePayment}
                  >
                    Pay Now with Stripe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;