import toast from "react-hot-toast";
import { useState } from "react";
const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    setLoading(true);
   
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if(data.success){
        toast.success(data.message);
        setEmail('');
      }else{
        toast.error(data.message || 'Failed to send reset link');
      }
     
    } catch (err) {
      toast.error('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full bg-base-200 flex items-center justify-center p-5">
      <div className="max-w-md">
        <h2 className="text-3xl mb-4">Forgot Password</h2>
        <p className="mb-6">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control flex flex-col mb-4">
            <label className="label mb-1">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className={`input w-full input-bordered`}
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <button
            type="submit"
            className={`btn btn-neutral w-full${
              loading ? " btn-disabled" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
