import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, paymentFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders?page=${currentPage}&limit=10`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
        setTotalPages(data.pagination.totalPages);
      } else {
        setError(data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (res.ok) {
        fetchOrders(); // Refresh orders
      } else {
        setError('Failed to update order status');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'badge-warning',
      processing: 'badge-info',
      shipped: 'badge-primary',
      delivered: 'badge-success',
      cancelled: 'badge-error',
    };
    return `badge ${statusColors[status] || 'badge-neutral'}`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || 
      (paymentFilter === 'paid' && order.isPaid) || 
      (paymentFilter === 'unpaid' && !order.isPaid);
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPayment && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
        <p className="text-gray-600">Manage all customer orders</p>
      </div>

      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* Filters */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search Orders</span>
              </label>
              <input
                type="text"
                placeholder="Order ID, Customer name or email"
                className="input input-bordered"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Order Status</span>
              </label>
              <select
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment Status</span>
              </label>
              <select
                className="select select-bordered"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Actions</span>
              </label>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setPaymentFilter('all');
                  setCurrentPage(1);
                  fetchOrders();
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <div className="font-mono text-sm">
                        {order._id.slice(-8)}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{order.user.name}</div>
                        <div className="text-sm text-gray-600">{order.user.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        {order.orderItems.slice(0, 2).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 mb-1">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                            <span className="text-sm">{item.product.name}</span>
                            <span className="text-xs text-gray-500">x{item.quantity}</span>
                          </div>
                        ))}
                        {order.orderItems.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{order.orderItems.length - 2} more items
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-green-600">
                        ₹{order.totalPrice}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-error'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-sm btn-outline">
                          Actions
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <a href={`/admin/orders/${order._id}`}>View Details</a>
                          </li>
                          <li>
                            <a onClick={() => updateOrderStatus(order._id, 'processing')}>
                              Mark Processing
                            </a>
                          </li>
                          <li>
                            <a onClick={() => updateOrderStatus(order._id, 'shipped')}>
                              Mark Shipped
                            </a>
                          </li>
                          <li>
                            <a onClick={() => updateOrderStatus(order._id, 'delivered')}>
                              Mark Delivered
                            </a>
                          </li>
                          <li>
                            <a onClick={() => updateOrderStatus(order._id, 'cancelled')}>
                              Cancel Order
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-6xl mb-4">📦</div>
              <p>No orders found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;