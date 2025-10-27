import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-[90vh] flex items-center justify-center">
      <div className="card">
      <div className="card-body items-center text-center py-16">
        {/* Empty Cart Illustration */}
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 text-base-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
        </div>

        {/* Empty Cart Content */}
        <div className="max-w-md">
          <h3 className="text-2xl font-bold mb-4">Your Cart is Empty</h3>
          <p className="text-base-content/70 mb-8 leading-relaxed">
            Looks like you haven't added any items to your cart yet. Start
            shopping to find amazing products and great deals!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              className="btn btn-neutral btn-wide"
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
            <button
              className="btn btn-outline btn-wide"
              onClick={() => navigate(-1)}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default EmptyCart;
