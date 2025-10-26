import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password, id, token}),
      });
      const data = await res.json();
      if(data.success){
         toast.success(data.message);
         navigate("/login");
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-200 p-5">
      <div className="max-w-md w-full">
        <h2 className="text-3xl  mb-4">Reset Password</h2>
        <p className="mb-6">Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-control flex flex-col mb-4">
            <label className="label mb-1">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              className={`input w-full input-bordered`}
              required
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-col mb-4">
            <label className="label mb-1">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className={`input w-full input-bordered`}
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
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
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
