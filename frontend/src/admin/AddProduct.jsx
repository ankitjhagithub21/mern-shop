import React, { useState } from 'react';
import toast from 'react-hot-toast';

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
          price: parseFloat(price),
          thumbnail,
          category,
          countInStock: parseInt(countInStock, 10),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to add product');
      } else {
       toast.success("Product added successfully.")
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
    <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 md:p-8 bg-base-100 rounded-lg shadow-md">
     
      {error && (
        <div className="alert alert-error mb-4 py-2 px-3 text-sm sm:text-base break-words">
          {error}
        </div>
      )}
     

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Product Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Product Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter product name"
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full resize-none h-24 sm:h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
            placeholder="Describe the product"
          ></textarea>
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Price ($)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            disabled={loading}
            placeholder="0.00"
          />
        </div>

        {/* Thumbnail URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Thumbnail URL</span>
          </label>
          <input
            type="url"
            className="input input-bordered w-full"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
            disabled={loading}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Category</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g. Electronics, Books"
          />
        </div>

        {/* Count In Stock */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Count In Stock</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
            min="0"
            disabled={loading}
            placeholder="0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`btn btn-primary w-full mt-6 ${loading ? 'btn-disabled' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              <span className="ml-2">Adding...</span>
            </>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;