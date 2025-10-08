import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Replace with your API endpoint
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          description,
          price,
          thumbnail,
          category,
          countInStock,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to add product');
      } else {
        setSuccess('Product added successfully!');
        setName('');
        setDescription('');
        setPrice('');
        setThumbnail('');
        setCategory('');
        setCountInStock('');
      }
    } catch {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-base-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
      {success && <div className="alert alert-success mb-4 py-2">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min="0"
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Thumbnail URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Count In Stock</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            value={countInStock}
            onChange={e => setCountInStock(e.target.value)}
            required
            min="0"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary w-full${loading ? ' btn-disabled' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;