import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
         toast.success("Account created successfully.")
         navigate("/")
      }
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-y-scroll bg-base-200 p-5">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-base-100">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="./vite.svg" alt="Shop Logo" className="w-16 h-16 mb-3" />
          <h1 className="text-3xl font-bold text-primary mb-2">MERN Shop</h1>
          <p className="text-sm text-gray-500 text-center mb-2">
            Create your account to start shopping the best products!
          </p>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <div className="alert alert-error mb-4 py-2">{error}</div>}
        {success && <div className="alert alert-success mb-4 py-2">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control flex flex-col mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              className="input w-full input-bordered"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-control flex flex-col mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input w-full input-bordered"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input w-full input-bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="input w-full input-bordered"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
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
              'Register'
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Already have an account?</span>{' '}
          <Link to="/login" className="link link-primary text-sm font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;