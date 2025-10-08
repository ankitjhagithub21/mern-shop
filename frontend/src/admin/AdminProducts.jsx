import React, { useEffect, useState } from 'react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch products');
        } else {
          setProducts(data);
        }
      } catch {
        setError('Something went wrong');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to delete product');
      } else {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Thumbnail</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p._id}>
                <th>{idx + 1}</th>
                <td>{p.name}</td>
                <td>
                  <img src={p.thumbnail} alt={p.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.countInStock}</td>
                <td>{p.rating}</td>
                <td>
                  {/* Add edit/delete buttons here if needed */}
                  <button className="btn btn-xs btn-outline btn-primary mr-2">Edit</button>
                  <button
                    className="btn btn-xs btn-outline btn-error"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;