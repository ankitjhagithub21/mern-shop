const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  return (
    <div className="h-screen w-full bg-base-200 flex items-center justify-center p-5">
      <div className="max-w-md">
        <h2 className="text-3xl mb-4">Forgot Password</h2>
        <p className="mb-6">
          Enter your email address below and we'll send you an top to reset your
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
            />
          </div>
          <button type="submit" className={`btn btn-neutral w-full`}>
            Send Otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
