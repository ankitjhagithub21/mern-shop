import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  const { user: userInfo } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
     
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/product/${productId}`
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } 
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("Please login to write a review");
      return;
    }

    if (reviewForm.comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters");
      return;
    }

    const payload = {
      product: productId,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    };

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      toast.success("Review added successfully");
      setReviewForm({ rating: 5, comment: "" });
      setShowForm(false);
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${reviewId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete review");
        }

        toast.success("Review deleted successfully");
        fetchReviews();
      } catch (error) {
        toast.error("Failed to delete review");
      }
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating ? "text-warning" : "text-base-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const canUserReview = () => {
    return (
      userInfo && !reviews.some((review) => review.user._id === userInfo._id)
    );
  };

  return (
    <div className="mt-8">
    

      {/* Review Form */}
      {canUserReview() && (
        <div className="card mb-6">
          <div className="card-body">
            <h4 className="card-title">Write Your Review</h4>
            <form onSubmit={submitReview}>
              <div className="form-control flex flex-col gap-2 mb-4">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      rating: Number(e.target.value),
                    })
                  }
                  className="select select-bordered"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>
              <div className="form-control flex flex-col gap-1 mb-4">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  placeholder="Write your review here..."
                  rows="4"
                  className="textarea textarea-shadow resize-none w-full"
                  required
                />
                <label className="label">
                  <span className="label-text-alt">Minimum 10 characters</span>
                </label>
              </div>
              <div className="card-actions justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-neutral"
                >
                  {loading && <span className="loading loading-spinner"></span>}
                  {loading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {loading && !showForm ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : reviews.length === 0 && userInfo  ? (
        <div className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No reviews yet. Be the first to review this product!</span>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                          <span className="text-xs">{review.user.name?.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold">{review.user.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="rating rating-sm">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-base-content/70 mb-3">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {userInfo && review.user._id === userInfo._id && (
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                      </label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li>
                          <button 
                            onClick={() => deleteReview(review._id)}
                            className="text-error"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <p className="text-base-content leading-relaxed">{review.comment}</p>
                {review.isVerifiedPurchase && (
                  <div className="badge badge-success badge-sm mt-2">
                    ✓ Verified Purchase
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

     
    </div>
  );
};

export default ReviewSection;
