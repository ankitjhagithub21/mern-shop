

const ResetPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-base-200 p-5">
        <div className="max-w-md w-full">
            <h2 className="text-3xl  mb-4">Reset Password</h2>
            <p className="mb-6">Enter your new password below.</p>
            <form>
                 <div className="form-control flex flex-col mb-4">
                    <label className="label mb-1">
                        <span className="label-text">Enter 6 digit Otp</span>
                    </label>
                    <input
                        type="text"
                        className={`input w-full input-bordered`}
                        required
                        placeholder="******"
                    />
                </div>
                
                <div className="form-control flex flex-col mb-4">
                    <label className="label mb-1">
                        <span className="label-text">New Password</span>
                    </label>
                    <input
                        type="password"
                        className={`input w-full input-bordered`}
                        required
                        placeholder="Enter New Password"
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
                    />
                </div>
                <button
                    type="submit"
                    className={`btn btn-neutral mt-3 w-full`}
                >
                    Reset Password
                </button>
            </form>
        </div>
    </div>
  )
}

export default ResetPassword